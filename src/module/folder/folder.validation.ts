import z from 'zod';

export const createFolderValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: 'Folder name is required' }),
  }),
});

export const renameFolderValidationSchema = z.object({
  body: z.object({
    newName: z.string().nonempty({ message: 'New name is required' }),
  }),
});
