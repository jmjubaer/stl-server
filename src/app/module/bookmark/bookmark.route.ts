import { Router } from 'express';
import { bookmarkControllers } from './bookmark.controller';
import { auth } from '../../middleware/auth';

const router = Router();
router.get('/bookmark/link-preview', bookmarkControllers.getLinkPreview);
router.post('/bookmark/create', auth(), bookmarkControllers.createBookmark);
router.get('/bookmark', auth(), bookmarkControllers.getUserBookmark);
router.delete('/bookmark/:id', auth(), bookmarkControllers.deleteBookmark);

export const bookmarkRoutes = router;
