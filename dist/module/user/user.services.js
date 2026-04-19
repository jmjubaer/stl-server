"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("../auth/auth.utils");
const tag_model_1 = require("../tag/tag.model");
const user_model_1 = require("./user.model");
// todo: fix type issue
const createUserIntoDb = async (payload) => {
    const user = await user_model_1.userModel.create(payload);
    const jwtPayload = {
        id: user._id.toString(),
        email: user?.email,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, '7d');
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, '30d');
    return {
        accessToken,
        refreshToken,
    };
};
const getMeFromDb = async (id) => {
    const result = await user_model_1.userModel.findById(id);
    const useTag = await tag_model_1.tagModel.find({ userId: id });
    return { userInfo: result, useTag };
};
const updateMeIntoDb = async (id, payload) => {
    // remove password and email from payload if exist
    delete payload.password;
    delete payload.email;
    const result = await user_model_1.userModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};
exports.userServices = {
    createUserIntoDb,
    getMeFromDb,
    updateMeIntoDb,
};
