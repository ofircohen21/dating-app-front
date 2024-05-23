import React from 'react';
import classes from './BackgroundImage.module.css'

const BackgroundImage = ({matchObj}) => {
    return (
        <div className={classes['background-image']}>
            <img className={classes.img} src={matchObj.image} alt='Background match'/>     
            <h3 className={classes.details}>{`${matchObj.name}, ${matchObj.age}`}</h3> 
        </div>
    )
}

export default BackgroundImage;