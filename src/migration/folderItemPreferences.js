import { ShortcutMap } from '../ShortcutKey/model';
import { parseLocalStorage } from './localStorage';
export const V2_KEY = 'FOLDER_ITEM_PREFERENCES';
export const V3_KEY = 'v3.shortcutKeyMap';
const isFolderItemPreferences = (v) => Array.isArray(v) && v.every((e) => typeof e === 'object' && 'id' in e && 'accessKey' in e);
export const upgrade = (folderItemPreferences) => {
    const entries = folderItemPreferences.map((folderItemPreference) => [
        folderItemPreference.accessKey,
        folderItemPreference.id,
    ]);
    return new ShortcutMap(entries);
};
export const migrate = async () => {
    const folderItemPreferences = parseLocalStorage(V2_KEY, isFolderItemPreferences);
    if (folderItemPreferences === undefined) {
        return;
    }
    const shortcutMap = upgrade(folderItemPreferences);
    await chrome.storage.sync['set']({ [V3_KEY]: shortcutMap.serialize() });
    localStorage.removeItem(V2_KEY);
};
