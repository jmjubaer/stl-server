import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendSeponse';
import { authServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { accessToken, refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User Login Successful',
    data: accessToken,
  });
});

const getAccessToken = catchAsync(async (req, res) => {
  const result = await authServices.getAccessTokenByRefreshToken(
    req?.cookies?.refreshToken,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Create access token successful',
    data: result,
  });
});

const sendOtp = catchAsync(async (req, res) => {
  await authServices.sendOtp(req?.body?.email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Otp send successful',
    data: {},
  });
});

const verifyOtp = catchAsync(async (req, res) => {
  await authServices.verifyOtpIntoServer(req?.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Otp verify successful',
    data: {},
  });
});

const changePassword = catchAsync(async (req, res) => {
  await authServices.changePasswordByOtp(req?.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password change successful',
    data: {},
  });
});

export const authControllers = {
  sendOtp,
  verifyOtp,
  loginUser,
  changePassword,
  getAccessToken,
};
