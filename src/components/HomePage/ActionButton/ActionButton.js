import React from 'react'
import classes from './ActionButton.module.css'

const ActionButton = ({ IconComponent, handleActionClick, className }) => {
    let clickHandler = () => {
        handleActionClick()
    }

    let buttonClasses = classes['icon-wrapper']

    if (className) {
        buttonClasses = `${buttonClasses} ${className}`
    }

    return (
        <div className={buttonClasses} onClick={clickHandler}>
            <IconComponent className={`${classes.icon}`} />
        </div>
    );
}

export default ActionButton;