import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import { userModel } from '../user/user.model';
import { TTag } from './tag.interface';
import { tagModel } from './tag.mode';

const createTagIntoDB = async (payload: TTag) => {
  const isTagExist = await tagModel.findOne({
    name: payload.name,
    userId: payload.userId,
  });
  if (isTagExist) {
    throw new Error('Tag already exists');
  }
  const isUserExist = await userModel.findById(payload.userId);
  if (!isUserExist) {
    throw new AppError(404, 'User not found');
  }
  const tag = await tagModel.create({
    ...payload,
    name: payload.name.toLowerCase(),
  });
  return tag;
};

const getTagFormDb = async (userId: string) => {
  const result = await tagModel.find({ userId: new Types.ObjectId(userId)});
  return result;
};

export const tagServices = {
  createTagIntoDB,
  getTagFormDb,
};
