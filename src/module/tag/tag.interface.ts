import { Types } from 'mongoose';

export type TTag = {
  name: string;
  color: string;
  userId: Types.ObjectId;
};
