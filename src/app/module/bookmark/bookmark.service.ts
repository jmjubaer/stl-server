import { getLinkPreview } from 'link-preview-js';
import AppError from '../../errors/AppError';

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

export const bookmarkServices = {
  getLinkInfo,
};
