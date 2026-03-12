import { Router } from 'express';
import { bookmarkControllers } from './bookmark.controller';

const router = Router();
router.get('/bookmark/link-preview', bookmarkControllers.getLinkPreview);
router.post('/bookmark/create', bookmarkControllers.createBookmark);

export const bookmarkRoutes = router;
