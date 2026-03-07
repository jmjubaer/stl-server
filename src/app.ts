import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';
import { userRoutes } from './app/module/user/user.routes';
import { authRoutes } from './app/module/auth/auth.route';
import cookieParser from 'cookie-parser';
import { folderRoutes } from './app/module/folder/folder.route';
import { tagRoutes } from './app/module/tag/tag.route';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.get('/', (req: Request, res: Response) => {
  res.send('Stl Server is runner on port 5000');
});

app.use('/api/v1', userRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', folderRoutes);
app.use('/api/v1', tagRoutes);



app.use(globalErrorHandler);
app.use(notFound);
export default app;
