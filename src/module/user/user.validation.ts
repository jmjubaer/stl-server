import z from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z
      .email({ message: 'Invalid email address' })
      .min(1, { message: 'Email is required' }),
    password: z
      .string()
      .min(1, { message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' }),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.email().optional(),
  }),
});
const feedbackEntrySchema = z.object({
  type: z.enum(
    ['Bug Report', 'Feature Request', 'General Feedback', 'Other'],
  ),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message cannot exceed 1000 characters' }),
});

export const sendFeedbackValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Name cannot be empty' })
      .max(50, { message: 'Name cannot exceed 50 characters' }),
    email: z
      .string()
      .email({ message: 'Invalid email address' }),
    feedbacks: z
      .array(feedbackEntrySchema)
      .min(1, { message: 'At least one feedback is required' })
      .max(10, { message: 'Cannot submit more than 10 feedbacks at once' }),
  }),
});