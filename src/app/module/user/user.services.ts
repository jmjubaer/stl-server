import { TUser } from './user.interface';
import { userModel } from './user.model';

const createUserIntoDb = async (payload: TUser) => {
  const result = await userModel.create(payload);
};

export const userServices = {
  createUserIntoDb,
};
