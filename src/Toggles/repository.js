import { defaultToggles, isToggles } from './model';
import { useChromeStorage } from '../infrastructure/chromeStorage';
export const useToggles = () => useChromeStorage({
    areaName: 'sync',
    key: 'v3.toggles',
    defaultValue: defaultToggles,
    isType: isToggles,
});
