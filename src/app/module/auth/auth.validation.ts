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
