import './pagination.scss';
import { getClassName } from '../../utils/utils';


export default function Pagination({ count = 1, current = 1, onChange, maxToShow = 7, arrows = false, className }) {

    function getNumbers(size, current, last) {
        if (size < 5)
            size = Math.min(5, last);
        
        if (size >= last)
            return new Array(last).fill(null).map((_, i) => i + 1);
        
        size -= (size + 1) % 2;
          
        const numbers = new Array(size).fill(null);

        numbers[0] = 1;
        numbers[size - 1] = last;
        
        var left = current - Math.floor((size - 1) / 2);
        var right = current + Math.floor(size / 2);
        
        var leftInd = 2;
        var rightInd = size - 3;
        
        var diff = left;
        
        if (left <= 1) {
            leftInd = 0;
            diff = 1;
        }  

        if (right >= last) {
            rightInd = size - 1;
            diff += last - right;
        }
        
        for ( let i = leftInd; i <= rightInd; i++) {
            numbers[i] = i + diff;
        }
        return numbers;
      }

    return (
        <div className={getClassName('pagination', className)}>
            {arrows ? <button className={getClassName('pagination__button pagination__arrow --left', current === 1 ? 'disabled' : '')} onClick={current - 1 ? _ => onChange(current - 1) : null} >{ arrows.left?arrows.left:'<'}</button> : null}
            {
               maxToShow>0?getNumbers(maxToShow, current, count).map((num, i) => <button key={`pag-btn-${i}`} type='button' className={getClassName('pagination__button',[ current === num ? 'active' : '', num?'':'--dots'])} onClick={num ? _ => onChange(num) : null} >{num ? num : '...'}</button>):null
            }
            {arrows ? <button className={getClassName('pagination__button pagination__arrow --right', current === count ? 'disabled' : '')} onClick={(current < count) ? _ => onChange(current + 1) : null}>{ arrows.right?arrows.right:'>'}</button> : null}
        </div>
    )
}
