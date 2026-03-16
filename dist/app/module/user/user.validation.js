"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidationSchema = exports.createUserValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().min(1, { message: 'Name is required' }),
        email: zod_1.default
            .email({ message: 'Invalid email address' })
            .min(1, { message: 'Email is required' }),
        password: zod_1.default
            .string()
            .min(1, { message: 'Password is required' })
            .min(6, { message: 'Password must be at least 6 characters long' }),
    }),
});
exports.updateUserValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().optional(),
        email: zod_1.default.email().optional(),
    }),
});
