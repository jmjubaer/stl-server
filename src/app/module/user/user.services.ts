import { TUser } from './user.interface';
import { userModel } from './user.model';

const createUserIntoDb = async (payload: TUser) => {
  const result = await userModel.create(payload);
  return result;
};

const getMeFromDb = async (id: string) => {
  const result = await userModel.findById(id);
  return result;
};
const updateMeIntoDb = async (id: string, payload: Partial<TUser>) => {
  const result = await userModel.findByIdAndUpdate(id, payload);
  return result;
};

export const userServices = {
  createUserIntoDb,
  getMeFromDb,
  updateMeIntoDb,
};
