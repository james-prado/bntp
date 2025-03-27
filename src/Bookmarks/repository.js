import { FolderCollapse, isBookmarkFolderIDArray } from './model';
import { useContext, useEffect, useState } from 'react';
import { ChromeContext } from '../infrastructure/chrome';
import { useChromeStorage } from '../infrastructure/chromeStorage';

export const useBookmarkFolders = () => {
    const [bookmarkFolders, setBookmarkFolders] = useState([]);
    const chrome = useContext(ChromeContext);
    useEffect(() => {
        getBookmarkFolders(chrome)
            .then((b) => setBookmarkFolders(b))
            .catch((e) => console.error(e));
        return subscribeBookmarks(chrome, setBookmarkFolders);
    }, []);
    return bookmarkFolders;
};
const getBookmarkFolders = async (chrome) => {
    return traverseBookmarkTree(await chrome.bookmarks.getTree());
};
const subscribeBookmarks = (chrome, handler) => {
    const listener = () => {
        getBookmarkFolders(chrome)
            .then((b) => handler(b))
            .catch((e) => console.error(e));
    };
    chrome.bookmarks.onChanged.addListener(listener);
    chrome.bookmarks.onChildrenReordered.addListener(listener);
    chrome.bookmarks.onCreated.addListener(listener);
    chrome.bookmarks.onMoved.addListener(listener);
    chrome.bookmarks.onRemoved.addListener(listener);
    return () => {
        chrome.bookmarks.onChanged.removeListener(listener);
        chrome.bookmarks.onChildrenReordered.removeListener(listener);
        chrome.bookmarks.onCreated.removeListener(listener);
        chrome.bookmarks.onMoved.removeListener(listener);
        chrome.bookmarks.onRemoved.removeListener(listener);
    };
};
export const traverseBookmarkTree = (tree, depth = 0) => tree.flatMap((node) => {
    if (node.children === undefined) {
        return [];
    }
    const childFolders = node.children.filter((child) => child.url === undefined);
    const childBookmarks = node.children.filter((child) => child.url !== undefined);
    if (childBookmarks.length === 0) {
        return traverseBookmarkTree(childFolders, depth);
    }
    const thisFolder = {
        id: node.id,
        depth,
        title: node.title,
        bookmarks: childBookmarks.map((b) => ({
            id: b.id,
            title: b.title,
            url: b.url || '',
            folderID: node.id,
        })),
    };
    return [thisFolder, ...traverseBookmarkTree(childFolders, depth + 1)];
});
export const updateBookmark = async (bookmark) => {
    await chrome.bookmarks.update(bookmark.id, { url: bookmark.url, title: bookmark.title });
};
export const removeBookmark = async (bookmark) => {
    await chrome.bookmarks.remove(bookmark.id);
};
export const moveBookmark = async (bookmark, position) => {
    await chrome.bookmarks.move(bookmark.id, { parentId: position.folderID, index: position.index });
};
export const useFolderCollapse = () => {
    const [ids, setIDs] = useChromeStorage({
        areaName: 'sync',
        key: 'v3.collapsedBookmarkFolderIDs',
        defaultValue: [],
        isType: isBookmarkFolderIDArray,
    });
    return [new FolderCollapse(ids), (newSet) => setIDs(newSet.serialize())];
};
