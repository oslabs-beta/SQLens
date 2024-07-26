import express, { Response, Request } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { resolvers } from './controller';
import { typeDefs } from './typeDefs';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import open from 'open';
import fs from 'fs';
import cors from 'cors';

dotenv.config();
export let pool: pkg.Pool | null = null;

const initializePool = (uri: string) => {
  pool = new Pool({ connectionString: uri });
};

export const app = express();
app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });

let migration_file = './public/migration_log.txt'
if (!process.env['VITE']) {
  migration_file = './dist/migration_log.txt' //route need to be changed for production vs dev mode
}

async function startServer() {
  await server.start();
  app.use('/api/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server));

  app.get('/api/test', (_: Request, res: Response) => {
    res.json({ greeting: 'Hello' });
  });

  app.post('/api/setDatabaseURI', (req: Request, res: Response) => {
    const { databaseURI } = req.body;

    if (!databaseURI) {
      return res.status(400).json({ error: 'Database URI is required' });
    }

    initializePool(databaseURI);
    const currentTimestamp = new Date().toLocaleString();
    fs.writeFileSync(
      migration_file, //route needs to be changed for production vs dev mode
      `--\n-- Migration log\n-- Database URL: ${databaseURI}\n-- Session started ${currentTimestamp}\n--\n`
    );
    res.json({ message: 'Database connection updated successfully' });
  });

  // Conditional Express static file serving and application start
  if (!process.env['VITE']) {
    const frontendFiles = process.cwd() + '/dist';
    app.use(express.static(frontendFiles));
    app.get('/*', (_: Request, res: Response) => {
      res.sendFile(`${frontendFiles}/index.html`);
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      open(`http://localhost:${PORT}`);
    });
  }
}

startServer().catch((error) => {
  console.error('Failed to start the server:', error);
});
