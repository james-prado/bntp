import { useChromeStorage } from '../infrastructure/chromeStorage'
import { ShortcutMap } from './model'

export const useShortcutMap = () => {
	const [entries, setEntries] = useChromeStorage({
		areaName: 'sync',
		key: 'v3.shortcutKeyMap',
		defaultValue: [],
		isType: (value) => Array.isArray(value),
	})
	return [new ShortcutMap(entries), (newMap) => setEntries(newMap.serialize())]
}
