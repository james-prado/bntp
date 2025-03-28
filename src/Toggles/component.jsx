import { useToggles } from './repository'

const TogglesComponent = () => {
	const [toggles, setToggles] = useToggles()
	return (
		<form>
			<label>
				<input
					type="checkbox"
					checked={toggles.indent}
					onChange={(e) => setToggles({ ...toggles, indent: e.target.checked })}
				/>
				Indent
			</label>
		</form>
	)
}

export default TogglesComponent
