import { ChromeContext } from './chrome';
import { useContext, useEffect, useState } from 'react';
import { useLocalStorageCache } from './localStorageCache';
export const useChromeStorage = (spec, initialValue) => {
    const chrome = useContext(ChromeContext);
    const storageArea = chrome.storage[spec.areaName];
    const [storedValue, setStoredValue] = useState(initialValue ?? spec.defaultValue);
    useEffect(() => {
        loadValue(storageArea, spec, setStoredValue).catch((e) => console.error(e));
        const listener = createStorageChangeListener(spec, setStoredValue);
        storageArea.onChanged.addListener(listener);
        return () => storageArea.onChanged.removeListener(listener);
    }, 
    // Don't set "spec" because it causes infinite loop.
    [spec.key, spec.areaName]);
    return [
        storedValue,
        (newValue) => {
            // Don't call setStoredValue() because Chrome will trigger an event
            saveValue(storageArea, spec, newValue).catch((e) => console.error(e));
        },
    ];
};
const loadValue = async (storageArea, spec, setStoredValue) => {
    const items = await storageArea.get(spec.key);
    if (!(spec.key in items)) {
        return;
    }
    const value = items[spec.key];
    if (value === undefined) {
        setStoredValue(spec.defaultValue);
        return;
    }
    if (spec.isType(value)) {
        setStoredValue(value);
        return;
    }
    console.warn(`unknown type of storage.${spec.areaName}.${spec.key}`, value);
};
const saveValue = async (storageArea, spec, newValue) => {
    await storageArea.set({ [spec.key]: newValue });
};
const createStorageChangeListener = (spec, setStoredValue) => (changes) => {
    if (!(spec.key in changes)) {
        return;
    }
    const newValue = changes[spec.key].newValue;
    if (newValue === undefined) {
        setStoredValue(spec.defaultValue);
        return;
    }
    if (spec.isType(newValue)) {
        setStoredValue(newValue);
        return;
    }
    console.warn(`unknown type of storage.${spec.areaName}.${spec.key}`, newValue);
};
export const useChromeStorageWithCache = (spec) => {
    const [cacheValue, setCacheValue] = useLocalStorageCache(spec);
    const [value, setValue] = useChromeStorage(spec, cacheValue);
    useEffect(() => {
        setCacheValue(value);
    }, [setCacheValue, value]);
    return [value, setValue];
};
