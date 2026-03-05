import nodemailer from 'nodemailer';
import config from '../config';
export const sendResetMail = async (email: string, otp: string) => {
  // Create a transporter using Ethereal test credentials.
  // For production, replace with your actual SMTP server details.
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: config.nodemailer_user_email,
      pass: config.nodemailer_user_pass,
    },
  });

  // Send an email using async/await
  (async () => {
    const info = await transporter.sendMail({
      from: '"STL (Save The  Link)" <stl@gmail.com>',
      to: email,
      subject: 'Reset Your Password - OTP Verification',
      html: `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:40px;">
    <div style="max-width:600px; margin:auto; background:white; padding:30px; border-radius:8px;">
      
      <h2 style="color:#333;">Reset Your Password</h2>
      
      <p style="color:#555;">
        We received a request to reset your password. 
        Use the OTP below to continue:
      </p>

      <div style="text-align:center; margin:30px 0;">
        <span style="
          display:inline-block;
          font-size:28px;
          letter-spacing:8px;
          padding:15px 25px;
          background:#111;
          color:white;
          border-radius:6px;
          font-weight:bold;">
          ${otp}
        </span>
      </div>

      <p style="color:#777;">
        This OTP is valid for <strong>5 minutes</strong>.
      </p>

      <p style="color:#999; font-size:12px;">
        If you did not request a password reset, please ignore this email.
      </p>

      <hr style="margin:30px 0;" />

      <p style="font-size:12px; color:#aaa;">
        © ${new Date().getFullYear()} STL. All rights reserved.
      </p>

    </div>
  </div>
`, // HTML version of the message
    });

    console.log('Message sent:', info.messageId);
  })();
};
