import config from '../../config';
import AppError from '../../errors/AppError';
import { verifyToken } from '../../utils/verifyToken';
import { userModel } from '../user/user.model';
import { TLogin } from './auth.interface.';
import { checkPassword, createToken } from './auth.utils';

const loginUser = async (payload: TLogin) => {
  const user = await userModel
    .findOne({ email: payload?.email })
    .select('+password');

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  if (user?.isDeleted) {
    throw new AppError(401, 'User does not exist');
  }

  const isPasswordMatch = await checkPassword(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(403, 'Incorrect password');
  }
  const jwtPayload = {
    id: user?.id,
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

const getAccessTokenByRefreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const user = await userModel.findById(decoded?.id);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  if (user?.isDeleted) {
    throw new AppError(401, 'User does not exist');
  }

  const jwtPayload = {
    id: user?.id,
    email: user?.email,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '7d',
  );
  return accessToken;
};

const resetPassword = async (email: string) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  if (user?.isDeleted) {
    throw new AppError(401, 'User does not exist');
  }
//   Todo: check password change time
  
};

export const authServices = {
  loginUser,
  getAccessTokenByRefreshToken,
  resetPassword,
};
