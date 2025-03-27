import { useContext } from 'react';
import { FaviconContext } from '../infrastructure/favicon';
import './component.css';
import { filterTopSites } from './model';
import { useTopSites } from './repository';

const TopSitesComponent = ({ search }) => {
	const topSites = filterTopSites(useTopSites(), search);
	return (
		<div className="TopSites">
			{topSites.map((s, i) => (
				<TopSiteComponent key={i} topSite={s} />
			))}
		</div>
	);
};

export default TopSitesComponent;

const TopSiteComponent = ({ topSite }) => {
	const favicon = useContext(FaviconContext);
	return (
		<div className="TopSite">
			<a href={topSite.url}>
				<div className="TopSiteButton">
					<img className="TopSiteButton__Icon" alt="" src={favicon.getImageUrl(topSite.url)} />
				</div>
			</a>
			<div className="TopSiteTitle">{topSite.title}</div>
		</div>
	);
};
