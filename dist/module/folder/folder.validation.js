"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameFolderValidationSchema = exports.createFolderValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createFolderValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().nonempty({ message: 'Folder name is required' }),
    }),
});
exports.renameFolderValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        newName: zod_1.default.string().nonempty({ message: 'New name is required' }),
    }),
});
