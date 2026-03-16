"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToFolderValidationSchema = exports.updateBookmarkValidationSchema = exports.createBookmarkValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createBookmarkValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string().nonempty('Title is required'),
        url: zod_1.default.string().nonempty('Url is required'),
        user: zod_1.default.string().nonempty('User is required'),
        domain: zod_1.default.string().optional(),
        description: zod_1.default.string().optional(),
        notes: zod_1.default.string().optional(),
        image: zod_1.default.string().optional(),
        favicon: zod_1.default.string().optional(),
        siteName: zod_1.default.string().optional(),
        tags: zod_1.default.array(zod_1.default.string()),
        folder: zod_1.default.string(),
    }),
});
exports.updateBookmarkValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        title: zod_1.default.string().optional(),
        url: zod_1.default.string().optional(),
        domain: zod_1.default.string().optional(),
        description: zod_1.default.string().optional(),
        notes: zod_1.default.string().optional(),
        image: zod_1.default.string().optional(),
        favicon: zod_1.default.string().optional(),
        siteName: zod_1.default.string().optional(),
        tags: zod_1.default.array(zod_1.default.string()).optional(),
        folder: zod_1.default.string().optional(),
    }),
});
exports.addToFolderValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        bookmarkIds: zod_1.default.array(zod_1.default.string()).nonempty(),
        folderId: zod_1.default.string().nonempty(),
    }),
});
