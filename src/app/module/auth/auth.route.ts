import { Router } from 'express';
import { authControllers } from './auth.controller';

const router = Router();

router.post('/auth/login', authControllers.loginUser);

export const authRoutes = router;
