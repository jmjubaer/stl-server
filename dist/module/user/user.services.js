"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("../auth/auth.utils");
const tag_model_1 = require("../tag/tag.model");
const user_model_1 = require("./user.model");
const nodemailer_1 = __importDefault(require("nodemailer"));
// todo: fix type issue
const createUserIntoDb = async (payload) => {
    const user = await user_model_1.userModel.create(payload);
    const jwtPayload = {
        id: user._id.toString(),
        email: user?.email,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, '7d');
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, '30d');
    return {
        accessToken,
        refreshToken,
    };
};
const getMeFromDb = async (id) => {
    const result = await user_model_1.userModel.findById(id);
    const useTag = await tag_model_1.tagModel.find({ userId: id });
    return { userInfo: result, useTag };
};
const updateMeIntoDb = async (id, payload) => {
    // remove password and email from payload if exist
    delete payload.password;
    delete payload.email;
    const result = await user_model_1.userModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};
const sendFeedbackService = async (payload) => {
    const { name, email, feedbacks } = payload;
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: config_1.default.nodemailer_user_email,
            pass: config_1.default.nodemailer_user_pass,
        },
    });
    const feedbackHTML = feedbacks
        .map((f, i) => `
      <div style="margin-bottom:20px; padding:15px; background:#f9f9f9; border-radius:6px; border-left:4px solid #1A8CFF;">
        <p style="margin:0 0 8px; font-size:13px; color:#1A8CFF; font-weight:bold;">
          #${i + 1} — ${f.type}
        </p>
        <p style="margin:0; color:#333; line-height:1.7;">${f.message}</p>
      </div>
    `)
        .join('');
    await transporter.sendMail({
        from: `"STL Feedback" <stl@gmail.com>`,
        to: config_1.default.nodemailer_user_email,
        replyTo: email,
        subject: `[STL Feedback] ${feedbacks.length} feedback(s) from ${name}`,
        html: `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:40px;">
        <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:8px;">
          <h2 style="color:#1A8CFF;">New Feedback Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Total Feedbacks:</strong> ${feedbacks.length}</p>
          <hr style="margin:20px 0;" />
          ${feedbackHTML}
          <hr style="margin:20px 0;" />
          <p style="font-size:12px; color:#aaa;">
            © ${new Date().getFullYear()} STL — save-the-link.vercel.app
          </p>
        </div>
      </div>
    `,
    });
    return { message: 'Feedback sent successfully' };
};
exports.userServices = {
    createUserIntoDb,
    getMeFromDb,
    updateMeIntoDb,
    sendFeedbackService,
};
