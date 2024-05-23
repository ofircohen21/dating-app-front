import React from "react"
import headerLogo from '../../../assets/header-logo.png'
import classes from './Navbar.module.css'
import {FiFilter} from 'react-icons/fi'

const Navbar = ({openFilterModal}) => {
    return (
        <div className={classes.container}>
            <img src={headerLogo} className={classes['header-logo']} alt="logo"/>
            <FiFilter className={classes.filter} onClick={openFilterModal}/>
        </div>
    )
}

export default Navbar;