import { useChromeStorageWithCache } from '../infrastructure/chromeStorage';
import { isColorScheme, isTheme } from './model';

export const selectedThemeSpec = {
	areaName: 'sync',
	key: 'v3.selectedTheme',
	defaultValue: 'standard',
	isType: isTheme,
};

export const useSelectedTheme = () => useChromeStorageWithCache(selectedThemeSpec);

export const selectedColorSchemeSpec = {
	areaName: 'sync',
	key: 'v3.selectedColorScheme',
	defaultValue: 'auto',
	isType: isColorScheme,
};

export const useSelectedColorScheme = () => useChromeStorageWithCache(selectedColorSchemeSpec);
