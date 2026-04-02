import { model, Schema } from 'mongoose';
import { TFolder } from './folder.interface';

const folderSchema = new Schema<TFolder>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      toLowerCase: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const folderModel = model<TFolder>('Folder', folderSchema);
