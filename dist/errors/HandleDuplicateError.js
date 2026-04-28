"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (error) => {
    const statusCode = 400;
    const message = 'This data is alredy exists';
    const match = error.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists`,
        },
    ];
    return { statusCode, message, errorSources };
};
exports.default = handleDuplicateError;
