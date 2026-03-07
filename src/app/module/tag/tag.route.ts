import { Router } from 'express';
import { tagControllers } from './tag.controller';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { createTagValidationSchema } from './tag.validation';

const router = Router();

router.post(
  '/tag/create',
  auth(),
  validateRequest(createTagValidationSchema),
  tagControllers.createTag,
);

export const tagRoutes = router;
