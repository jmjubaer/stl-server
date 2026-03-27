import { Types } from 'mongoose';

export type TBookmark = {
  url: string;
  domain?: string;
  title: string;
  notes?: string;
  description?: string;
  image?: string;
  favicon?: string;
  siteName?: string;
  previewStatus: 'PENDING' | 'SUCCESS' | 'FAILED';

  tags?: Types.ObjectId[];
  folder?: Types.ObjectId;
  user: Types.ObjectId;

  isPinned: boolean;
  pinnedAt?: Date;
  // optional
  isFavorite: boolean;
  visitCount: number;
  lastVisitedAt?: Date;
  isPublic: boolean;
};
