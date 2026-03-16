"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagServices = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const tag_mode_1 = require("./tag.mode");
const http_status_codes_1 = require("http-status-codes");
const createTagIntoDB = async (payload) => {
    const isTagExist = await tag_mode_1.tagModel.findOne({
        name: payload.name,
        userId: payload.userId,
    });
    if (isTagExist) {
        throw new Error('Tag already exists');
    }
    const isUserExist = await user_model_1.userModel.findById(payload.userId);
    if (!isUserExist) {
        throw new AppError_1.default(404, 'User not found');
    }
    const tag = await tag_mode_1.tagModel.create({
        ...payload,
        name: payload.name.toLowerCase(),
    });
    return tag;
};
const getUserTagFormDb = async (userId) => {
    const result = await tag_mode_1.tagModel.find({ userId: new mongoose_1.Types.ObjectId(userId) });
    return result;
};
const deleteUserTagFormDb = async (tagId) => {
    const result = await tag_mode_1.tagModel.findByIdAndDelete(tagId);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Tags not fond');
    }
    return result;
};
exports.tagServices = {
    createTagIntoDB,
    getUserTagFormDb,
    deleteUserTagFormDb,
};
