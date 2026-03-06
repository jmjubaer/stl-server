import z from 'zod';

export const createFolderValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: 'Folder name is required' }),
    userId: z.string().nonempty({ message: 'User ID is required' }),
  }),
});
