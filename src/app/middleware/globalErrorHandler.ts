import { NextFunction, Request, Response } from 'express';
import config from '../config';
import { ZodError } from 'zod';
import handleZodError from '../errors/HanldeZodError';
import handleValidationError from '../errors/HandleValidationError';
import handleCastError from '../errors/HandleCastError';
import AppError from '../errors/AppError';
import handleDuplicateError from '../errors/HandleDuplicateError';

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';
  let errorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const formattedError = handleZodError(error);
    message = formattedError.message;
    statusCode = formattedError.statusCode;
    errorSources = formattedError.errorSources;
  } else if (error?.name === 'ValidationError') {
    const formattedError = handleValidationError(error);
    message = formattedError.message;
    statusCode = formattedError.statusCode;
    errorSources = formattedError.errorSources;
  } else if (error?.name === 'CastError') {
    const formattedError = handleCastError(error);
    message = formattedError.message;
    statusCode = formattedError.statusCode;
    errorSources = formattedError.errorSources;
  } else if (error?.code === 11000) {
    const formattedError = handleDuplicateError(error);
    message = formattedError.message;
    statusCode = formattedError.statusCode;
    errorSources = formattedError.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ];
  }

  res.status(statusCode).send({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'Development' ? error.stack : '',
  });
};
