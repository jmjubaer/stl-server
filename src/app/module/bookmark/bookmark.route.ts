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
router.patch(
  '/bookmark/add-to-folder',
  auth(),
  validateRequest(addToFolderValidationSchema),
  bookmarkControllers.addToFolder,
);
router.patch(
  '/bookmark/visitedAt/:id',
  auth(),
  bookmarkControllers.updateVisitedCount,
);

export const bookmarkRoutes = router;
