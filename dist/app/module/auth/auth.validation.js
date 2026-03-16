"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidationSchema = exports.verifyOtpValidationSchema = exports.sendMailValidationSchema = exports.userLoginValidationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userLoginValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default
            .email({ message: 'Invalid email format' })
            .min(1, 'Email is required'),
        password: zod_1.default
            .string()
            .min(1, { message: 'Password is required' })
            .min(6, { message: 'Password must be at least 6 characters long' }),
    }),
});
exports.sendMailValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default
            .email({ message: 'Invalid email format' })
            .min(1, 'Email is required'),
    }),
});
exports.verifyOtpValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default
            .email({ message: 'Invalid email format' })
            .min(1, 'Email is required'),
        otp: zod_1.default.number().min(1, 'Otp is required'),
    }),
});
exports.changePasswordValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default
            .email({ message: 'Invalid email format' })
            .min(1, 'Email is required'),
        otp: zod_1.default.number().min(1, 'Otp is required'),
        newPassword: zod_1.default
            .string()
            .min(1, { message: 'Password is required' })
            .min(6, { message: 'Password must be at least 6 characters long' }),
    }),
});
