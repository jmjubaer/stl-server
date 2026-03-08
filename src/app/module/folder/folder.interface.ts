import { Types } from 'mongoose';

export type TFolder = {
  name: string;
  userId: Types.ObjectId;
};
