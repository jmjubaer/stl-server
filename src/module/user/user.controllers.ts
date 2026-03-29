import { Request, Response } from 'express';
import { userServices } from './user.services';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendSeponse';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await userServices.createUserIntoDb(data);
  const { accessToken, refreshToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: false,
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully',
    data: accessToken,
  });
});
const getMe = catchAsync(async (req, res) => {
  const result = await userServices.getMeFromDb(req?.user?.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Getting me successfully',
    data: result,
  });
});

const updateMe = catchAsync(async (req, res) => {
  const result = await userServices.updateMeIntoDb(req?.user?.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update my profile successful',
    data: result,
  });
});
export const userControllers = {
  createUser,
  getMe,
  updateMe,
};
