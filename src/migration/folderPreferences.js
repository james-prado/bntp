import { FolderCollapse } from '../Bookmarks/model'
import { parseLocalStorage } from './localStorage'

export const V2_KEY = 'FOLDER_PREFERENCES'
export const V3_KEY = 'v3.collapsedBookmarkFolderIDs'

export const upgrade = (folderPreferences) => {
	const collapsedIDs = folderPreferences
		.filter((folderPreference) => folderPreference.collapsed)
		.map((folderPreference) => folderPreference.id)
	return new FolderCollapse(collapsedIDs)
}

const isFolderPreferences = (v) =>
	Array.isArray(v) && v.every((e) => typeof e === 'object' && 'id' in e && 'collapsed' in e)

export const migrate = async () => {
	const folderPreferences = parseLocalStorage(V2_KEY, isFolderPreferences)
	if (folderPreferences === undefined) {
		return
	}
	const folderCollapse = upgrade(folderPreferences)
	await chrome.storage.sync['set']({ [V3_KEY]: folderCollapse.serialize() })
	localStorage.removeItem(V2_KEY)
}
