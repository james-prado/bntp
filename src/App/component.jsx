import { useState } from 'react'
import BookmarksComponent from '../Bookmarks/component'
import NetworkStatusComponent from '../NetworkStatus/component'
import PreferencesComponent from '../Preferences/component'
import SearchComponent from '../Search/component'
import { useToggles } from '../Toggles/repository'
import './component.css'

const App = () => {
	const [toggles] = useToggles()
	const [search, setSearch] = useState('')
	const [openPreferences, setOpenPreferences] = useState(false)
	return (
		<div className="App">
			<SearchComponent value={search} onChange={setSearch} />
			<BookmarksComponent search={search} />
			<div className="App__Footer">
				<button onClick={() => setOpenPreferences(true)}>Settings</button>
			</div>
			<PreferencesComponent open={openPreferences} onRequestClose={() => setOpenPreferences(false)} />
			<NetworkStatusComponent />
		</div>
	)
}

export default App
