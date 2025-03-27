import { useContext, useEffect, useState } from 'react';
import { LocalStorageContext } from './localStorage';
export const useLocalStorageCache = (spec) => {
    const localStorage = useContext(LocalStorageContext);
    const [value, setValue] = useState(getLocalStorageCacheOrDefaultValue(localStorage, spec));
    useEffect(() => {
        localStorage.setItem(spec.key, value);
    }, [spec.key, value]);
    return [value, setValue];
};
export const getLocalStorageCacheOrDefaultValue = (localStorage, spec) => {
    const cachedValue = localStorage.getItem(spec.key);
    if (spec.isType(cachedValue)) {
        return cachedValue;
    }
    return spec.defaultValue;
};
