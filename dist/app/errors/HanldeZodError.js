"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const statusCode = 400;
    const message = 'Validation error';
    const errorSources = err.issues.map((issue) => {
        return {
            path: String(issue.path[issue.path.length - 1]),
            message: issue.message,
        };
    });
    return { statusCode, message, errorSources };
};
exports.default = handleZodError;
