import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendSeponse';
import { folderServices } from './folder.services';

const createFolder = catchAsync(async (req, res) => {
  const result = await folderServices.createFolderIntoDb(req.body);
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
export const folderControllers = {
  createFolder,
  renameFolder,
  deleteFolder,
};
