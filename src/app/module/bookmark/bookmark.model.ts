import { model, Schema } from 'mongoose';
import { TBookmark } from './bookmark.interface';

const bookmarkSchema = new Schema<TBookmark>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  description: String,
  domain: String,
  favicon: String,
  siteName: String,
  tags: {
    type: [Schema.Types.ObjectId],
    ref: 'Tag',
  },
  previewStatus: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED'],
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  lastVisitedAt: Date,
  visitCount: {
    type: Number,
    default: 0,
  },
});

export const bookmarkModel = model<TBookmark>('bookmark', bookmarkSchema);
