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
const createBookmark = catchAsync(async (req, res) => {
  const result = await bookmarkServices.createBookmarkIntoDb(
    req.body,
    req.user.id,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bookmark created successful',
    data: result,
  });
});
const pinBookmark = catchAsync(async (req, res) => {
  const result = await bookmarkServices.pinBookmarkIntoDb(
    req.params.id as string,
    req.user.id,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bookmark pin successful',
    data: result,
  });
});

const getUserBookmark = catchAsync(async (req, res) => {
  const result = await bookmarkServices.getUserBookmarkFromDb(
    req.user.id,
    req.query,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bookmark retrieved successful',
    data: result,
  });
});

const updateBookmark = catchAsync(async (req, res) => {
  const result = await bookmarkServices.updateUserBookmarkFromDb(
    req.params.id as string,
    req.user.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bookmark updated successful',
    data: result,
  });
});

const deleteBookmark = catchAsync(async (req, res) => {
  const result = await bookmarkServices.deleteBookmarkFromDb(
    req.params.id as string,
    req.user.id,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bookmark deleted successful',
    data: result,
  });
});
const addToFolder = catchAsync(async (req, res) => {
  const result = await bookmarkServices.addToFolderIntoDb(
    req.user.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Add Bookmark into folder successful',
    data: result,
  });
});

const updateVisitedCount = catchAsync(async (req, res) => {
  const result = await bookmarkServices.updateVisitCountIntoDb(
    req.params.id as string,
    req.user.id,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Update visited  at  successful',
    data: result,
  });
});

export const bookmarkControllers = {
  getLinkPreview,
  createBookmark,
  getUserBookmark,
  deleteBookmark,
  updateBookmark,
  addToFolder,
  updateVisitedCount,
  pinBookmark,
};
