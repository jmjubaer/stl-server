// prev version code ==================================================

// import jwt, { JwtPayload } from 'jsonwebtoken';
// import AppError from '../errors/AppError';
// export const verifyToken = (token: string, secretKey: string) => {
//   try {
//     return jwt.verify(token, secretKey) as JwtPayload;
//   } catch (error) {
//     throw new AppError(401, 'Token is expired or invalid');
//   }
// };

// update by AI improved version ======================================

import jwt, {
  JwtPayload,
  TokenExpiredError,
  JsonWebTokenError,
} from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';

export const verifyToken = (token: string, secretKey: string): JwtPayload => {
  // 1. Check if token is provided
  if (!token || token.trim() === '') {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Token is required');
  }

  // 2. Check if secretKey is provided
  if (!secretKey) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Secret key is missing',
    );
  }

  try {
    return jwt.verify(token, secretKey) as JwtPayload;
  } catch (error) {
    // 3. Distinguish between expired and invalid token
    if (error instanceof TokenExpiredError) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Token has expired');
    }

    if (error instanceof JsonWebTokenError) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid token');
    }

    throw new AppError(StatusCodes.UNAUTHORIZED, 'Token verification failed');
  }
};
