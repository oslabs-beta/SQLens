import express from 'express'; 
import { dbController } from './controller';
export const app = express();


app.get('/api/test', (_, res) => 
    res.json({ greeting: "Hello" }
))


app.get('/api/tables', dbController.getTableNames, (req, res) => {
  res.status(200).json(res.locals.dbData)
});
if (!process.env['VITE']) {
  console.log('inside vite conditional')
    const frontendFiles = process.cwd() + '/dist'
    app.use(express.static(frontendFiles))
    app.get('/*', (_, res) => {
      res.send(frontendFiles + '/index.html')
    })
    app.listen(process.env['PORT'])
  }