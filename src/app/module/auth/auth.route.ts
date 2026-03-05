import { Router } from 'express';
import { authControllers } from './auth.controller';
import { validateRequest } from '../../middleware/validateRequest';
import {
  changePasswordValidationSchema,
  sendMailValidationSchema,
  userLoginValidationSchema,
  verifyOtpValidationSchema,
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

router.post(
  '/auth/verify-otp',
  validateRequest(verifyOtpValidationSchema),
  authControllers.verifyOtp,
);

router.post(
  '/auth/change-password',
  validateRequest(changePasswordValidationSchema),
  authControllers.changePassword,
);

export const authRoutes = router;
