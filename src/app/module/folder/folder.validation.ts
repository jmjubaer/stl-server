import z from 'zod';

export const createFolderValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: 'Folder name is required' }),
    userId: z.string().nonempty({ message: 'User ID is required' }),
  }),
});

export const renameFolderValidationSchema = z.object({
  body: z.object({
    id: z.string().nonempty({ message: 'Folder ID is required' }),
    newName: z.string().nonempty({ message: 'New name is required' }),
  }),
});
