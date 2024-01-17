import { Request, Response } from 'express';
import pool from './db';

// export const getTableNames = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const dbData = await pool.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'");
//     res.locals.dbData = dbData;
//     next()
//   } catch (err) {
//     console.error('Error in getTableNames middleware: ', err);
//     res.status(500).send('Server error');
//   }
// };

export const dbController = {
  getTableNames : async (req: Request, res: Response, next: Function): Promise<void> => {
    try {
      const dbData = await pool.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'");
      res.locals.dbData = dbData;
      next()
    } catch (err) {
      console.error('Error in getTableNames middleware: ', err);
      res.status(500).send('Server error');
    }
  },
};

// module.exports = dbController;