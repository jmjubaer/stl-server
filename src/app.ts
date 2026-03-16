import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import { notFound } from './middleware/notFound';
import { userRoutes } from './module/user/user.routes';
import { authRoutes } from './module/auth/auth.route';
import cookieParser from 'cookie-parser';
import { folderRoutes } from './module/folder/folder.route';
import { tagRoutes } from './module/tag/tag.route';
import { bookmarkRoutes } from './module/bookmark/bookmark.route';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
const app: Application = express();
// Security middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true, // allow cookies
  }),
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per 15 mins
  message: 'Too many requests, please try again later',
});
app.use('/api', limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', (req: Request, res: Response) => {
  res.send('Stl Server is runner on port 5000');
});

// Central router
const routes = [
  { path: '/user', route: userRoutes },
  { path: '/auth', route: authRoutes },
  { path: '/folder', route: folderRoutes },
  { path: '/tag', route: tagRoutes },
  { path: '/bookmark', route: bookmarkRoutes },
];

routes.forEach(({ path, route }) => app.use(`/api/v1${path}`, route));

app.use(globalErrorHandler);
app.use(notFound);
export default app;
