import AppError from '../../errors/AppError';
import { TFolder } from './folder.interface';
import { folderModel } from './folder.model';

const createFolderIntoDb = async (payload: TFolder) => {
  const isFolderExist = await folderModel.findOne({
    name: payload.name,
    userId: payload.userId,
  });
  if (isFolderExist) {
    throw new AppError(400, 'Folder already exists');
  }
  const result = await folderModel.create(payload);
  return result;
};

export const folderServices = {
  createFolderIntoDb,
};
