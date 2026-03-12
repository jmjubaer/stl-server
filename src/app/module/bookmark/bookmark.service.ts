import { getLinkPreview } from 'link-preview-js';
import AppError from '../../errors/AppError';
import { bookmarkModel } from './bookmark.model';
import { TBookmark } from './bookmark.interface';
import { userModel } from '../user/user.model';
import { folderModel } from '../folder/folder.model';
import { tagModel } from '../tag/tag.mode';

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

const createBookmarkIntoDb = async (payload: TBookmark) => {
  const isUserExist = await userModel.findById(payload.user);
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

  const result = await bookmarkModel.create(payload);
  return result;
};

const getUserBookmarkFromDb = async (userId: string) => {
  const result = await bookmarkModel
    .find({ user: userId })
    .populate('tags', 'name color')
    .populate('folder', 'name');

  const bookmarkWithFolder = result.filter((b) => b.folder);
  const bookmarkWithoutFolder = result.filter((b) => !b.folder);
  const folder = await folderModel.find({ userId });

  const folderWithBookmark = folder.map((folder) => ({
    ...folder.toObject(),
    bookmark: bookmarkWithFolder.filter(
      (b) => b?.folder?._id.toString() === folder?._id?.toString(),
    ),
  }));

  return { folder: folderWithBookmark, bookmark: bookmarkWithoutFolder };
};
export const bookmarkServices = {
  getUserBookmarkFromDb,
  createBookmarkIntoDb,
  getLinkInfo,
};
