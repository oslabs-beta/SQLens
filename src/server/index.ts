import express, { Response, Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './controller';
import { typeDefs } from './typeDefs';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();


export let pool: pkg.Pool | null = null;

const initializePool = (uri: string) => {
  pool = new Pool({ connectionString: uri });
};

export const app: Express = express();

app.use(express.json());

const server = new ApolloServer({ typeDefs, resolvers });

// starting apollo server and applying it to express app
// This route will be used to make GraphQL queries
server.start().then(() => {
  server.applyMiddleware({ app, path: '/api/graphql' });
});

app.get('/api/test', (_, res: Response) => {
  res.json({ greeting: 'Hello' });
});

app.post('/api/setDatabaseURI', (req, res) => {
  const { databaseURI } = req.body;

  if (!databaseURI) {
    return res.status(400).json({ error: 'Database URI is required' });
  }

  initializePool(databaseURI);

  res.json({ message: 'Database connection updated successfully' });
});



// app.get('/api/tables', dbController.getTableNames, (req, res) => {
//   res.status(200).json(res.locals.dbData)
// });

if (!process.env['VITE']) {
  console.log('inside vite conditional');
  const frontendFiles = process.cwd() + '/dist';
  app.use(express.static(frontendFiles));
  app.get('/*', (_, res: Response) => {
    res.send(frontendFiles + '/index.html');
  });
  app.listen(process.env['PORT']);
}
