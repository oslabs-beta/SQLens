import express, { Request, Response, NextFunction} from 'express'; 
export const app = express();

app.get('/api/test', (_, res) => 
    res.status(200).json({ greeting: "Hello" }
))

app.get('/api/sqlData', (_, res) => {
  res.status(200).json({ data: "this is sql test data" })
})

if (!process.env['VITE']) {
  const frontendFiles = process.cwd() + '/dist'
  app.use(express.static(frontendFiles))
  app.get('/*', (_, res) => {
    res.send(frontendFiles + '/index.html')
  })
  app.listen(process.env['PORT'])

  app.use('*', (req: Request, res: Response) =>
    res.status(404).send("Error: 404 This is not the page you're looking for...")
  );

  // catch global errors
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    console.log(errorObj.message);
    return res.status(errorObj.status).json(errorObj.message);
  });

  }