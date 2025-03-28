import './component.css'

const SearchComponent = ({ value, onChange }) => {
	return (
		<div className="Search">
			<input
				type="text"
				value={value}
				placeholder="Search bookmarks..."
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Escape') {
						onChange('')
						if (e.target instanceof HTMLInputElement) {
							e.target.blur()
						}
					}
				}}
			/>
		</div>
	)
}

export default SearchComponent
