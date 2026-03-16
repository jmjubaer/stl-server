"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
/* eslint-disable no-unused-vars */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    resetPasswordOtp: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
}, {
    timestamps: true,
});
userSchema.pre('save', async function () {
    if (this?.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'User does not exist');
    }
    if (this.isModified('password') && this.password) {
        this.password = await bcrypt_1.default.hash(this?.password, Number(config_1.default?.bcrypt_salt_round));
    }
});
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
// Exclude deleted user from find query
userSchema.pre(/^find/, function () {
    this.where({ isDeleted: { $ne: true } });
});
// Check if user is deleted before update and delete
userSchema.pre(/^findOneAnd/, async function () {
    const model = this.model;
    const user = await model.findOne(this.getQuery());
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    if (user?.isDeleted) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'User does not exist');
    }
});
exports.userModel = (0, mongoose_1.model)('User', userSchema);
