import React, { useEffect, useState } from 'react';
import match1 from '../../assets/match1.png'
import classes from './LikesPage.module.css'
import NavigationFooter from '../NavigationFooter/NavigationFooter';
import { fetchLikes } from '../../services/api-services/likesService';

const LikesPage = ({ userId }) => {
    const [likes, setLikes] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                try {
                    const result = await fetchLikes(userId)
                    setLikes(result);
                    
                } catch (error) {
                    console.log('Error during data fetching:', error);
                }
            }
        };

        fetchData(userId);
    }, [userId])

    let likeElements = []
    if (likes) {
        likeElements = likes.map((likeObject => {
            return (
                <div key={likeObject.likeActionId} className={classes['image-container']}>
                    <img src={match1} className={classes['like-image']} alt='small-match' />
                    <h3 className={classes['liked-match-details']}>{`${likeObject.name}, ${likeObject.age}`}</h3>
                </div>
            )
        }))
    }

    return (
        <div>
            <h3 className={classes.title}>Your Likes</h3>
            {likes.length > 0 ?
                <div className={classes['likes-container']}>
                    {likeElements}
                </div> : <h3 className={classes.title}>Start reviewing matches!</h3>}
            <NavigationFooter />
        </div>
    )
}

export default LikesPage;