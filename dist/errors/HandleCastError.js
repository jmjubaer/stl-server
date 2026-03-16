"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const statusCode = 400;
    const message = 'Invalid ID';
    const errorSources = [
        {
            path: error.path,
            message: error.message,
        },
    ];
    return { statusCode, message, errorSources };
};
exports.default = handleCastError;
