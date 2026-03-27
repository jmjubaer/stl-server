import { Router } from 'express';
import { bookmarkControllers } from './bookmark.controller';
import { auth } from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import {
  addToFolderValidationSchema,
  createBookmarkValidationSchema,
  updateBookmarkValidationSchema,
} from './bookmark.validation';

const router = Router();
router.get('/link-preview', bookmarkControllers.getLinkPreview);
router.post(
  '/create',
  auth(),
  validateRequest(createBookmarkValidationSchema),
  bookmarkControllers.createBookmark,
);
router.post('/pin/:id', auth(), bookmarkControllers.pinBookmark);
router.get('/', auth(), bookmarkControllers.getUserBookmark);
router.put(
  '/:id',
  auth(),
  validateRequest(updateBookmarkValidationSchema),
  bookmarkControllers.updateBookmark,
);
router.delete('/:id', auth(), bookmarkControllers.deleteBookmark);
router.patch(
  '/add-to-folder',
  auth(),
  validateRequest(addToFolderValidationSchema),
  bookmarkControllers.addToFolder,
);
router.patch('/visitedAt/:id', auth(), bookmarkControllers.updateVisitedCount);

export const bookmarkRoutes = router;
