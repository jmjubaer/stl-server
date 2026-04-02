/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import mongoose, { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { userModel } from '../user/user.model';
import { TFolder } from './folder.interface';
import { folderModel } from './folder.model';
import { bookmarkModel } from '../bookmark/bookmark.model';

const createFolderIntoDb = async (payload: TFolder, userId: string) => {
  const isFolderExist = await folderModel.findOne({
    name: payload.name.toLowerCase(),
    userId,
  });
  if (isFolderExist) {
    throw new AppError(400, 'Folder already exists');
  }

  const isUserExist = await userModel.findById(userId);
  if (!isUserExist) {
    throw new AppError(404, 'User not found');
  }
  const result = await folderModel.create({
    ...payload,
    name: payload.name.toLowerCase(),
    userId,
  });
  return result;
};

const renameFolderIntoDb = async (
  id: string,
  newName: string,
  userId: string,
) => {
  const isFolderExist = await folderModel.findOne({ _id: id, userId: userId });
  if (!isFolderExist) {
    throw new AppError(404, 'Folder not found');
  }

  if (isFolderExist.name.toLowerCase() === newName.toLowerCase()) {
    throw new AppError(404, 'New name is same as old name');
  }

  const result = await folderModel.findByIdAndUpdate(
    id,
    { name: newName.toLowerCase() },
    { new: true },
  );
  return result;
};

// Todo: after bookmark api
const deleteFolderIntoDb = async (id: string, userId: string) => {
  const isFolderExist = await folderModel.findOne({ _id: id, userId });
  if (!isFolderExist) {
    throw new AppError(404, 'Folder not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await folderModel.findByIdAndDelete(id, { session });

    await bookmarkModel.updateMany(
      {
        folder: id,
      },
      {
        $unset: { folder: '' },
      },
      {
        session,
      },
    );
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(500, 'Failed to delete folder');
  } finally {
    session.endSession();
  }
};

export const folderServices = {
  createFolderIntoDb,
  renameFolderIntoDb,
  deleteFolderIntoDb,
};
