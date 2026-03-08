import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendSeponse';
import { tagServices } from './tag.services';

const createTag = catchAsync(async (req, res) => {
  const result = await tagServices.createTagIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tag created successful',
    data: result,
  });
});
const getUserTags = catchAsync(async (req, res) => {
  const result = await tagServices.getTagFormDb(req.body.userId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tags retrieved successful',
    data: result,
  });
});

export const tagControllers = {
  createTag,
  getUserTags,
};
