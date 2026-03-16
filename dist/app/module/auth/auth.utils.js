"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.checkPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkPassword = async (password, hashPassword) => {
    return await bcrypt_1.default.compare(password, hashPassword);
};
exports.checkPassword = checkPassword;
const createToken = (payload, jwtSecret, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(payload, jwtSecret, {
        expiresIn: expiresIn,
    });
    return token;
};
exports.createToken = createToken;
