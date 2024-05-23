import React from "react";
import classes from './DropdownToggler.module.css'

const DropdownToggler = ({className, placeholder, value, onClick}) => {
    let togglerClasses = `${classes.dropdown} ${classes['selected-value']}`

    if (!value) {
        togglerClasses = `${classes.dropdown} ${classes.placeholder}`
    }

    if(className) {
        togglerClasses = `${togglerClasses} ${className}`
    }
    
    let arrowClasses = `${classes.arrow} ${classes['right-arrow']}`

    return (
        <div className={togglerClasses} onClick={onClick}>
            <div>{value ? value : placeholder}</div>
            <div className={arrowClasses} onClick={onClick}></div>
        </div>
    )
}

export default DropdownToggler;