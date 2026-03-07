import { TTag } from './tag.interface';
import { tagModel } from './tag.mode';

const createTagIntoDB = async (payload: TTag) => {
  const isTagExist = await tagModel.findOne({
    name: payload.name,
    userId: payload.userId,
  });
  if (isTagExist) {
    throw new Error('Tag already exists');
  }
  const tag = await tagModel.create(payload);
  return tag;
};

export const tagServices = {
  createTagIntoDB,
};
