"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const verifyToken_1 = require("../utils/verifyToken");
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../module/user/user.model");
const catchAsync_1 = require("../utils/catchAsync");
const auth = () => {
    return (0, catchAsync_1.catchAsync)(async (req, res, next) => {
        const token = req?.headers?.authorization;
        if (!token) {
            throw new AppError_1.default(401, 'You are not authorize');
        }
        const decoded = (0, verifyToken_1.verifyToken)(token, config_1.default.jwt_access_secret);
        const { id } = decoded;
        const user = await user_model_1.userModel.findById(id);
        if (!user) {
            throw new AppError_1.default(404, 'User dose not exit');
        }
        req.user = decoded;
        next();
    });
};
exports.auth = auth;
