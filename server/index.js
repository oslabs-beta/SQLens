var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './controller';
import { typeDefs } from './typeDefs';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import open from 'open';
import fs from 'fs';
dotenv.config();
export let pool = null;
const initializePool = (uri) => {
    pool = new Pool({ connectionString: uri });
};
export const app = express();
app.use(express.json());
const server = new ApolloServer({ typeDefs, resolvers });
let migration_file = './public/migration_log.txt';
if (!process.env['VITE']) {
    migration_file = './dist/migration_log.txt'; //route need to be changed for production vs dev mode
}
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.start();
        server.applyMiddleware({ app, path: '/api/graphql' });
        app.get('/api/test', (_, res) => {
            res.json({ greeting: 'Hello' });
        });
        app.post('/api/setDatabaseURI', (req, res) => {
            const { databaseURI } = req.body;
            if (!databaseURI) {
                return res.status(400).json({ error: 'Database URI is required' });
            }
            initializePool(databaseURI);
            const currentTimestamp = new Date().toLocaleString();
            fs.writeFileSync(migration_file, //route needs to be changed for production vs dev mode
            `--\n-- Migration log\n-- Database URL: ${databaseURI}\n-- Session started ${currentTimestamp}\n--\n`);
            res.json({ message: 'Database connection updated successfully' });
        });
        // Conditional Express static file serving and application start
        if (!process.env['VITE']) {
            // console.log('Serving static files and starting Express server.');
            const frontendFiles = process.cwd() + '/dist';
            app.use(express.static(frontendFiles));
            app.get('/*', (_, res) => {
                res.sendFile(`${frontendFiles}/index.html`);
            });
            const PORT = process.env.PORT || 3000;
            app.listen(PORT, () => {
                console.log(`Server running on http://localhost:${PORT}`);
                open(`http://localhost:${PORT}`);
            });
        }
    });
}
startServer().catch((error) => {
    console.error('Failed to start the server:', error);
});
