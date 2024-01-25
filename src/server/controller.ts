import { pool } from './index';

// The interface for data structure Jenny was talking about to make this valid TypeScript
interface RowData {
  columnName: string;
  value: string | null;
}

interface TableData {
  rowData: RowData[];
}

export const resolvers = {
  Query: {

    getTableNames: async () => {
      if (!pool) {
        throw new Error('Database connection not initialized');
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
          [key: string]: { columns: string[]; foreignKeys: any[] };
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
        console.error('Error in getTableNames resolver: ', err);
        throw new Error('Server error');
      }
    },
    // the :_ is a placeholder for the parent object which is a neccassary argument for the resolver with apollo server
    getTableData: async (
      _: any,
      { tableName }: { tableName: string }
    ): Promise<TableData[]> => {
      console.log(tableName);
      try {
        const tableDataQuery = `SELECT * FROM ${tableName};`;
        const tableDataResult = await pool.query(tableDataQuery);
        console.log(tableDataResult.rows);

        return tableDataResult.rows.map((row: Record<string, any>) => {
          const rowData: RowData[] = [];
          for (const [key, value] of Object.entries(row)) {
            rowData.push({
              columnName: key,
              value: value !== null ? value.toString() : null,
            });
          }
          return { rowData };
        });
      } catch (err) {
        console.error('Error in getTableData resolver: ', err);
        throw new Error('Server error');
      }
    },
  },
  Mutation: {
    addColumnToTable: async (
      // the :_ is a placeholder for the parent object which is a neccassary argument for the resolver with apollo server
      _: any,
      {
        tableName,
        columnName,
        dataType,
      }: { tableName: string; columnName: string; dataType: string }
    ) => {
      try {
        // SQL to add a column to a table, adjust data type as needed
        await pool.query(
          `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${dataType}`
        );
        return `Column ${columnName} added to ${tableName} successfully.`;
      } catch (err) {
        console.error('Error in addColumnToTable resolver: ', err);
        // throw new Error('Server error');
        return err;
      }
    },
    editTableName: async (
      // the :_ is a placeholder for the parent object which is a neccassary argument for the resolver with apollo server
      _: any,
      { oldName, newName }: { oldName: string; newName: string }
    ) => {
      try {
        // SQL to rename a table
        await pool.query(`ALTER TABLE ${oldName} RENAME TO ${newName};`);
        return `Table name changed from ${oldName} to ${newName} successfully.`;
      } catch (err) {
        console.error('Error in editTableName resolver: ', err);
        // throw new Error('Server error');
        return err;
      }
    },
    // the :_ is a placeholder for the parent object which is a neccassary argument for the resolver with apollo server
    deleteTable: async (_: any, { tableName }: { tableName: string }) => {
      try {
        // SQL to delete a table
        await pool.query(`DROP TABLE ${tableName};`);
        return `Table ${tableName} deleted successfully.`;
      } catch (err) {
        console.error('Error in deleteTable resolver: ', err);
        // throw new Error('Server error');
        return err;
      }
    },
    deleteColumn: async (
      _: any,
      { columnName, tableName }: { columnName: string; tableName: string }
    ) => {
      try {
        // SQL to delete a table
        await pool.query(`ALTER TABLE ${tableName} DROP COLUMN ${columnName};`);
        return `Column ${columnName} deleted successfully from ${tableName}.`;
      } catch (err) {
        console.error('Error in deleteColumn resolver: ', err);
        // throw new Error('Server error');
        return err;
      }
    },
    editColumn: async (
      _: any,
      {
        newColumnName,
        columnName,
        tableName,
      }: { newColumnName: string; columnName: string; tableName: string }
    ) => {
      try {
        // SQL to delete a table
        await pool.query(`ALTER TABLE ${tableName}
        RENAME COLUMN ${columnName} to ${newColumnName};`);
        return `Column name changed to${newColumnName} from ${columnName} on ${tableName}.`;
      } catch (err) {
        console.error('Error in editColumn resolver: ', err);
        // throw new Error('Server error');
        return err;
      }
    },
  },
};
