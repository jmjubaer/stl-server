"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// dotenv.config({ path: path.join(process.cwd(), '/.env') });
dotenv_1.default.config();
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    // nodemailer config
    nodemailer_host: process.env.NODEMAILER_HOST,
    nodemailer_port: process.env.NODEMAILER_PORT,
    nodemailer_user_email: process.env.NODEMAILER_USER_EMAIL,
    nodemailer_user_pass: process.env.NODEMAILER_USER_PASS,
};
