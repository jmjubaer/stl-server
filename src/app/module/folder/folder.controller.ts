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
  const result = await folderServices.renameFolderIntoDb(req.body)
  sendResponse(res,{
    statusCode: StatusCodes.OK,
    success: true,
    message: "Rename folder successful",
    data: result
  })
});
export const folderControllers = {
  createFolder,
  renameFolder,
};
