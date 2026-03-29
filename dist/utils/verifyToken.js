"use strict";
// prev version code ==================================================
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import AppError from '../errors/AppError';
// export const verifyToken = (token: string, secretKey: string) => {
//   try {
//     return jwt.verify(token, secretKey) as JwtPayload;
//   } catch (error) {
//     throw new AppError(401, 'Token is expired or invalid');
//   }
// };
// update by AI improved version ======================================
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const verifyToken = (token, secretKey) => {
    // 1. Check if token is provided
    if (!token || token.trim() === '') {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Token is required');
    }
    // 2. Check if secretKey is provided
    if (!secretKey) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Secret key is missing');
    }
    try {
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (error) {
        // 3. Distinguish between expired and invalid token
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Token has expired');
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid token');
        }
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Token verification failed');
    }
};
exports.verifyToken = verifyToken;
