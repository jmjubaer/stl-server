/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import mongoose, { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { userModel } from '../user/user.model';
import { TTag } from './tag.interface';
import { tagModel } from './tag.model';
import { StatusCodes } from 'http-status-codes';
import { bookmarkModel } from '../bookmark/bookmark.model';

const createTagIntoDB = async (payload: TTag, userId: string) => {
  const isTagExist = await tagModel.findOne({
    name: payload.name.toLowerCase(),
    userId,
  });
  if (isTagExist) {
    throw new Error('Tag already exists');
  }
  const isUserExist = await userModel.findById(userId);
  if (!isUserExist) {
    throw new AppError(404, 'User not found');
  }
  const tag = await tagModel.create({
    ...payload,
    name: payload.name.toLowerCase(),
    userId,
  });
  return tag;
};

const getUserTagFormDb = async (userId: string) => {
  const result = await tagModel.find({ userId: new Types.ObjectId(userId) });
  return result;
};

const deleteUserTagFormDb = async (tagId: string, userId: string) => {
  // 1. Check if tag exists and belongs to user
  const tag = await tagModel.findOne({
    _id: tagId,
    userId: new Types.ObjectId(userId),
  });

  if (!tag) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tag not found');
  }

  if (tag.userId.toString() !== userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to delete this tag',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // 2. Delete the tag
    await tagModel.findByIdAndDelete(tagId, { session });

    // 3. Remove tag from all bookmarks that use it
    await bookmarkModel.updateMany(
      { tags: tagId }, // find bookmarks that have this tag
      { $pull: { tags: tagId } }, // remove tag from tags array
      { session },
    );

    await session.commitTransaction();

    return { message: 'Tag deleted successfully' };
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to delete tag',
    );
  } finally {
    session.endSession();
  }
};

export const tagServices = {
  createTagIntoDB,
  getUserTagFormDb,
  deleteUserTagFormDb,
};
