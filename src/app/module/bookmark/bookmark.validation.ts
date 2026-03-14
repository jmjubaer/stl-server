import z from 'zod';

export const createBookmarkValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required'),
    url: z.string().nonempty('Url is required'),
    user: z.string().nonempty('User is required'),
    domain: z.string().optional(),
    description: z.string().optional(),
    notes: z.string().optional(),
    image: z.string().optional(),
    favicon: z.string().optional(),
    siteName: z.string().optional(),
    tags: z.array(z.string()),
    folder: z.string(),
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
    tags: z.array(z.string()).optional(),
    folder: z.string().optional(),
  }),
});
