export const isBookmarkFolderIDArray = (value) =>
	Array.isArray(value) && value.every((item) => typeof item === 'string');

export const filterBookmarks = (bookmarks, search) => {
	if (!search) {
		return bookmarks;
	}
	const searchLower = search.toLocaleLowerCase();
	return bookmarks.filter(
		(b) => b.title.toLocaleLowerCase().includes(searchLower) || b.url.toLocaleLowerCase().includes(searchLower)
	);
};

export class FolderCollapse {
	constructor(collapsedIDs) {
		this.serialize = () => [...this.collapsedIDs];
		this.collapsedIDs = new Set(collapsedIDs);
	}
	isCollapsed(id) {
		return this.collapsedIDs.has(id);
	}
	collapse(id) {
		return new FolderCollapse([id, ...this.collapsedIDs]);
	}
	expand(id) {
		const newSet = new Set(this.collapsedIDs);
		newSet.delete(id);
		return new FolderCollapse(newSet);
	}
}
