import './filter bar.scss';

function FilterBar({ children }) {
    return (
        <div className="filter-bar">
            { children }
        </div>
    )
}

function Search({placeholder='', value='' on}) {
    return (
        <input className='filter-bar__search' type='search' placeholder={placeholder} value={value} onChange={ onChange } />

    )
}

function Select({placeholder='', value='', options = []}, onChange) {
    return (
        <select className='filter-bar__select' placeholder={placeholder} value={value} onChange={ onChange } >
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
