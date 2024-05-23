import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './FooterIcon.module.css'

const FooterIcon = ({ to, ActiveIcon, InactiveIcon }) => {
    let activeIconClasses = `${classes['active-icon']} ${classes.icon}`

    return (
        <div className={classes['icon-container']}>
            <NavLink className={classes['nav-link']} to={to}>
                {({ isActive }) => (
                    isActive ? <ActiveIcon className={activeIconClasses} /> : <InactiveIcon className={classes.icon} />
                )}
            </NavLink>
        </div>
    );
};

export default FooterIcon;
