import { getLinkPreview } from 'link-preview-js';
import AppError from '../../errors/AppError';
import { bookmarkModel } from './bookmark.model';
import { TBookmark } from './bookmark.interface';
import { userModel } from '../user/user.model';
import { folderModel } from '../folder/folder.model';
import { tagModel } from '../tag/tag.mode';
import QueryBuilder from '../../builder/QueryBuilder';

const getLinkInfo = async (url: string) => {
  try {
    if (!url) {
      throw new AppError(404, 'Url is required');
    }
    const preview = await getLinkPreview(url, {
      timeout: 5000, // 5 seconds max
      followRedirects: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });
    return preview;
  } catch {
    try {
      const domain = new URL(url).hostname;
      return {
        url,
        domain,
        description: '',
        favicon: `https://www.google.com/s2/favicons?domain=${url}&sz=64`,
        siteName: domain,
      };
    } catch {
      throw new AppError(400, 'Invalid Url');
    }
  }
};

const createBookmarkIntoDb = async (payload: TBookmark, userId: string) => {
  const isUserExist = await userModel.findById(userId);
  if (!isUserExist) {
    throw new AppError(404, 'User not found');
  }

  if (payload?.folder) {
    const isFolderExist = await folderModel.findOne({
      _id: payload.folder,
      userId: payload.user,
    });
    if (!isFolderExist) {
      throw new AppError(404, 'Folder not found');
    }
  }

  if (payload?.tags && payload?.tags?.length > 0) {
    const existingTags = await tagModel.find({
      _id: { $in: payload.tags },
      userId: payload.user,
    });

    if (existingTags?.length !== payload?.tags?.length) {
      const foundedTag = existingTags.map((tag) => tag.name).join(', ');
      throw new AppError(
        404,
        `Some tag are not found. Founded tags: [${foundedTag}]`,
      );
    }
  }

  const result = await bookmarkModel.create({ ...payload, user: userId });
  return result;
};
const pinBookmarkIntoDb = async (bookmarkId: string, userId: string) => {
  const isUserExist = await userModel.findById(userId);
  if (!isUserExist) {
    throw new AppError(404, 'User not found');
  }

  const isBookmarkExist = await bookmarkModel.findOne({
    _id: bookmarkId,
    user: userId,
  });
  if (!isBookmarkExist) {
    throw new AppError(404, 'Bookmark not found');
  }

  const isPinned = !isBookmarkExist.isPinned;
  const result = await bookmarkModel.findByIdAndUpdate(
    bookmarkId,
    {
      isPinned,
      pinnedAt: isPinned ? new Date() : null,
    },
    {
      new: true,
    },
  );
  return result;
};

const getUserBookmarkFromDb = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const bookmarkQuery = new QueryBuilder(
    bookmarkModel
      .find({ user: userId })
      .populate('tags', 'name color')
      .populate('folder', 'name'),
    query,
  )
    .search(['url', 'domain', 'title', 'notes', 'description', 'siteName'])
    .sort()
    .filter()
    .fields();
  const result = await bookmarkQuery.queryModel;
  // const meta = await bookmarkQuery.countTotal();
  const bookmarkWithFolder = result.filter((b) => b.folder);
  const bookmarkWithoutFolder = result.filter((b) => !b.folder);
  const folder = await folderModel.find({ userId });

  const folderWithBookmark = folder.map((folder) => ({
    ...folder.toObject(),
    bookmark: bookmarkWithFolder.filter(
      (b) => b?.folder?._id.toString() === folder?._id?.toString(),
    ),
  }));
  const pinnedBookmark = await bookmarkModel
    .find({ user: userId, isPinned: true })
    .sort({ pinnedAt: -1 })
    .populate('tags', 'name color')
    .populate('folder', 'name');
  return {
    pinnedBookmark,
    folder: folderWithBookmark,
    bookmark: bookmarkWithoutFolder,
  };
};

