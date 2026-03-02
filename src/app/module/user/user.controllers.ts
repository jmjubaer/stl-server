import { Request, Response } from 'express';
import { userServices } from './user.services';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendSeponse';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await userServices.createUserIntoDb(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully',
    data: result,
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
