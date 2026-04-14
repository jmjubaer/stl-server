import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendSeponse';
import { folderServices } from './folder.services';

const getFolder = catchAsync(async (req, res) => {
  const result = await folderServices.getFolderFromDb(req.user.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Folder retrieved successful',
    data: result,
  });
});
const createFolder = catchAsync(async (req, res) => {
  const result = await folderServices.createFolderIntoDb(req.body, req.user.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Folder created successful',
    data: result,
  });
});

const renameFolder = catchAsync(async (req, res) => {
  const result = await folderServices.renameFolderIntoDb(
    req.params.id as string,
    req.body.newName,
    req.user.id,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Rename folder successful',
    data: result,
  });
});
const deleteFolder = catchAsync(async (req, res) => {
  const result = await folderServices.deleteFolderIntoDb(
    req.params.id as string,
    req.user.id,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Deleted folder successful',
    data: result,
  });
});

const getShareFolder = catchAsync(async (req, res) => {
  const result = await folderServices.getShareFolderFromDb(
    req.params.id as string,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Getting share folder successful',
    data: result,
  });
});
export const folderControllers = {
  createFolder,
  renameFolder,
  deleteFolder,
  getFolder,
  getShareFolder,
};
