import { NextFunction, Request, Response } from 'express';
import config from '../config';

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';
  let errorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  res.status(statusCode).send({
    success: false,
    message,
    statusCode,
    stack: config.NODE_ENV === 'Development' ? error.stack : '',
  });
};
