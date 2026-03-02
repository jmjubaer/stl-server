import { Router } from 'express';
import { userControllers } from './user.controllers';
import { validateRequest } from '../../middleware/validateRequest';
import { createUserValidationSchema } from './user.validation';

const router = Router();

router.post(
  '/user/create',
  validateRequest(createUserValidationSchema),
  userControllers.createUser,
);

router.get('/user/me', userControllers.getMe);
router.put('/user/me/update', userControllers.updateMe);

export const userRoutes = router;
