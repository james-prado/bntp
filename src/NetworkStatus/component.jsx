import './component.css';
import { useOnLine } from './repository';
const NetworkStatusComponent = () => {
    const [onLine] = useOnLine();
    if (!onLine) {
        return <div className="NetworkStatus">No Internet Connection</div>;
    }
};
export default NetworkStatusComponent;
