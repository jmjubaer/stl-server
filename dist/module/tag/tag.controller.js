"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendSeponse_1 = __importDefault(require("../../utils/sendSeponse"));
const tag_services_1 = require("./tag.services");
const createTag = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await tag_services_1.tagServices.createTagIntoDB(req.body, req.user.id);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Tag created successful',
        data: result,
    });
});
const getUserTags = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await tag_services_1.tagServices.getUserTagFormDb(req.user.id);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Tags retrieved successful',
        data: result,
    });
});
const deleteTags = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await tag_services_1.tagServices.deleteUserTagFormDb(req.params.id);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Tags deleted successful',
        data: result,
    });
});
exports.tagControllers = {
    createTag,
    getUserTags,
    deleteTags,
};
