import React from "react"
import classes from './ErrorMessage.module.css'

const ErrorMessage = ({errorMessage}) => (
    <div className={classes['error-message']}>{errorMessage}</div>
)


export default ErrorMessage;