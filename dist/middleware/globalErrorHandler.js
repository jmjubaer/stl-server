"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const config_1 = __importDefault(require("../config"));
const zod_1 = require("zod");
const HanldeZodError_1 = __importDefault(require("../errors/HanldeZodError"));
const HandleValidationError_1 = __importDefault(require("../errors/HandleValidationError"));
const HandleCastError_1 = __importDefault(require("../errors/HandleCastError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const HandleDuplicateError_1 = __importDefault(require("../errors/HandleDuplicateError"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Something went wrong';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (error instanceof zod_1.ZodError) {
        const formattedError = (0, HanldeZodError_1.default)(error);
        message = formattedError.message;
        statusCode = formattedError.statusCode;
        errorSources = formattedError.errorSources;
    }
    else if (error?.name === 'ValidationError') {
        const formattedError = (0, HandleValidationError_1.default)(error);
        message = formattedError.message;
        statusCode = formattedError.statusCode;
        errorSources = formattedError.errorSources;
    }
    else if (error?.name === 'CastError') {
        const formattedError = (0, HandleCastError_1.default)(error);
        message = formattedError.message;
        statusCode = formattedError.statusCode;
        errorSources = formattedError.errorSources;
    }
    else if (error?.code === 11000) {
        const formattedError = (0, HandleDuplicateError_1.default)(error);
        message = formattedError.message;
        statusCode = formattedError.statusCode;
        errorSources = formattedError.errorSources;
    }
    else if (error instanceof AppError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
        errorSources = [
            {
                path: '',
                message: error.message,
            },
        ];
    }
    else if (error instanceof Error) {
        message = error.message;
        errorSources = [
            {
                path: '',
                message: error.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.NODE_ENV === 'Development' ? error.stack : '',
    });
};
exports.globalErrorHandler = globalErrorHandler;
