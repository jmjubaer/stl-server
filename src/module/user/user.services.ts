import config from '../../config';
import { createToken } from '../auth/auth.utils';
import { tagModel } from '../tag/tag.model';
import { TFeedback, TUser } from './user.interface';
import { userModel } from './user.model';
import nodemailer from 'nodemailer';
// todo: fix type issue
const createUserIntoDb = async (payload: TUser) => {
  const user = await userModel.create(payload);
  const jwtPayload = {
    id: user._id.toString(),
    email: user?.email,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '7d',
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    '30d',
  );
  return {
    accessToken,
    refreshToken,
  };
};

const getMeFromDb = async (id: string) => {
  const result = await userModel.findById(id);
  const useTag = await tagModel.find({ userId: id });
  return { userInfo: result, useTag };
};

const updateMeIntoDb = async (id: string, payload: Partial<TUser>) => {
  // remove password and email from payload if exist
  delete payload.password;
  delete payload.email;

  const result = await userModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const sendFeedbackService = async (payload: TFeedback) => {
  const { name, email, feedbacks } = payload;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: config.nodemailer_user_email,
      pass: config.nodemailer_user_pass,
    },
  });
  const feedbackHTML = feedbacks
    .map(
      (f, i) => `
      <div style="margin-bottom:20px; padding:15px; background:#f9f9f9; border-radius:6px; border-left:4px solid #1A8CFF;">
        <p style="margin:0 0 8px; font-size:13px; color:#1A8CFF; font-weight:bold;">
          #${i + 1} — ${f.type}
        </p>
        <p style="margin:0; color:#333; line-height:1.7;">${f.message}</p>
      </div>
    `,
    )
    .join('');

  await transporter.sendMail({
    from: `"STL Feedback" <stl@gmail.com>`,
    to: config.nodemailer_user_email,
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

export const userServices = {
  createUserIntoDb,
  getMeFromDb,
  updateMeIntoDb,
  sendFeedbackService,
};
