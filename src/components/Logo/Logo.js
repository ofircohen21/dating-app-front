import LogoImage from '../../assets/logo.png'
import classes from './Logo.module.css'
import React from 'react'

const Logo = () => {
    return <img src={LogoImage} className={classes.logo} alt="logo"/>
}

export default Logo;