import { createContext } from 'react';
// https://bugs.chromium.org/p/chromium/issues/detail?id=104102#c63
const chromeFavicon = {
    getImageUrl: (url) => `/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`,
};
export const FaviconContext = createContext(chromeFavicon);
