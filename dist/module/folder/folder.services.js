"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const folder_model_1 = require("./folder.model");
const bookmark_model_1 = require("../bookmark/bookmark.model");
const getFolderFromDb = async (userId) => {
    const isUserExist = await user_model_1.userModel.findById(userId);
    if (!isUserExist) {
        throw new AppError_1.default(404, 'User not found');
    }
    const result = await folder_model_1.folderModel.find({ userId });
    return result;
};
const createFolderIntoDb = async (payload, userId) => {
    const isFolderExist = await folder_model_1.folderModel.findOne({
        name: payload.name.toLowerCase(),
        userId,
    });
    if (isFolderExist) {
        throw new AppError_1.default(400, 'Folder already exists');
    }
    const isUserExist = await user_model_1.userModel.findById(userId);
    if (!isUserExist) {
        throw new AppError_1.default(404, 'User not found');
    }
    const result = await folder_model_1.folderModel.create({
        ...payload,
        name: payload.name.toLowerCase(),
        userId,
    });
    return result;
};
const renameFolderIntoDb = async (id, newName, userId) => {
    const isFolderExist = await folder_model_1.folderModel.findOne({ _id: id, userId: userId });
    if (!isFolderExist) {
        throw new AppError_1.default(404, 'Folder not found');
    }
    if (isFolderExist.name.toLowerCase() === newName.toLowerCase()) {
        throw new AppError_1.default(404, 'New name is same as old name');
    }
    const result = await folder_model_1.folderModel.findByIdAndUpdate(id, { name: newName.toLowerCase() }, { new: true });
    return result;
};
// Todo: after bookmark api
const deleteFolderIntoDb = async (id, userId) => {
    const isFolderExist = await folder_model_1.folderModel.findOne({ _id: id, userId });
    if (!isFolderExist) {
        throw new AppError_1.default(404, 'Folder not found');
    }
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const result = await folder_model_1.folderModel.findByIdAndDelete(id, { session });
        await bookmark_model_1.bookmarkModel.updateMany({
            folder: id,
        }, {
            $unset: { folder: '' },
        }, {
            session,
        });
        await session.commitTransaction();
        return result;
    }
    catch (error) {
        await session.abortTransaction();
        throw new AppError_1.default(500, 'Failed to delete folder');
    }
    finally {
        session.endSession();
    }
};
const getShareFolderFromDb = async (folderId) => {
    const result = await bookmark_model_1.bookmarkModel
        .find({ folder: folderId })
        .populate('tags', 'name color')
        .populate('folder', 'name')
        .populate('user', 'name');
    return result;
};
exports.folderServices = {
    createFolderIntoDb,
    renameFolderIntoDb,
    deleteFolderIntoDb,
    getFolderFromDb,
    getShareFolderFromDb,
};
