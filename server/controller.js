var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from './index';
import { promises as fsPromises } from 'fs';
let migration_file = './public/migration_log.txt';
if (!process.env['VITE']) {
    migration_file = './dist/migration_log.txt'; //route need to be changed for production vs dev mode
}
const appendMigration = (query) => __awaiter(void 0, void 0, void 0, function* () {
    yield fsPromises.appendFile(migration_file, query + '\n');
    return;
});
// The interface for data structure Jenny was talking about to make this valid TypeScript
export const resolvers = {
    Query: {
        getTableDetails: (_, { tableName }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!pool) {
                throw new Error('Database connection not initialized');
            }
            try {
                const tableDetails = {
                    name: tableName,
                    columns: [],
                    foreignKeys: [],
                };
                // Fetch columns for the specified table
                const columnQuery = `SELECT column_name FROM information_schema.columns WHERE table_name = $1`;
                const columnData = yield pool.query(columnQuery, [tableName]);
                tableDetails.columns = columnData.rows.map(row => row.column_name);
                // Fetch foreign keys for the specified table
                const fkQuery = `
          SELECT
            kcu.column_name,
            ccu.table_name AS foreign_table_name,
            ccu.column_name AS foreign_column_name
          FROM
            information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
            JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
          WHERE
            tc.constraint_type = 'FOREIGN KEY'
            AND tc.table_name = $1;
        `;
                const fkData = yield pool.query(fkQuery, [tableName]);
                // Map foreign key data to the foreignKeys array in the correct format
                tableDetails.foreignKeys = fkData.rows.map(fk => ({
                    columnName: fk.column_name,
                    foreignTableName: fk.foreign_table_name,
                    foreignColumnName: fk.foreign_column_name,
                }));
                return tableDetails;
            }
            catch (err) {
                console.error('Error in getTableDetails resolver:', err);
                throw new Error('Server error');
            }
        }),
        getTableNames: () => __awaiter(void 0, void 0, void 0, function* () {
            if (!pool) {
                throw new Error('Database connection not initialized');
            }
            try {
                // Query to get all table names
                const tablesData = yield pool.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'");
                // tablesData.rows is an array of objects, each object has a key of tablename and a value of the table name
                const tableNames = tablesData.rows.map((row) => row.tablename);
                // tablesWithColumns is an object with keys of table names and values of objects with keys of columns and foreignKeys
                const tablesWithColumns = {};
                // Query to get foreign key relations
                // tc = table constraints
                // A constraint type is a rule that is enforced on data in a table
                // A foreign key constraint is a constraint that references a column in another table
                // kcu = key column usage
                // A key column usage is a column that is used as a key
                // ccu = constraint column usage
                // A constraint column usage is a column that is used as a constraint
                // The join tables are used to get the table name, column name, foreign table name, and foreign column name
                // The WHERE clause is used to only get foreign key constraints
                const fkQuery = `
        SELECT
          tc.table_name,
          kcu.column_name,
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name
        FROM
          information_schema.table_constraints AS tc
          JOIN information_schema.key_column_usage AS kcu
            ON tc.constraint_name = kcu.constraint_name
          JOIN information_schema.constraint_column_usage AS ccu
            ON ccu.constraint_name = tc.constraint_name
        WHERE
          constraint_type = 'FOREIGN KEY';
      `;
                const fkData = yield pool.query(fkQuery);
                // Loop to create tablesWithColumns object
                for (const tableName of tableNames) {
                    const columnData = yield pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName}'`);
                    tablesWithColumns[tableName] = {
                        columns: columnData.rows.map((row) => row.column_name),
                        foreignKeys: [],
                    };
                }
                // Loop to add foreign keys to tablesWithColumns object
                fkData.rows.forEach((fk) => {
                    if (tablesWithColumns[fk.table_name]) {
                        tablesWithColumns[fk.table_name].foreignKeys.push({
                            columnName: fk.column_name,
                            foreignTableName: fk.foreign_table_name,
                            foreignColumnName: fk.foreign_column_name,
                        });
                    }
                });
                // Convert tablesWithColumns object to array
                // Expected structure is an array of objects, each object has a key of name, columns, and foreignKeys
                const tablesArray = Object.keys(tablesWithColumns).map((tableName) => {
                    return {
                        name: tableName,
                        columns: tablesWithColumns[tableName].columns,
                        foreignKeys: tablesWithColumns[tableName].foreignKeys,
                    };
                });
                return tablesArray;
            }
            catch (err) {
                console.error('Error in getTableNames resolver: ', err);
                throw new Error('Server error');
            }
        }),
        // the :_ is a placeholder for the parent object which is a neccassary argument for the resolver with apollo server
        getTableData: (_, { tableName }) => __awaiter(void 0, void 0, void 0, function* () {
            // console.log(tableName);
            if (pool !== null) {
                try {
                    const tableDataQuery = `SELECT * FROM ${tableName};`;
                    const tableDataResult = yield pool.query(tableDataQuery);
                    // console.log(tableDataResult.rows);
                    return tableDataResult.rows.map((row) => {
                        const rowData = [];
                        for (const [key, value] of Object.entries(row)) {
                            rowData.push({
                                columnName: key,
                                value: value !== null && value !== undefined ? value.toString() : null,
                            });
                        }
                        return { rowData };
                    });
                }
                catch (err) {
                    console.error('Error in getTableData resolver: ', err);
                    throw new Error('Server error');
                }
            }
            return [];
        }),
    },
    Mutation: {
        addColumnToTable: (
        // the :_ is a placeholder for the parent object which is a neccassary argument for the resolver with apollo server
        _, { tableName, columnName, dataType, }) => __awaiter(void 0, void 0, void 0, function* () {
            if (pool !== null) {
                try {
                    // SQL to add a column to a table, adjust data type as needed
                    const mutation = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${dataType};`;
                    yield pool.query(mutation);
                    yield appendMigration(mutation);
                    return `Column ${columnName} added to ${tableName} successfully.`;
                }
                catch (err) {
                    console.error('Error in addColumnToTable resolver: ', err);
                    // throw new Error('Server error');
                    return err;
                }
            }
        }),
        editTableName: (
        // the :_ is a placeholder for the parent object which is a neccassary argument for the resolver with apollo server
        _, { oldName, newName }) => __awaiter(void 0, void 0, void 0, function* () {
            if (pool !== null) {
                try {
                    // SQL to rename a table
                    const mutation = `ALTER TABLE ${oldName} RENAME TO ${newName};`;
                    yield pool.query(mutation);
                    yield appendMigration(mutation);
                    return `Table name changed from ${oldName} to ${newName} successfully.`;
                }
                catch (err) {
                    console.error('Error in editTableName resolver: ', err);
                    // throw new Error('Server error');
                    return err;
                }
            }
        }),
        // the :_ is a placeholder for the parent object which is a neccassary argument for the resolver with apollo server
        deleteTable: (_, { tableName }) => __awaiter(void 0, void 0, void 0, function* () {
            if (pool !== null) {
                try {
                    // SQL to delete a table
                    const mutation = `DROP TABLE ${tableName};`;
                    yield pool.query(mutation);
                    yield appendMigration(mutation);
                    return `Table ${tableName} deleted successfully.`;
                }
                catch (err) {
                    console.error('Error in deleteTable resolver: ', err);
                    // throw new Error('Server error');
                    return err;
                }
            }
        }),
        deleteColumn: (_, { columnName, tableName }) => __awaiter(void 0, void 0, void 0, function* () {
            if (pool !== null) {
                try {
                    // console.log(columnName, tableName);
                    // SQL to delete a table
                    const mutation = `ALTER TABLE ${tableName} DROP COLUMN ${columnName};`;
                    yield pool.query(mutation);
                    yield appendMigration(mutation);
                    return `Column ${columnName} deleted successfully from ${tableName}.`;
                }
                catch (err) {
                    console.error('Error in deleteColumn resolver: ', err);
                    // throw new Error('Server error');
                    return err;
                }
            }
        }),
        editColumn: (_, { newColumnName, columnName, tableName, }) => __awaiter(void 0, void 0, void 0, function* () {
            if (pool !== null) {
                try {
                    // SQL to delete a table
                    const mutation = `ALTER TABLE ${tableName}
        RENAME COLUMN ${columnName} to ${newColumnName};`;
                    yield pool.query(mutation);
                    yield appendMigration(mutation);
                    return `Column name changed to${newColumnName} from ${columnName} on ${tableName}.`;
                }
                catch (err) {
                    console.error('Error in editColumn resolver: ', err);
                    // throw new Error('Server error');
                    return err;
                }
            }
        }),
        addTable: (_, { tableName }) => __awaiter(void 0, void 0, void 0, function* () {
            if (pool !== null) {
                try {
                    // SQL to delete a table
                    const mutation = `CREATE TABLE ${tableName} (
          );`;
                    yield pool.query(mutation);
                    yield appendMigration(mutation);
                    return `Table named ${tableName} created.`;
                }
                catch (err) {
                    console.error('Error in addTable resolver: ', err);
                    // throw new Error('Server error');
                    return err;
                }
            }
        }),
    },
};
