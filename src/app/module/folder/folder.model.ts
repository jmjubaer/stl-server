import { model, Schema } from 'mongoose';
import { TFolder } from './folder.interface';

const folderSchema = new Schema<TFolder>({
  name: {
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

export const folderModel = model<TFolder>('Folder', folderSchema);
