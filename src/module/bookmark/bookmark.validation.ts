import z from 'zod';

export const createBookmarkValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    url: z.string().nonempty('Url is required'),
    domain: z.string().optional(),
    description: z.string().optional(),
    notes: z.string().optional(),
    image: z.string().optional(),
    favicon: z.string().optional(),
    siteName: z.string().optional(),
    tags: z.array(z.string()).optional().nullable(),
    folder: z.string().optional().nullable(),
  }),
});

export const updateBookmarkValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    url: z.string().optional(),
    domain: z.string().optional(),
    description: z.string().optional(),
    notes: z.string().optional(),
    image: z.string().optional(),
    favicon: z.string().optional(),
    siteName: z.string().optional(),
    tags: z.array(z.string()).optional().nullable(),
    folder: z.string().optional().nullable(),
  }),
});

export const addToFolderValidationSchema = z.object({
  body: z.object({
    bookmarkIds: z.array(z.string()).nonempty(),
    folderId: z.string().nonempty(),
  }),
});
