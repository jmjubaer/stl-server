import { ZodObject } from 'zod';
import { catchAsync } from '../utils/catchAsync';

export const validateRequest = (validationSchema: ZodObject) => {
  return catchAsync(async (req, res, next) => {
    await validationSchema.parseAsync({
      body: req.body,
    });
    next();
  });
};
