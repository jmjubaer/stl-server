import { TFolder } from './folder.interface';
import { folderModel } from './folder.model';

const createFolderIntoDb = async (payload: TFolder) => {
  const result = await folderModel.create(payload);
  return result;
};

export const folderServices = {
  createFolderIntoDb,
};
