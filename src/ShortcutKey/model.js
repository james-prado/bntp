export const shortcutKeyOf = (s) => {
	if (s.length < 1) {
		return;
	}
	return s.charAt(0).toUpperCase();
};

export class ShortcutMap {
	constructor(entries) {
		this.serialize = () => [...this.entries];
		const typedEntries = [];
		const keySet = new Set();
		const bookmarkSet = new Set();
		for (const [key, id] of entries) {
			const sanitizedKey = shortcutKeyOf(key);
			if (!sanitizedKey || !id || keySet.has(sanitizedKey) || bookmarkSet.has(id)) {
				continue;
			}
			keySet.add(sanitizedKey);
			bookmarkSet.add(id);
			typedEntries.push([sanitizedKey, id]);
		}
		this.entries = typedEntries;
	}
	getByBookmarkID(bookmarkID) {
		for (const [key, id] of this.entries) {
			if (id === bookmarkID) {
				return key;
			}
		}
	}
	getByShortcutKey(shortcutKey) {
		for (const [key, id] of this.entries) {
			if (key === shortcutKey) {
				return id;
			}
		}
	}
	set(bookmarkID, key) {
		if (!key) {
			return new ShortcutMap(this.entries.filter(([, id]) => id !== bookmarkID));
		}
		return new ShortcutMap([[key, bookmarkID], ...this.entries]);
	}
}
