export const filterTopSites = (topSites, search) => {
	if (!search) {
		return topSites;
	}
	const searchLower = search.toLocaleLowerCase();
	return topSites.filter(
		(b) => b.title.toLocaleLowerCase().includes(searchLower) || b.url.toLocaleLowerCase().includes(searchLower)
	);
};
