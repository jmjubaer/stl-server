import z from 'zod';

export const createTagValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: 'Tag name is required' }),
    color: z.string().nonempty({ message: 'Tag color is required' }),
    userId: z.string().nonempty({ message: 'User ID is required' }),
  }),
});
