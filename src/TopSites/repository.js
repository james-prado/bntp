import { useContext, useEffect, useState } from 'react'
import { ChromeContext } from '../infrastructure/chrome'

export const useTopSites = () => {
	const [topSites, setTopSites] = useState([])
	const chrome = useContext(ChromeContext)
	useEffect(() => {
		chrome.topSites
			.get()
			.then(setTopSites)
			.catch((e) => console.error(e))
	}, [])
	return topSites
}
