import React from "react";
import classes from './Input.module.css'
const  Input = ({className, type, placeHolder, value, onChange}) => {
    let inputClasses = classes.input

    if(className) {
        inputClasses = `${inputClasses} ${className}` 
    }
    
    return (
        <input placeholder={placeHolder} type={type} value={value} className={inputClasses} onChange={onChange} />
    )
}

export default Input;