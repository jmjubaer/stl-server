import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Stl Server is runner on port 5000');
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
