import { Router } from 'express';
import { folderControllers } from './folder.controller';
import { validateRequest } from '../../middleware/validateRequest';
import {
  createFolderValidationSchema,
  renameFolderValidationSchema,
} from './folder.validation';
import { auth } from '../../middleware/auth';

const router = Router();
router.post(
  '/folder/create',
  auth(),
  validateRequest(createFolderValidationSchema),
  folderControllers.createFolder,
);
router.patch(
  '/folder/:id',
  auth(),
  validateRequest(renameFolderValidationSchema),
  folderControllers.renameFolder,
);
router.delete(
  '/folder/:id',
  auth(),
  folderControllers.deleteFolder,
);

export const folderRoutes = router;
