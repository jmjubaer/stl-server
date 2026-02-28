import { Request, Response } from 'express';
import { userServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  const data = req.body;
  const result = await userServices.createUserIntoDb(data);
  res.status(200).json({
    success: true,
    message: 'User created successfully',
    data: result,
  });
};

export const userControllers = {
  createUser,
};
