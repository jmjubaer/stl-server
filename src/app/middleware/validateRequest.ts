import { ZodAny } from 'zod';
import { catchAsync } from '../utils/catchAsync';

export const validateRequest = (validationSchema: ZodAny) => {
  return catchAsync(async (req, res, next) => {
    await validationSchema.parseAsync({
      body: req.body,
    });
    next();
  });
};
