import { getClassName } from '../../utils/utils';
import './loader.scss';


export default function Loader({isLoading=false}) {
    return (
        <div className={getClassName('loader', isLoading?'active':'')}>
            <div className="spinner"></div>
        </div>
    )
}
