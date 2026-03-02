import { NextFunction, Request, Response } from 'express';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req?.headers?.authorization;
};
