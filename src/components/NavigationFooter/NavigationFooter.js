import React from 'react'
import classes from './NavigationFooter.module.css'
import {AiFillHome,AiFillHeart, AiOutlineHeart, AiOutlineHome} from 'react-icons/ai'
import {BsChatLeftTextFill, BsChatLeftText} from 'react-icons/bs'
import {RiContactsFill, RiContactsLine} from 'react-icons/ri'
import FooterIcon from '../FooterIcon/FooterIcon'

const NavigationFooter = () => {
    return (
        <div className={classes.footer}>
            <FooterIcon to='/home' ActiveIcon={AiFillHome} InactiveIcon={AiOutlineHome}/>
            <FooterIcon to='/likes' ActiveIcon={AiFillHeart} InactiveIcon={AiOutlineHeart}/>
            <FooterIcon to='/chats' ActiveIcon={BsChatLeftTextFill} InactiveIcon={BsChatLeftText}/>
            <FooterIcon to='/profile' ActiveIcon={RiContactsFill} InactiveIcon={RiContactsLine}/>
        </div>
    )
}

export default NavigationFooter;