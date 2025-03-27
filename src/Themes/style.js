import './themes.css';
import { selectedColorSchemeSpec, selectedThemeSpec } from './repository';
import { getLocalStorageCacheOrDefaultValue } from '../infrastructure/localStorageCache';
import { useEffect } from 'react';
export const useThemeStyle = (theme, colorScheme) => {
    useEffect(() => {
        document.documentElement.dataset['theme'] = theme;
    }, [theme]);
    useEffect(() => {
        document.documentElement.dataset['colorScheme'] = colorScheme;
    }, [colorScheme]);
};
export const preloadThemeStyleFromLocalStorageCache = (localStorage) => {
    document.documentElement.dataset['theme'] = getLocalStorageCacheOrDefaultValue(localStorage, selectedThemeSpec);
    document.documentElement.dataset['colorScheme'] = getLocalStorageCacheOrDefaultValue(localStorage, selectedColorSchemeSpec);
};
