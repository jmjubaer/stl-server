import { getLinkPreview } from 'link-preview-js';

const getLinkInfo = async (url: string) => {
  const result = await getLinkPreview(url);
  return result;
};

export const bookmarkServices = {
  getLinkInfo,
};
