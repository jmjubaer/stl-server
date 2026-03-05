import { Router } from 'express';
import { authControllers } from './auth.controller';
import { validateRequest } from '../../middleware/validateRequest';
import {
  sendMailValidationSchema,
  userLoginValidationSchema,
} from './auth.validation';

const router = Router();

router.post(
  '/auth/login',
  validateRequest(userLoginValidationSchema),
  authControllers.loginUser,
);

router.post('/auth/access-token', authControllers.getAccessToken);

router.post(
  '/auth/send-otp',
  validateRequest(sendMailValidationSchema),
  authControllers.sendOtp,
);

export const authRoutes = router;
