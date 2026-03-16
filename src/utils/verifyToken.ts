/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
export const verifyToken = (token: string, secretKey: string) => {
  try {
    return jwt.verify(token, secretKey) as JwtPayload;
  } catch (error) {
    throw new AppError(401, 'Token is expired or invalid');
  }
};
