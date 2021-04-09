import React from 'react'
import { getClassName } from '../../utils';

export default function Container({children, className}) {
    return (
        <div className={getClassName('container', className)} >
            {children}
        </div>
    )
}
