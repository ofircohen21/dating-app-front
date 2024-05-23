import React, { useState, useRef, useEffect } from 'react';
import classes from './AgeRangeSlider.module.css'

// Supported Age Range - 18 to 65
const AGE_RANGE = 47

const MIN_AGE_OFFSET = 18
const MAX_AGE_OFFSET = 19

/* 
The component renderes a slider with left and right handle (for min and max values). 
A range line is drawn between the two handles, that his size is the distance between the centers of the handles
*/

const AgeRangeSlider = ({ minAge, maxAge, updateMinAge, updateMaxAge }) => {
    const [minAgeDragOffset, setMinAgeDragOffset] = useState(0)
    const [maxAgeDragOffset, setMaxAgeDragOffset] = useState(0)
    const [handleSize, setHandleSize] = useState(0)

    const sliderRef = useRef(null)

    const ageSliderStyle = {
        height: `${handleSize}px`
    }

    const minAgeDragPointStyle = {
        width: `${handleSize}px`,
        height: `${handleSize}px`,
        left: `${minAgeDragOffset}px`
    }

    const rangeStyle = {
        // Spanning the range up to the middle of right handle
        width: `${maxAgeDragOffset - minAgeDragOffset + handleSize / 2}px`,
        height: `${handleSize}px`,
        // Setting the range line to start from the middle of left handle
        left: `${minAgeDragOffset + handleSize / 2}px`
    }

    const maxAgeDragPointStyle = {
        width: `${handleSize}px`,
        height: `${handleSize}px`,
        left: `${maxAgeDragOffset}px`
    }

    // Setting 'fontSize' to be handleSize to prevent the minAge and maxAge override each other
    const minAgeTextStyle = {
        left: `${minAgeDragOffset}px`,
        fontSize: `${handleSize}px`
    }

    const maxAgeTextStyle = {
        left: `${maxAgeDragOffset}px`,
        fontSize: `${handleSize}px`,
    }

    useEffect(() => {
        const leftIndent = sliderRef.current.getBoundingClientRect().left
        const sliderWidth = sliderRef.current.offsetWidth

        // Distance between middle of left handle to middle of right handle
        const sliderSize = sliderWidth - 2 * sliderWidth / AGE_RANGE

        // Multiplying by 2 to increase the handle size, so the age text won't be too small.
        setHandleSize(2 * sliderWidth / AGE_RANGE)

        // Calculating initial offset for left and right handles based on the minAge and maxAge props.
        const minAgeOffset = ((minAge - MIN_AGE_OFFSET) / AGE_RANGE * sliderSize)
        const maxAgeOffset = ((maxAge - MIN_AGE_OFFSET) / AGE_RANGE * sliderSize)

        setMinAgeDragOffset(leftIndent + minAgeOffset)
        setMaxAgeDragOffset(leftIndent + maxAgeOffset)

    }, [])

    const onLeftHandleTouchMove = (e) => {
        // Calculating the range line size from the center of the handles, as if the handles are on the slider edges.
        const movePoint = e.touches[0].clientX
        const sliderSize = sliderRef.current.offsetWidth - handleSize

        // Distance from the left between the start of page to slider element
        const leftIndent = sliderRef.current.getBoundingClientRect().left

        // Checking if the left handle is dragged outside of the slider
        if (movePoint <= leftIndent) {
            // Resetting left handle offset to 'leftIndent'
            setMinAgeDragOffset(leftIndent)
            updateMinAge(MIN_AGE_OFFSET)
        }
        else if (movePoint > leftIndent && movePoint <= (maxAgeDragOffset - handleSize)) {
            setMinAgeDragOffset(movePoint)
            updateMinAge(MIN_AGE_OFFSET + Math.floor((movePoint - leftIndent) / sliderSize * AGE_RANGE))
        }
    }


    const onRightHandleTouchMove = (e) => {
        let movePoint = e.touches[0].clientX
        let sliderWidth = sliderRef.current.offsetWidth

        // Calculating the range line size from the center of the handles, as if the handles are on the slider edges.
        const sliderSize = sliderWidth - handleSize

        // Distance betweewn start of the page from the left to the slider on 'X' axis 
        let leftIndent = sliderRef.current.getBoundingClientRect().left

        // Calculating the right boundary the right handle
        let rightBoundary = leftIndent + sliderSize

        // Checking if handle is dragged left beyond the left handle.
        if (movePoint <= minAgeDragOffset) {
            // Setting the left handle to be right after the right handle
            setMaxAgeDragOffset(minAgeDragOffset + handleSize)
            updateMaxAge(MAX_AGE_OFFSET + Math.floor((minAgeDragOffset - leftIndent) / sliderSize * AGE_RANGE))
        }

        else if (movePoint > minAgeDragOffset + handleSize && movePoint <= rightBoundary) {
            setMaxAgeDragOffset(movePoint)
            updateMaxAge(MAX_AGE_OFFSET + Math.floor((movePoint - leftIndent) / sliderSize * AGE_RANGE))
        }

    }

    return (
        <div className={classes['age-slider']} ref={sliderRef} style={ageSliderStyle}>
            <div className={classes['age-handle']} onTouchMove={onLeftHandleTouchMove} style={minAgeDragPointStyle}></div>
            <div className={classes['age-range']} style={rangeStyle}></div>
            <div className={`${classes['age-handle']}`} onTouchMove={onRightHandleTouchMove} style={maxAgeDragPointStyle}></div>
            <div className={classes['ages-container']}>
                <div className={classes['age-text']} style={minAgeTextStyle}>{minAge}</div>
                <div className={`${classes['age-text']} ${classes['max-age-text']}`} style={maxAgeTextStyle}>{maxAge}</div>
            </div>
        </div>
    )
}

export default AgeRangeSlider;