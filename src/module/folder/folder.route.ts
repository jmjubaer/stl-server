import { Router } from 'express';
import { folderControllers } from './folder.controller';
import { validateRequest } from '../../middleware/validateRequest';
import {
  createFolderValidationSchema,
  renameFolderValidationSchema,
} from './folder.validation';
import { auth } from '../../middleware/auth';

const router = Router();
router.get('/', auth(), folderControllers.getFolder);
router.post(
  '/create',
  auth(),
  validateRequest(createFolderValidationSchema),
  folderControllers.createFolder,
);
router.patch(
  '/:id',
  auth(),
  validateRequest(renameFolderValidationSchema),
  folderControllers.renameFolder,
);
router.delete('/:id', auth(), folderControllers.deleteFolder);

export const folderRoutes = router;
