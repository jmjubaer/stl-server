"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTagValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createTagValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().nonempty({ message: 'Tag name is required' }),
        color: zod_1.default.string().nonempty({ message: 'Tag color is required' }),
        userId: zod_1.default.string().nonempty({ message: 'User ID is required' }),
    }),
});
