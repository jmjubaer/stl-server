"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendSeponse_1 = __importDefault(require("../../utils/sendSeponse"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await auth_service_1.authServices.loginUser(req.body);
    const { accessToken, refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'User Login Successful',
        data: accessToken,
    });
});
const getAccessToken = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const result = await auth_service_1.authServices.getAccessTokenByRefreshToken(req?.cookies?.refreshToken);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Create access token successful',
        data: result,
    });
});
const sendOtp = (0, catchAsync_1.catchAsync)(async (req, res) => {
    await auth_service_1.authServices.sendOtp(req?.body?.email);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Otp send successful',
        data: {},
    });
});
const verifyOtp = (0, catchAsync_1.catchAsync)(async (req, res) => {
    await auth_service_1.authServices.verifyOtpIntoServer(req?.body);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Otp verify successful',
        data: {},
    });
});
const changePassword = (0, catchAsync_1.catchAsync)(async (req, res) => {
    await auth_service_1.authServices.changePasswordByOtp(req?.body);
    (0, sendSeponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Password change successful',
        data: {},
    });
});
exports.authControllers = {
    sendOtp,
    verifyOtp,
    loginUser,
    changePassword,
    getAccessToken,
};
