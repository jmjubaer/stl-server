import { Types } from 'mongoose';
import config from '../../config';
import { createToken } from '../auth/auth.utils';
import { tagModel } from '../tag/tag.mode';
import { TUser } from './user.interface';
import { userModel } from './user.model';

const createUserIntoDb = async (payload: TUser) => {
  const user = await userModel.create(payload);
  const jwtPayload = {
    id: user?._id,
    email: user?.email,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '7d',
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    '30d',
  );
  return {
    accessToken,
    refreshToken,
  };
};

const getMeFromDb = async (id: string) => {
  const result = await userModel.findById(id);
  const useTag = await tagModel.find({ userId: id });
  return { userInfo: result, useTag };
};

const updateMeIntoDb = async (id: string, payload: Partial<TUser>) => {
  // remove password and email from payload if exist
  delete payload.password;
  delete payload.email;

  const result = await userModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const userServices = {
  createUserIntoDb,
  getMeFromDb,
  updateMeIntoDb,
};
