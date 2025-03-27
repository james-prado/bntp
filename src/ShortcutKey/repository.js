import { ShortcutMap } from './model';
import { useChromeStorage } from '../infrastructure/chromeStorage';
export const useShortcutMap = () => {
    const [entries, setEntries] = useChromeStorage({
        areaName: 'sync',
        key: 'v3.shortcutKeyMap',
        defaultValue: [],
        isType: (value) => Array.isArray(value),
    });
    return [new ShortcutMap(entries), (newMap) => setEntries(newMap.serialize())];
};
