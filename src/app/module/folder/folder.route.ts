import { Router } from 'express';
import { folderControllers } from './folder.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { createFolderValidationSchema, renameFolderValidationSchema } from './folder.validation';
import { auth } from '../../middleware/auth';

const router = Router();
router.post(
  '/folder/create',
  auth(),
  validateRequest(createFolderValidationSchema),
  folderControllers.createFolder,
);

router.post(
  '/folder/rename',
  auth(),
  validateRequest(renameFolderValidationSchema),
  folderControllers.renameFolder,
);

export const folderRoutes = router;
