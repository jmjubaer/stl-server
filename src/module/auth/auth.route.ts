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
  '/login',
  validateRequest(userLoginValidationSchema),
  authControllers.loginUser,
);

router.post('/access-token', authControllers.getAccessToken);

router.post(
  '/send-otp',
  validateRequest(sendMailValidationSchema),
  authControllers.sendOtp,
);

router.post(
  '/verify-otp',
  validateRequest(verifyOtpValidationSchema),
  authControllers.verifyOtp,
);

router.post(
  '/reset-password',
  validateRequest(changePasswordValidationSchema),
  authControllers.changePassword,
);

export const authRoutes = router;
