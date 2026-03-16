import { NextFunction, Request, Response } from 'express';
import { error } from 'node:console';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'API Not Found',
    error: '',
  });
};
