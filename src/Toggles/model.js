const validateObject = (o, validator) =>
	typeof o === 'object' &&
	o !== null &&
	// object has all keys of T
	Object.keys(validator).every((key) => Object.keys(o).includes(key)) &&
	// all properties of object are valid
	Object.entries(o).every(([key, prop]) => key in validator && validator[key](prop))

const togglesValidator = {
	topSites: (prop) => typeof prop === 'boolean',
	bookmarks: (prop) => typeof prop === 'boolean',
	indent: (prop) => typeof prop === 'boolean',
}

export const isToggles = (o) => validateObject(o, togglesValidator)

export const defaultToggles = {
	bookmarks: true,
	topSites: true,
	indent: false,
}
