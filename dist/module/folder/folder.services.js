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
exports.folderServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const mongoose_1 = __importStar(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const folder_model_1 = require("./folder.model");
const bookmark_model_1 = require("../bookmark/bookmark.model");
const createFolderIntoDb = async (payload) => {
    const isFolderExist = await folder_model_1.folderModel.findOne({
        name: payload.name.toLowerCase(),
        userId: new mongoose_1.Types.ObjectId(payload.userId),
    });
    if (isFolderExist) {
        throw new AppError_1.default(400, 'Folder already exists');
    }
    const isUserExist = await user_model_1.userModel.findById(payload?.userId);
    if (!isUserExist) {
        throw new AppError_1.default(404, 'User not found');
    }
    const result = await folder_model_1.folderModel.create({
        ...payload,
        name: payload.name.toLowerCase(),
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
exports.folderServices = {
    createFolderIntoDb,
    renameFolderIntoDb,
    deleteFolderIntoDb,
};
