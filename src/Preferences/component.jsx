import DialogComponent from '../Dialog/component'
import ThemesComponent from '../Themes/component'
import TogglesComponent from '../Toggles/component'
import './component.css'

const PreferencesComponent = ({ open, onRequestClose }) => (
	<DialogComponent className="Preferences" open={open} onRequestClose={onRequestClose}>
		<div className="Preferences__Form">
			<h2>Preferences</h2>
			<TogglesComponent />
			<h2>Theme</h2>
			<ThemesComponent />
		</div>
	</DialogComponent>
)

export default PreferencesComponent
