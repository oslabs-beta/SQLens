import pool from './db';

export const getTableNames = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error in getTableNames middleware: ', err);
  }
};