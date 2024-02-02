import express, { Response, Request } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './controller';
import { typeDefs } from './typeDefs';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import open from 'open';

dotenv.config();

export let pool: pkg.Pool | null = null;

const initializePool = (uri: string) => {
  pool = new Pool({ connectionString: uri });
};

export const app: any = express();
app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/api/graphql' });

  app.get('/api/test', (_: Request, res: Response) => {
    res.json({ greeting: 'Hello' });
  });

  app.post('/api/setDatabaseURI', (req: Request, res: Response) => {
    const { databaseURI } = req.body;

    if (!databaseURI) {
      return res.status(400).json({ error: 'Database URI is required' });
    }

    initializePool(databaseURI);
    res.json({ message: 'Database connection updated successfully' });
  });

  // Conditional Express static file serving and application start
  if (!process.env['VITE']) {
    console.log('Serving static files and starting Express server.');
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

startServer().catch(error => {
  console.error('Failed to start the server:', error);
});
