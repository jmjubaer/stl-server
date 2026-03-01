import z from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ error: 'Name is required' }),
    email: z.email({ error: 'Email is required' }),
    password: z.string({ error: 'Password is required' }),
  }),
});
