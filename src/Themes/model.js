export const allColorSchemes = ['auto', 'light', 'dark'];
export const isColorScheme = (value) => allColorSchemes.some((colorScheme) => value === colorScheme);
export const allThemes = ['standard', 'solarized'];
export const isTheme = (value) => allThemes.some((theme) => value === theme);
