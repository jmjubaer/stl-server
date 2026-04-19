"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const sendResetMail_1 = require("../../utils/sendResetMail");
const verifyToken_1 = require("../../utils/verifyToken");
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = async (payload) => {
    const user = await user_model_1.userModel
        .findOne({ email: payload?.email })
        .select('+password');
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    if (user?.isDeleted) {
        throw new AppError_1.default(401, 'User does not exist');
    }
    const isPasswordMatch = await (0, auth_utils_1.checkPassword)(payload?.password, user?.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(403, 'Incorrect password');
    }
    const jwtPayload = {
        id: user?.id,
        email: user?.email,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, '30d');
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, '90d');
    return {
        accessToken,
        refreshToken,
    };
};
const getAccessTokenByRefreshToken = async (token) => {
    const decoded = (0, verifyToken_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
    const user = await user_model_1.userModel.findById(decoded?.id);
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    if (user?.isDeleted) {
        throw new AppError_1.default(401, 'User does not exist');
    }
    const jwtPayload = {
        id: user?.id,
        email: user?.email,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, '7d');
    return accessToken;
};
const sendOtp = async (email) => {
    const user = await user_model_1.userModel.findOne({ email });
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    if (user?.isDeleted) {
        throw new AppError_1.default(401, 'User does not exist');
    }
    // Todo: Check password change time
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const resetPasswordOtp = await bcrypt_1.default.hash(otp, 10);
    const resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000);
    await (0, sendResetMail_1.sendResetMail)(email, otp);
    await user_model_1.userModel.findOneAndUpdate({ email }, {
        resetPasswordOtp: resetPasswordOtp,
        resetPasswordExpires: resetPasswordExpires,
    });
};
const verifyOtpIntoServer = async (payload) => {
    const user = await user_model_1.userModel.findOne({ email: payload?.email });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED, 'User not found');
    }
    if (user?.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'User does not exist');
    }
    if (!user?.resetPasswordOtp || !user?.resetPasswordExpires) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'OTP not requested');
    }
    if (new Date() > user?.resetPasswordExpires) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'OTP is expired');
    }
    const isOtpValid = await bcrypt_1.default.compare(String(payload?.otp), user?.resetPasswordOtp);
    if (!isOtpValid) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'OTP is incorrect');
    }
};
const changePasswordByOtp = async (payload) => {
    const user = await user_model_1.userModel.findOne({ email: payload?.email });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_IMPLEMENTED, 'User not found');
    }
    if (user?.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'User does not exist');
    }
    if (!user?.resetPasswordOtp || !user?.resetPasswordExpires) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'OTP not requested');
    }
    // already verify in last stage====================
    // if (new Date() > user?.resetPasswordExpires) {
    //   throw new AppError(StatusCodes.BAD_REQUEST, 'OTP is expired');
    // }
    const isOtpValid = await bcrypt_1.default.compare(String(payload?.otp), user?.resetPasswordOtp);
    if (!isOtpValid) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'OTP is incorrect');
    }
    user.resetPasswordOtp = null;
    user.resetPasswordExpires = null;
    user.password = payload?.newPassword;
    await user.save();
};
exports.authServices = {
    sendOtp,
    loginUser,
    verifyOtpIntoServer,
    changePasswordByOtp,
    getAccessTokenByRefreshToken,
};