// todo: complete the rename api
const updateUserBookmarkFromDb = async (
  bookmarkId: string,
  userId: string,
  payload: Partial<TBookmark>,
) => {
  const isBookmarkExist = await bookmarkModel.findOne({
    _id: bookmarkId,
    user: userId,
  });
  if (!isBookmarkExist) {
    throw new AppError(404, 'Bookmark not found');
  }

  if (payload?.folder) {
    const isFolderExist = await folderModel.findOne({
      _id: payload.folder,
      userId,
    });
    if (!isFolderExist) {
      throw new AppError(404, 'Selected folder not found');
    }
  }

  if (payload?.tags && payload?.tags?.length > 0) {
    const existingTags = await tagModel.find({
      _id: { $in: payload.tags },
      userId: payload.user,
    });

    if (existingTags?.length !== payload?.tags?.length) {
      const foundedTag = existingTags.map((tag) => tag.name).join(', ');
      throw new AppError(
        404,
        `Some tag are not found. Founded tags: [${foundedTag}]`,
      );
    }
  }
  // remove the restricted field
  delete payload.user;
  delete payload.isFavorite;
  delete payload.visitCount;
  delete payload.lastVisitedAt;
  delete payload.isPublic;
  delete payload.previewStatus;

  const result = await bookmarkModel.findByIdAndUpdate(bookmarkId, payload);
  return result;
};

const deleteBookmarkFromDb = async (bookmarkId: string, userId: string) => {
  const isBookmarkExist = await bookmarkModel.findOne({
    _id: bookmarkId,
    user: userId,
  });
  if (!isBookmarkExist) {
    throw new AppError(404, 'Bookmark not found');
  }
  const result = await bookmarkModel.findOneAndDelete({
    _id: bookmarkId,
    user: userId,
  });
  return result;
};

const addToFolderIntoDb = async (
  userId: string,
  payload: { bookmarkIds: string[]; folderId: string },
) => {
  if (!payload.bookmarkIds || payload.bookmarkIds.length === 0) {
    throw new AppError(400, 'No bookmark IDs provided');
  }

  const isBookmarkExist = await bookmarkModel.find({
    _id: { $in: payload.bookmarkIds },
    user: userId,
  });

  if (isBookmarkExist.length < 1) {
    throw new AppError(404, 'Bookmark not found');
  }

  const isFolderExist = await folderModel.findOne({
    _id: payload.folderId,
    userId: userId,
  });
  if (!isFolderExist) {
    throw new AppError(404, 'Folder not found');
  }

  if (isBookmarkExist.length !== payload.bookmarkIds.length) {
    const foundedIds = isBookmarkExist.map((b) => b._id.toString());
    const notFoundIds = payload.bookmarkIds.filter(
      (b) => !foundedIds.includes(b),
    );
    throw new AppError(
      404,
      `Some bookmark are not found. Not founded bookmark id: [${notFoundIds}]`,
    );
  }
  const result = await bookmarkModel.updateMany(
    {
      _id: { $in: payload.bookmarkIds },
      user: userId,
    },
    { $set: { folder: payload.folderId } },
    { runValidators: true },
  );
  return result;
};

const updateVisitCountIntoDb = async (bookmarkId: string, userId: string) => {
  const isBookmarkExist = await bookmarkModel.findOne({
    _id: bookmarkId,
    user: userId,
  });
  if (!isBookmarkExist) {
    throw new AppError(404, 'Bookmark not found');
  }

  isBookmarkExist.visitCount += 1;
  isBookmarkExist.lastVisitedAt = new Date();

  const result = await isBookmarkExist.save();
  return result;
};

export const bookmarkServices = {
  updateUserBookmarkFromDb,
  getUserBookmarkFromDb,
  createBookmarkIntoDb,
  deleteBookmarkFromDb,
  getLinkInfo,
  addToFolderIntoDb,
  updateVisitCountIntoDb,
  pinBookmarkIntoDb,
};
