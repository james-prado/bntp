import { useChromeStorage } from '../infrastructure/chromeStorage'
import { defaultToggles, isToggles } from './model'

export const useToggles = () =>
	useChromeStorage({
		areaName: 'sync',
		key: 'v3.toggles',
		defaultValue: defaultToggles,
		isType: isToggles,
	})
