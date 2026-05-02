"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const mongoose_1 = __importStar(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const tag_model_1 = require("./tag.model");
const http_status_codes_1 = require("http-status-codes");
const bookmark_model_1 = require("../bookmark/bookmark.model");
const createTagIntoDB = async (payload, userId) => {
    const isTagExist = await tag_model_1.tagModel.findOne({
        name: payload.name.toLowerCase(),
        userId,
    });
    if (isTagExist) {
        throw new Error('Tag already exists');
    }
    const isUserExist = await user_model_1.userModel.findById(userId);
    if (!isUserExist) {
        throw new AppError_1.default(404, 'User not found');
    }
    const tag = await tag_model_1.tagModel.create({
        ...payload,
        name: payload.name.toLowerCase(),
        userId,
    });
    return tag;
};
const getUserTagFormDb = async (userId) => {
    const result = await tag_model_1.tagModel.find({ userId: new mongoose_1.Types.ObjectId(userId) });
    return result;
};
const deleteUserTagFormDb = async (tagId, userId) => {
    // 1. Check if tag exists and belongs to user
    const tag = await tag_model_1.tagModel.findOne({
        _id: tagId,
        userId: new mongoose_1.Types.ObjectId(userId),
    });
    if (!tag) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Tag not found');
    }
    if (tag.userId.toString() !== userId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'You are not authorized to delete this tag');
    }
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // 2. Delete the tag
        await tag_model_1.tagModel.findByIdAndDelete(tagId, { session });
        // 3. Remove tag from all bookmarks that use it
        await bookmark_model_1.bookmarkModel.updateMany({ tags: tagId }, // find bookmarks that have this tag
        { $pull: { tags: tagId } }, // remove tag from tags array
        { session });
        await session.commitTransaction();
        return { message: 'Tag deleted successfully' };
    }
    catch (error) {
        await session.abortTransaction();
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to delete tag');
    }
    finally {
        session.endSession();
    }
};
exports.tagServices = {
    createTagIntoDB,
    getUserTagFormDb,
    deleteUserTagFormDb,
};
