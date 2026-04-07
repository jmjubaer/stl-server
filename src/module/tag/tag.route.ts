import { Router } from 'express';
import { tagControllers } from './tag.controller';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { createTagValidationSchema } from './tag.validation';

const router = Router();

router.post(
  '/create',
  auth(),
  validateRequest(createTagValidationSchema),
  tagControllers.createTag,
);

router.get('/', auth(), tagControllers.getUserTags);

router.delete('/:id', auth(), tagControllers.deleteTags);

export const tagRoutes = router;
