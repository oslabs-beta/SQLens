import { pool } from "./index";
import { promises as fsPromises } from "fs";
import { RowData, TableData, Table } from "../global_types/types";

let migration_file = "./public/migration_log.txt";
if (!process.env["VITE"]) {
  migration_file = "./dist/migration_log.txt"; //route need to be changed for production vs dev mode
}

const appendMigration = async (query: string): Promise<void> => {
  await fsPromises.appendFile(migration_file, query + "\n");
  return;
};

export const resolvers = {
  Query: {
    getTableDetails: async (
      _: unknown,
      { tableName }: { tableName: string }
    ): Promise<Table> => {
      if (!pool) {
        throw new Error("Database connection not initialized");
      }

      try {
        const tableDetails: Table = {
          name: tableName,
          columns: [],
          foreignKeys: [],
        };

        // Fetch columns for the specified table
        const columnQuery = `SELECT column_name FROM information_schema.columns WHERE table_name = $1`;
        const columnData = await pool.query(columnQuery, [tableName]);
        tableDetails.columns = columnData.rows.map((row) => row.column_name);

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
        const fkData = await pool.query(fkQuery, [tableName]);

        // Map foreign key data to the foreignKeys array in the correct format
        tableDetails.foreignKeys = fkData.rows.map((fk) => ({
          columnName: fk.column_name,
          foreignTableName: fk.foreign_table_name,
          foreignColumnName: fk.foreign_column_name,
        }));

        return tableDetails;
      } catch (err) {
        console.error("Error in getTableDetails resolver:", err);
        throw new Error("Server error");
      }
    },
    getTableNames: async () => {
      if (!pool) {
        throw new Error("Database connection not initialized");
      }
      try {
        // Query to get all table names
        const tablesData = await pool.query(
          "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'"
        );
        // tablesData.rows is an array of objects, each object has a key of tablename and a value of the table name
        const tableNames: string[] = tablesData.rows.map(
          (row) => row.tablename
        );
        // tablesWithColumns is an object with keys of table names and values of objects with keys of columns and foreignKeys
        const tablesWithColumns: {
          [key: string]: { columns: string[]; foreignKeys: unknown[] };
        } = {};

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
        const fkData = await pool.query(fkQuery);

        // Loop to create tablesWithColumns object
        for (const tableName of tableNames) {
          const columnData = await pool.query(
            `SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName}'`
          );
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
      } catch (err) {
        console.error("Error in getTableNames resolver: ", err);
        throw new Error("Server error");
      }
    },
    // the :_ is a placeholder for the parent object which is a neccassary argument for the resolver with apollo server
    getTableData: async (
      _: unknown,
      { tableName }: { tableName: string }
    ): Promise<TableData[]> => {
      if (pool !== null) {
        try {
          const tableDataQuery = `SELECT * FROM ${tableName};`;
          const tableDataResult = await pool.query(tableDataQuery);

          return tableDataResult.rows.map((row: Record<string, unknown>) => {
            const rowData: RowData[] = [];
            for (const [key, value] of Object.entries(row)) {
              rowData.push({
                columnName: key,
                value:
                  value !== null && value !== undefined
                    ? value.toString()
                    : null,
              });
            }
            return { rowData };
          });
        } catch (err) {
          console.error("Error in getTableData resolver: ", err);
          throw new Error("Server error");
        }
      }
      return [];
    },
  },
  Mutation: {
    addColumnToTable: async (
      // the :_ is a placeholder for the parent object which is a neccassary argument for the resolver with apollo server
      _: unknown,
      {
        tableName,
        columnName,
        dataType,
        refTable,
        refColumn,
      }: { tableName: string; columnName: string; dataType: string; refTable: string; refColumn: string }
    ) => {
      if (pool !== null) {
        try {
          // SQL to add a column to a table, adjust data type as needed
          let mutation = `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${dataType};`;
          if (refTable.length && refColumn.length) {
            mutation += `ALTER TABLE ${tableName} ADD CONSTRAINT fk_${columnName} FOREIGN KEY (${columnName}) REFERENCES ${refTable}(${refColumn})`;
          }
          await pool.query(mutation);
          await appendMigration(mutation);
          return `Column ${columnName} added to ${tableName} successfully.`;
        } catch (err) {
          console.error("Error in addColumnToTable resolver: ", err);
          return err;
        }
      }
    },
    editTableName: async (
      // the :_ is a placeholder for the parent object which is a neccassary argument for the resolver with apollo server
      _: unknown,
      { oldName, newName }: { oldName: string; newName: string }
    ) => {
      if (pool !== null) {
        try {
          // SQL to rename a table
          const mutation = `ALTER TABLE ${oldName} RENAME TO ${newName};`;
          await pool.query(mutation);
          await appendMigration(mutation);
          return `Table name changed from ${oldName} to ${newName} successfully.`;
        } catch (err) {
          console.error("Error in editTableName resolver: ", err);
          return err;
        }
      }
    },
    // the :_ is a placeholder for the parent object which is a neccassary argument for the resolver with apollo server
    deleteTable: async (_: unknown, { tableName }: { tableName: string }) => {
      if (pool !== null) {
        try {
          // SQL to delete a table
          const mutation = `DROP TABLE ${tableName};`;
          await pool.query(mutation);
          await appendMigration(mutation);
          return `Table ${tableName} deleted successfully.`;
        } catch (err) {
          console.error("Error in deleteTable resolver: ", err);
          return err;
        }
      }
    },
    deleteColumn: async (
      _: unknown,
      { columnName, tableName }: { columnName: string; tableName: string }
    ) => {
      if (pool !== null) {
        try {
          // SQL to delete a table
          const mutation = `ALTER TABLE ${tableName} DROP COLUMN ${columnName};`;
          await pool.query(mutation);
          await appendMigration(mutation);
          return `Column ${columnName} deleted successfully from ${tableName}.`;
        } catch (err) {
          console.error("Error in deleteColumn resolver: ", err);
          return err;
        }
      }
    },
    editColumn: async (
      _: unknown,
      {
        newColumnName,
        columnName,
        tableName,
      }: { newColumnName: string; columnName: string; tableName: string }
    ) => {
      if (pool !== null) {
        try {
          // SQL to delete a table
          const mutation = `ALTER TABLE ${tableName}
        RENAME COLUMN ${columnName} to ${newColumnName};`;
          await pool.query(mutation);
          await appendMigration(mutation);
          return `Column name changed to${newColumnName} from ${columnName} on ${tableName}.`;
        } catch (err) {
          console.error("Error in editColumn resolver: ", err);
          return err;
        }
      }
    },
    addTable: async (_: unknown, { tableName }: { tableName: string }) => {
      if (pool !== null) {
        try {
          // SQL to delete a table
          const mutation = `CREATE TABLE ${tableName} (
          );`;
          await pool.query(mutation);
          await appendMigration(mutation);
          return `Table named ${tableName} created.`;
        } catch (err) {
          console.error("Error in addTable resolver: ", err);
          return err;
        }
      }
    },
  },
};
