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

export const tagControllers = {
  createTag,
};
