import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import { verifyToken } from '../utils/verifyToken';
import config from '../config';
import { userModel } from '../module/user/user.model';
import { JwtPayload } from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req?.headers?.authorization;
  if (!token) {
    throw new AppError(401, 'You are not authorize');
  }
  const decoded = verifyToken(token, config.jwt_access_secret as string);
  const { id } = decoded as JwtPayload;
  const user = await userModel.findById(id);
  if (!user) {
    throw new AppError(404, 'User dose not exit');
  }
  next();
};
