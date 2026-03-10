import { Router } from 'express';
import { bookmarkControllers } from './bookmark.controller';

const router = Router();
router.get('/bookmark/link-preview', bookmarkControllers.getLinkPreview);

export const bookmarkRoutes = router;
