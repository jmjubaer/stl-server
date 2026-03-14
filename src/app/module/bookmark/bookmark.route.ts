import { Router } from 'express';
import { bookmarkControllers } from './bookmark.controller';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import { createBookmarkValidationSchema, updateBookmarkValidationSchema } from './bookmark.validation';

const router = Router();
router.get('/bookmark/link-preview', bookmarkControllers.getLinkPreview);
router.post(
  '/bookmark/create',
  auth(),
  validateRequest(createBookmarkValidationSchema),
  bookmarkControllers.createBookmark,
);
router.get('/bookmark', auth(), bookmarkControllers.getUserBookmark);
router.put(
  '/bookmark/:id',
  auth(),
  validateRequest(updateBookmarkValidationSchema),
  bookmarkControllers.updateBookmark,
);
router.delete('/bookmark/:id', auth(), bookmarkControllers.deleteBookmark);

export const bookmarkRoutes = router;
