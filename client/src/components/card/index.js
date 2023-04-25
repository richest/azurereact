import React from 'react'

import style from './card.module.scss'

const Card = ({ children, className }) => {
    return (
        <div className={`${style.cardDiv} ${className}`}>{children}</div>
    )
}

export default Card