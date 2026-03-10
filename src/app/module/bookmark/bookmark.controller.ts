import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendSeponse';
import { bookmarkServices } from './bookmark.service';
const getLinkPreview = catchAsync(async (req, res) => {
  const url = req.query.url;
 
  
  const result = await bookmarkServices.getLinkInfo(url as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Link preview successful',
    data: result,
  });
});

export const bookmarkControllers = {
  getLinkPreview,
};
