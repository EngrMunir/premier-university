
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
export const app:Application = express()

// parsers
app.use(express.json())
app.use(cors());

// application routes

app.use('/api/v1', router);

const test =(req:Request, res:Response) =>{
  const a =10;
  res.send(a);
};

app.get('/',test);

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler);
app.use(notFound);

export default app;