export type TBookmark = {
  url: string;
  domain?: string;
  title: string;
  description?: string;
  image?: string;
  favicon?: string;
  siteName?: string;
  previewStatus: 'PENDING' | 'SUCCESS' | 'FAILED';
//   tags: TTag[];

  // optional
  isFavorite: boolean;
  visitCount: number;
  lastVisitedAt?: Date;
  isPublic: boolean;
};
