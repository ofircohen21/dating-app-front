import React, { useEffect } from 'react'
import classes from './Modal.module.css'

const Modal = ({children, className, onClose}) => {
    const modalClasses = `${className} ${classes.modal}`

    useEffect(() => {
        document.addEventListener('click', onClose)

        return () => {
            document.removeEventListener('click', onClose)
        }
    }, [])
    return (
        <div className={modalClasses}>
            {children}
        </div>
    )
}

export default Modal;