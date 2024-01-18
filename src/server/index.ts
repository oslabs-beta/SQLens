import express, { Express, Response } from 'express'; 
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './controller';
import { typeDefs } from './typeDefs';
export const app: Express = express();

const server = new ApolloServer({ typeDefs, resolvers });

// starting apollo server and applying it to express app
// This route will be used to make GraphQL queries
server.start().then(() => {
  server.applyMiddleware({ app: app as any, path: '/api/graphql' });
});


app.get('/api/test', (_, res: Response) => {
    res.json({ greeting: "Hello" })
})


// app.get('/api/tables', dbController.getTableNames, (req, res) => {
//   res.status(200).json(res.locals.dbData)
// });

if (!process.env['VITE']) {
  console.log('inside vite conditional')
    const frontendFiles = process.cwd() + '/dist'
    app.use(express.static(frontendFiles))
    app.get('/*', (_, res: Response) => {
      res.send(frontendFiles + '/index.html')
    })
    app.listen(process.env['PORT'])
  }