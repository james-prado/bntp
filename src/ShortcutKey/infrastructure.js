import { useEffect } from 'react';

export const useGlobalKey = (handler) =>
	useEffect(() => {
		const listener = (e) => {
			// prevent handling a child event such as <input>
			if (e.target === document.body && e.key) {
				handler(e);
			}
		};
		window.addEventListener('keydown', listener);
		return () => window.removeEventListener('keydown', listener);
	});
