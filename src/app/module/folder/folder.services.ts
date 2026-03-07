import AppError from '../../errors/AppError';
import { TFolder } from './folder.interface';
import { folderModel } from './folder.model';

const createFolderIntoDb = async (payload: TFolder) => {
  const isFolderExist = await folderModel.findOne({
    name: payload.name.toLowerCase(),
    userId: payload.userId,
  });
  if (isFolderExist) {
    throw new AppError(400, 'Folder already exists');
  }
  const isUserExist = await folderModel.findOne({ userId: payload.userId });
  if (!isUserExist) {
    throw new AppError(404, 'User not found');
  }
  const result = await folderModel.create({
    ...payload,
    name: payload.name.toLowerCase(),
  });
  return result;
};

const renameFolderIntoDb = async (payload: { id: string; newName: string }) => {
  const isFolderExist = await folderModel.findById(payload.id);
  if (!isFolderExist) {
    throw new AppError(404, 'Folder not found');
  }

  if (isFolderExist.name.toLowerCase() === payload.newName.toLowerCase()) {
    throw new AppError(404, 'New name is same as old name');
  }

  const result = await folderModel.findByIdAndUpdate(
    payload.id,
    { name: payload.newName.toLowerCase() },
    { new: true },
  );
  return result;
};

// Todo: after bookmark api
// const deleteFolderIntoDb = async (id: string) => {
//   const isFolderExist = await folderModel.findById(id);
//   if (!isFolderExist) {
//     throw new AppError(404, 'Folder not found');
//   }
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();

//     const result = await folderModel.findByIdAndDelete(id);
//     const deleteFolderId = await
//     return result;
//   } catch (error) {}
// };

export const folderServices = {
  createFolderIntoDb,
  renameFolderIntoDb,
};
