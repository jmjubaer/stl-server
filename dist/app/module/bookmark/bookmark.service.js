"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkServices = void 0;
const link_preview_js_1 = require("link-preview-js");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bookmark_model_1 = require("./bookmark.model");
const user_model_1 = require("../user/user.model");
const folder_model_1 = require("../folder/folder.model");
const tag_mode_1 = require("../tag/tag.mode");
const getLinkInfo = async (url) => {
    try {
        if (!url) {
            throw new AppError_1.default(404, 'Url is required');
        }
        const preview = await (0, link_preview_js_1.getLinkPreview)(url, {
            timeout: 5000, // 5 seconds max
            followRedirects: 'follow',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            },
        });
        return preview;
    }
    catch {
        try {
            const domain = new URL(url).hostname;
            return {
                url,
                domain,
                description: '',
                favicon: `https://www.google.com/s2/favicons?domain=${url}&sz=64`,
                siteName: domain,
            };
        }
        catch {
            throw new AppError_1.default(400, 'Invalid Url');
        }
    }
};
const createBookmarkIntoDb = async (payload) => {
    const isUserExist = await user_model_1.userModel.findById(payload.user);
    if (!isUserExist) {
        throw new AppError_1.default(404, 'User not found');
    }
    if (payload?.folder) {
        const isFolderExist = await folder_model_1.folderModel.findOne({
            _id: payload.folder,
            userId: payload.user,
        });
        if (!isFolderExist) {
            throw new AppError_1.default(404, 'Folder not found');
        }
    }
    if (payload?.tags && payload?.tags?.length > 0) {
        const existingTags = await tag_mode_1.tagModel.find({
            _id: { $in: payload.tags },
            userId: payload.user,
        });
        if (existingTags?.length !== payload?.tags?.length) {
            const foundedTag = existingTags.map((tag) => tag.name).join(', ');
            throw new AppError_1.default(404, `Some tag are not found. Founded tags: [${foundedTag}]`);
        }
    }
    const result = await bookmark_model_1.bookmarkModel.create(payload);
    return result;
};
const getUserBookmarkFromDb = async (userId) => {
    const result = await bookmark_model_1.bookmarkModel
        .find({ user: userId })
        .populate('tags', 'name color')
        .populate('folder', 'name');
    const bookmarkWithFolder = result.filter((b) => b.folder);
    const bookmarkWithoutFolder = result.filter((b) => !b.folder);
    const folder = await folder_model_1.folderModel.find({ userId });
    const folderWithBookmark = folder.map((folder) => ({
        ...folder.toObject(),
        bookmark: bookmarkWithFolder.filter((b) => b?.folder?._id.toString() === folder?._id?.toString()),
    }));
    return { folder: folderWithBookmark, bookmark: bookmarkWithoutFolder };
};
// todo: complete the rename api
const updateUserBookmarkFromDb = async (bookmarkId, userId, payload) => {
    const isBookmarkExist = await bookmark_model_1.bookmarkModel.findOne({
        _id: bookmarkId,
        user: userId,
    });
    if (!isBookmarkExist) {
        throw new AppError_1.default(404, 'Bookmark not found');
    }
    if (payload?.folder) {
        const isFolderExist = await folder_model_1.folderModel.findOne({
            _id: payload.folder,
            userId,
        });
        if (!isFolderExist) {
            throw new AppError_1.default(404, 'Selected folder not found');
        }
    }
    if (payload?.tags && payload?.tags?.length > 0) {
        const existingTags = await tag_mode_1.tagModel.find({
            _id: { $in: payload.tags },
            userId: payload.user,
        });
        if (existingTags?.length !== payload?.tags?.length) {
            const foundedTag = existingTags.map((tag) => tag.name).join(', ');
            throw new AppError_1.default(404, `Some tag are not found. Founded tags: [${foundedTag}]`);
        }
    }
    // remove the restricted field
    delete payload.user;
    delete payload.isFavorite;
    delete payload.visitCount;
    delete payload.lastVisitedAt;
    delete payload.isPublic;
    delete payload.previewStatus;
    const result = await bookmark_model_1.bookmarkModel.findByIdAndUpdate(bookmarkId, payload);
    return result;
};
const deleteBookmarkFromDb = async (bookmarkId, userId) => {
    const isBookmarkExist = await bookmark_model_1.bookmarkModel.findOne({
        _id: bookmarkId,
        user: userId,
    });
    if (!isBookmarkExist) {
        throw new AppError_1.default(404, 'Bookmark not found');
    }
    const result = await bookmark_model_1.bookmarkModel.findOneAndDelete({
        _id: bookmarkId,
        user: userId,
    });
    return result;
};
const addToFolderIntoDb = async (userId, payload) => {
    if (!payload.bookmarkIds || payload.bookmarkIds.length === 0) {
        throw new AppError_1.default(400, 'No bookmark IDs provided');
    }
    const isBookmarkExist = await bookmark_model_1.bookmarkModel.find({
        _id: { $in: payload.bookmarkIds },
        user: userId,
    });
    if (isBookmarkExist.length < 1) {
        throw new AppError_1.default(404, 'Bookmark not found');
    }
    const isFolderExist = await folder_model_1.folderModel.findById(payload.folderId);
    if (!isFolderExist) {
        throw new AppError_1.default(404, 'Folder not found');
    }
    if (isBookmarkExist.length !== payload.bookmarkIds.length) {
        const foundedIds = isBookmarkExist.map((b) => b._id.toString());
        const notFoundIds = payload.bookmarkIds.filter((b) => !foundedIds.includes(b));
        throw new AppError_1.default(404, `Some bookmark are not found. Not founded bookmark id: [${notFoundIds}]`);
    }
    const result = await bookmark_model_1.bookmarkModel.updateMany({
        _id: { $in: payload.bookmarkIds },
        user: userId,
    }, { $set: { folder: payload.folderId } }, { runValidators: true });
    return result;
};
const updateVisitCountIntoDb = async (bookmarkId, userId) => {
    const isBookmarkExist = await bookmark_model_1.bookmarkModel.findOne({
        _id: bookmarkId,
        user: userId,
    });
    if (!isBookmarkExist) {
        throw new AppError_1.default(404, 'Bookmark not found');
    }
    isBookmarkExist.visitCount += 1;
    isBookmarkExist.lastVisitedAt = new Date();
    const result = await isBookmarkExist.save();
    return result;
};
exports.bookmarkServices = {
    updateUserBookmarkFromDb,
    getUserBookmarkFromDb,
    createBookmarkIntoDb,
    deleteBookmarkFromDb,
    getLinkInfo,
    addToFolderIntoDb,
    updateVisitCountIntoDb,
};
