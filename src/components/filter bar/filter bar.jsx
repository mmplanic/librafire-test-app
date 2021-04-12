import { getClassName } from '../../utils/utils';
import './filter bar.scss';


function FilterBar({ children, className }) {
    return (
        <div className={getClassName('filter-bar', className)}>
            { children }
        </div>
    )
}

function Search({placeholder='', value='', onChange, className}) {
    return (
        <input className={getClassName('filter-bar__input --search' , className)} type='search' placeholder={placeholder} value={value} onChange={ onChange } />

    )
}

function Select({ placeholder = '', value = '', options = [], onChange, className }) {
    return (
        <select className={getClassName('filter-bar__input --select', className)} placeholder={placeholder} value={value} onChange={ onChange } >
            {options.map((option, i) => {
                const { value:optValue='', text='' } = option;
                return(
                    <option value={optValue} key={`option-${i}`}> {text} </option>
                )
            })}
        </select>
    )
}

FilterBar.Search = Search;
FilterBar.Select = Select;

export default FilterBar;
