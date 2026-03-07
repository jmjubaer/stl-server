import { model, Schema } from 'mongoose';
import { TTag } from './tag.interface';

const tagSchema = new Schema<TTag>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

export const tagModel = model<TTag>('Tag', tagSchema);
