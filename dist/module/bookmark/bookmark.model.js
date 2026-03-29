"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkModel = void 0;
const mongoose_1 = require("mongoose");
const bookmarkSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
    },
    image: String,
    notes: String,
    description: String,
    domain: String,
    favicon: String,
    siteName: String,
    tags: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Tag',
    },
    isPinned: {
        type: Boolean,
        default: false,
    },
    pinnedAt: {
        type: Date,
        default: null,
    },
    previewStatus: {
        type: String,
        enum: ['PENDING', 'SUCCESS', 'FAILED'],
    },
    folder: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Folder',
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
    lastVisitedAt: Date,
    visitCount: {
        type: Number,
        default: 0,
    },
});
exports.bookmarkModel = (0, mongoose_1.model)('bookmark', bookmarkSchema);
