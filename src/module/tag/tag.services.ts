import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { userModel } from '../user/user.model';
import { TTag } from './tag.interface';
import { tagModel } from './tag.mode';
import { StatusCodes } from 'http-status-codes';

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

const deleteUserTagFormDb = async (tagId: string) => {
  const result = await tagModel.findByIdAndDelete(tagId);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Tags not fond');
  }

  return result;
};

export const tagServices = {
  createTagIntoDB,
  getUserTagFormDb,
  deleteUserTagFormDb,
};
