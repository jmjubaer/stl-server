import { Router } from 'express';
import { folderControllers } from './folder.controller';

const router = Router();
router.post("/folder/create", folderControllers.createFolder)

export const folderRoutes = router;
