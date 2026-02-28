import { Router } from 'express';
import { userControllers } from './user.controllers';

const router = Router();

router.post('/user/create', userControllers.createUser);

export const userRoutes = router;
