"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const validateRequest = (validationSchema) => {
    return (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        await validationSchema.parseAsync({
            body: req.body,
        });
        next();
    });
};
exports.validateRequest = validateRequest;
