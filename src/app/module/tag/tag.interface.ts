import { TUser } from "../user/user.interface";

export type TTag = {
  name: string;
  color: string;
  userId: TUser;
};
