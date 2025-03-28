import { allColorSchemes, allThemes } from './model'
import { useSelectedColorScheme, useSelectedTheme } from './repository'
import { useThemeStyle } from './style'

const ThemesComponent = () => {
	const [selectedTheme, setSelectedTheme] = useSelectedTheme()
	const [selectedColorScheme, setSelectedColorScheme] = useSelectedColorScheme()
	return (
		<>
			<form>
				{allColorSchemes.map((colorScheme) => (
					<label key={colorScheme}>
						<input
							type="radio"
							name="selectedColorScheme"
							value={colorScheme}
							checked={colorScheme === selectedColorScheme}
							onChange={() => setSelectedColorScheme(colorScheme)}
						/>
						{capitalize(colorScheme)}
					</label>
				))}
			</form>
			{allThemes.length > 1 ? <form>
				{allThemes.map((theme) => (
					<label key={theme}>
						<input
							type="radio"
							name="selectedTheme"
							value={theme}
							checked={theme === selectedTheme}
							onChange={() => setSelectedTheme(theme)}
						/>
						{capitalize(theme)}
					</label>
				))}
			</form> : null}
		</>
	)
}

const capitalize = (s) => s.replace(/^\w/, (c) => c.toUpperCase())

export const SubscribeThemeComponent = () => {
	const [selectedTheme] = useSelectedTheme()
	const [selectedColorScheme] = useSelectedColorScheme()
	useThemeStyle(selectedTheme, selectedColorScheme)
	return null
}

export default ThemesComponent
