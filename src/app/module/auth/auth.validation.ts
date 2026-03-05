import z from 'zod';

export const userLoginValidationSchema = z.object({
  body: z.object({
    email: z
      .email({ message: 'Invalid email format' })
      .min(1, 'Email is required'),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
  }),
});

export const sendMailValidationSchema = z.object({
  body: z.object({
    email: z
      .email({ message: 'Invalid email format' })
      .min(1, 'Email is required'),
  }),
});

export const verifyOtpValidationSchema = z.object({
  body: z.object({
    email: z
      .email({ message: 'Invalid email format' })
      .min(1, 'Email is required'),
    otp: z.number().min(1, 'Otp is required'),
  }),
});

export const changePasswordValidationSchema = z.object({
  body: z.object({
    email: z
      .email({ message: 'Invalid email format' })
      .min(1, 'Email is required'),
    otp: z.number().min(1, 'Otp is required'),
    newPassword: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
  }),
});
