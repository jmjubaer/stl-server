"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFeedbackValidationSchema = exports.updateUserValidationSchema = exports.createUserValidationSchema = void 0;
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
const feedbackEntrySchema = zod_1.default.object({
    type: zod_1.default.enum(['Bug Report', 'Feature Request', 'General Feedback', 'Other']),
    message: zod_1.default
        .string()
        .min(10, { message: 'Message must be at least 10 characters' })
        .max(1000, { message: 'Message cannot exceed 1000 characters' }),
});
exports.sendFeedbackValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default
            .string()
            .min(1, { message: 'Name cannot be empty' })
            .max(50, { message: 'Name cannot exceed 50 characters' }),
        email: zod_1.default
            .string()
            .email({ message: 'Invalid email address' }),
        feedbacks: zod_1.default
            .array(feedbackEntrySchema)
            .min(1, { message: 'At least one feedback is required' })
            .max(10, { message: 'Cannot submit more than 10 feedbacks at once' }),
    }),
});
