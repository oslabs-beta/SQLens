import { Request, Response } from 'express';
import pool from './db';

export const dbController = {
  getTableNames: async (req: Request, res: Response, next: Function): Promise<void> => {
    try {
      // Query to get all table names
      const tablesData = await pool.query(
        "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'"
      );
      // tablesData.rows is an array of objects, each object has a key of tablename and a value of the table name
      const tableNames: string[] = tablesData.rows.map(row => row.tablename);
      // tablesWithColumns is an object with keys of table names and values of objects with keys of columns and foreignKeys
      const tablesWithColumns: { [key: string]: { columns: string[], foreignKeys: any[] } } = {};

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
          columns: columnData.rows.map(row => row.column_name),
          foreignKeys: []
        };
      }

      // Loop to add foreign keys to tablesWithColumns object
      fkData.rows.forEach(fk => {
        if (tablesWithColumns[fk.table_name]) {
          tablesWithColumns[fk.table_name].foreignKeys.push({
            columnName: fk.column_name,
            foreignTableName: fk.foreign_table_name,
            foreignColumnName: fk.foreign_column_name
          });
        }
      });

      res.locals.dbData = tablesWithColumns;
      next();
    } catch (err) {
      console.error('Error in getTableNames middleware: ', err);
      res.status(500).send('Server error');
    }
  },
};


// Key is table name, value is array of column names