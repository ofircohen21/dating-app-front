import React from 'react';
import classes from './MatchImage.module.css';
import { useState, useRef } from 'react';
import BackgroundImage from '../BackgroundImage/BackgroundImage';

const MatchImage = ({ matchObj, backgroundMatchObj, likeHandler, dislikeHandler, isLikeActionClicked, isDislikeActionClicked }) => {
    const [rotate, setRotate] = useState(0);
    const [isDragged, setIsDragged] = useState(false)
    const [leftIndentation, setLeftIndentation] = useState(0)
    const [rightIndentation, setRightIndentation] = useState(0)
    const [touchStartX, setTouchStartX] = useState(0)

    const elementRef = useRef(null)

    let matchImageClass = classes['image-container'];

    if (isLikeActionClicked) {
        matchImageClass = `${classes['like-action-animation']} ${classes['image-container']}`
    }

    else if (isDislikeActionClicked) {
        matchImageClass = `${classes['dislike-action-animation']} ${classes['image-container']}`
    }

    const style = {
        transform: `rotate(${rotate}deg)`,
    }

    if (rotate === 10) {
        style['left'] = `${leftIndentation}px`
    }
    if (rotate === -10) {
        style['right'] = `${rightIndentation}px`
    }

    const touchStartHandler = (e) => {
        setTouchStartX(e.changedTouches[0].clientX)
        setIsDragged(true)
    }

    const touchEndHandler = (e) => {
        const touchEndX = e.changedTouches[0].clientX
        const imageOffsetWidth = e.target.offsetWidth
        if (touchEndX - touchStartX >= 0.5 * imageOffsetWidth) {
            likeHandler()
        }

        else if (Math.abs(touchEndX - touchStartX) >= 0.5 * imageOffsetWidth) {
            dislikeHandler('some id')
        }

        setLeftIndentation(0);
        setRotate(0)
        setIsDragged(false)
        setRightIndentation(0)
        setTouchStartX(0)
    }


    const touchMoveHandler = (e) => {
        const imageContainerWidth = elementRef.current.offsetWidth
        const moveDestinationX = e.touches[0].clientX

        // Like
        if (moveDestinationX > touchStartX) {
            setRotate(10)
            setLeftIndentation(moveDestinationX)
        }

        // Dislike
        else if (moveDestinationX < touchStartX) {
            setRotate(-10)
            // Dragging right can start from the most right point of image. So 'moveDestinationX' at max will be the image width.
            // By Substracting the moveDestinationX from imageContainerWidth the image will be dragged to the right from the most
            // right point
            setRightIndentation(imageContainerWidth - moveDestinationX)
        }
    }

    return (
        <div className={classes['images-container']}>
            <div
                ref={elementRef}
                className={matchImageClass}
                onTouchStart={touchStartHandler}
                onTouchMove={touchMoveHandler}
                onTouchEnd={touchEndHandler}
                style={isDragged ? style : null}
            >
                <img className={classes.img} src={matchObj.image} alt='Match' width='90%' />
                <h3 className={classes.details}>{`${matchObj.name}, ${matchObj.age}`}</h3>
            </div>
            {(isDragged || isLikeActionClicked || isDislikeActionClicked) && backgroundMatchObj && (
                <BackgroundImage matchObj={backgroundMatchObj} />
            )}
        </div>
    )
}

export default MatchImage;