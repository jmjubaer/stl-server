import { Router } from 'express';
import { userControllers } from './user.controllers';
import { validateRequest } from '../../middleware/validateRequest';
import {
  createUserValidationSchema,
  updateUserValidationSchema,
} from './user.validation';
import { auth } from '../../middleware/auth';

const router = Router();

router.post(
  '/create',
  validateRequest(createUserValidationSchema),
  userControllers.createUser,
);

router.get('/me', auth(), userControllers.getMe);
router.patch(
  '/me/update',
  auth(),
  validateRequest(updateUserValidationSchema),
  userControllers.updateMe,
);

export const userRoutes = router;
