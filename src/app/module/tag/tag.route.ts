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

router.get(
  '/tag/get-tags',
  tagControllers.getUserTags,
);

export const tagRoutes = router;
