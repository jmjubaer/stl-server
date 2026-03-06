import { Router } from 'express';
import { folderControllers } from './folder.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { createFolderValidationSchema } from './folder.validation';
import { auth } from '../../middleware/auth';

const router = Router();
router.post(
  '/folder/create',
  auth(),
  validateRequest(createFolderValidationSchema),
  folderControllers.createFolder,
);

export const folderRoutes = router;
