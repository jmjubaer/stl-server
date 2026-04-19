"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_services_1 = require("./user.services");
const catchAsync_1 = require("../../utils/catchAsync");
const sendSeponse_1 = __importDefault(require("../../utils/sendSeponse"));
const createUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const data = req.body;
    const result = await user_services_1.userServices.createUserIntoDb(data);
    const { accessToken, refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    (0, sendSeponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User created successfully',
        data: accessToken,
    });
});
const getMe = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_services_1.userServices.getMeFromDb(req?.user?.id);
    (0, sendSeponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Getting me successfully',
        data: result,
    });
});
const updateMe = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await user_services_1.userServices.updateMeIntoDb(req?.user?.id, req.body);
    (0, sendSeponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Update my profile successful',
        data: result,
    });
});
exports.userControllers = {
    createUser,
    getMe,
    updateMe,
};
