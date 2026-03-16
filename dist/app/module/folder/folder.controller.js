"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendSeponse_1 = __importDefault(require("../../utils/sendSeponse"));
const folder_services_1 = require("./folder.services");
const createFolder = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await folder_services_1.folderServices.createFolderIntoDb(req.body);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Folder created successful',
        data: result,
    });
});
const renameFolder = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await folder_services_1.folderServices.renameFolderIntoDb(req.params.id, req.body.newName, req.user.id);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Rename folder successful',
        data: result,
    });
});
const deleteFolder = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await folder_services_1.folderServices.deleteFolderIntoDb(req.params.id, req.user.id);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Deleted folder successful',
        data: result,
    });
});
exports.folderControllers = {
    createFolder,
    renameFolder,
    deleteFolder,
};
