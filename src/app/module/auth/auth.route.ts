import { Router } from 'express';
import { authControllers } from './auth.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { userLoginValidationSchema } from './auth.validation';

const router = Router();

router.post(
  '/auth/login',
  validateRequest(userLoginValidationSchema),
  authControllers.loginUser,
);

router.post('/auth/access-token', authControllers.getAccessToken);

export const authRoutes = router;
