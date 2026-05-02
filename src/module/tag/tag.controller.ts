import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendSeponse';
import { tagServices } from './tag.services';

const createTag = catchAsync(async (req, res) => {
  const result = await tagServices.createTagIntoDB(req.body, req.user.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tag created successful',
    data: result,
  });
});
const getUserTags = catchAsync(async (req, res) => {
  const result = await tagServices.getUserTagFormDb(req.user.id as string);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tags retrieved successful',
    data: result,
  });
});

const deleteTags = catchAsync(async (req, res) => {
  const result = await tagServices.deleteUserTagFormDb(
    req.params.id as string,
    req.user.id,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tags deleted successful',
    data: result,
  });
});

export const tagControllers = {
  createTag,
  getUserTags,
  deleteTags,
};
