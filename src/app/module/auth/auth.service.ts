import config from '../../config';
import AppError from '../../errors/AppError';
import { sendResetMail } from '../../utils/sendResetMail';
import { verifyToken } from '../../utils/verifyToken';
import { userModel } from '../user/user.model';
import { TLogin } from './auth.interface.';
import { checkPassword, createToken } from './auth.utils';
import bcrypt from 'bcrypt';

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

const sendOtp = async (email: string) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new AppError(404, 'User not found');
  }

  if (user?.isDeleted) {
    throw new AppError(401, 'User does not exist');
  }

  // Todo: Check password change time
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const resetPasswordOtp = await bcrypt.hash(otp, 10);
  const resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);

  await sendResetMail(email, otp);

  await userModel.findOneAndUpdate(
    { email },
    {
      resetPasswordOtp: resetPasswordOtp,
      resetPasswordExpires: resetPasswordExpires,
    },
  );
};

export const authServices = {
  loginUser,
  getAccessTokenByRefreshToken,
  sendOtp,
};
