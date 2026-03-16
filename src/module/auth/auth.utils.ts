import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const checkPassword = async (password: string, hashPassword: string) => {
  return await bcrypt.compare(password, hashPassword);
};

export const createToken = (
  payload: { id: string; email: string },
  jwtSecret: string,
  expiresIn: string | number,
) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: expiresIn as number,
  });
  return token;
};

