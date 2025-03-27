export class Drag {
	constructor(bookmark, from, to, state) {
		this.bookmark = bookmark;
		this.from = from;
		this.to = to;
		this.state = state;
	}
	static start(bookmark, from) {
		return new Drag(bookmark, from, from, 'enter');
	}
	enterTo(to) {
		return new Drag(this.bookmark, this.from, to, 'enter');
	}
	leave() {
		return new Drag(this.bookmark, this.from, this.to, 'leave');
	}
	calculateDestination() {
		// https://stackoverflow.com/questions/13264060/chrome-bookmarks-api-using-move-to-reorder-bookmarks-in-the-same-folder
		if (this.from.folderID === this.to.folderID && this.from.index < this.to.index) {
			return { ...this.to, index: this.to.index + 1 };
		}
		return this.to;
	}
}

export const reorderBookmarks = (drag, folderID, bookmarks) => {
	if (!drag) {
		return bookmarks;
	}
	// move the bookmark in the folder
	if (folderID === drag.from.folderID && drag.from.folderID === drag.to.folderID) {
		const r = [...bookmarks];
		r.splice(drag.from.index, 1);
		r.splice(drag.to.index, 0, { ...drag.bookmark, dragFrom: true, dragTo: true, state: drag.state });
		return r;
	}
	// move the bookmark across the folders
	if (folderID === drag.from.folderID) {
		const r = [...bookmarks];
		// keep the element to receive the dragEnd event
		r.splice(drag.from.index, 1);
		r.push({ ...drag.bookmark, dragFrom: true, state: drag.state });
		return r;
	}
	if (folderID === drag.to.folderID) {
		const r = [...bookmarks];
		r.splice(drag.to.index, 0, { ...drag.bookmark, dragTo: true, state: drag.state });
		return r;
	}
	return bookmarks;
};
