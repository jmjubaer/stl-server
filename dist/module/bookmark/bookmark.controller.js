"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendSeponse_1 = __importDefault(require("../../utils/sendSeponse"));
const bookmark_service_1 = require("./bookmark.service");
const getLinkPreview = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const url = req.query.url;
    const result = await bookmark_service_1.bookmarkServices.getLinkInfo(url);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Link preview successful',
        data: result,
    });
});
const createBookmark = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await bookmark_service_1.bookmarkServices.createBookmarkIntoDb(req.body, req.user.id);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Bookmark created successful',
        data: result,
    });
});
const pinBookmark = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await bookmark_service_1.bookmarkServices.pinBookmarkIntoDb(req.params.id, req.user.id);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Bookmark pin successful',
        data: result,
    });
});
const getUserBookmark = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await bookmark_service_1.bookmarkServices.getUserBookmarkFromDb(req.user.id, req.query);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Bookmark retrieved successful',
        data: result,
    });
});
const updateBookmark = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await bookmark_service_1.bookmarkServices.updateUserBookmarkFromDb(req.params.id, req.user.id, req.body);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Bookmark updated successful',
        data: result,
    });
});
const deleteBookmark = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await bookmark_service_1.bookmarkServices.deleteBookmarkFromDb(req.params.id, req.user.id);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Bookmark deleted successful',
        data: result,
    });
});
const addToFolder = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await bookmark_service_1.bookmarkServices.addToFolderIntoDb(req.user.id, req.body);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Add Bookmark into folder successful',
        data: result,
    });
});
const updateVisitedCount = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await bookmark_service_1.bookmarkServices.updateVisitCountIntoDb(req.params.id, req.user.id);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Update visited  at  successful',
        data: result,
    });
});
exports.bookmarkControllers = {
    getLinkPreview,
    createBookmark,
    getUserBookmark,
    deleteBookmark,
    updateBookmark,
    addToFolder,
    updateVisitedCount,
    pinBookmark,
};
