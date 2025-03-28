import DialogComponent from '../Dialog/component'
import ManifestComponent from '../Manifest/component'
import ThemesComponent from '../Themes/component'
import TogglesComponent from '../Toggles/component'
import './component.css'

const PreferencesComponent = ({ open, onRequestClose }) => (
	<DialogComponent className="Preferences" open={open} onRequestClose={onRequestClose}>
		<div className="Preferences__Form">
			<h2>Toggles</h2>
			<TogglesComponent />
			<h2>Themes</h2>
			<ThemesComponent />
			<h2>About</h2>
			<ManifestComponent />
		</div>
	</DialogComponent>
)

export default PreferencesComponent
