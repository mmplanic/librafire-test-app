import './container.scss'
import { getClassName } from '../../utils/utils';

export default function Container({children, className}) {
    return (
        <div className={getClassName('container', className)} >
            {children}
        </div>
    )
}
