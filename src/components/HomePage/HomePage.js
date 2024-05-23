import React, { useState, useEffect } from 'react'
import Navbar from './Navbar/Navbar'
import MatchImage from './MatchImage/MatchImage'
import ActionButton from './ActionButton/ActionButton'
import classes from './HomePage.module.css'
import NavigationFooter from '../NavigationFooter/NavigationFooter'
import { AiFillHeart, AiOutlineClose } from 'react-icons/ai'
import FilterModal from '../FilterModal/FilterModal'
import { postLikeAction } from '../../services/api-services/likesService'
import { getFilteredMatches } from '../../services/api-services/matchesService'
import { postDislikeAction } from '../../services/api-services/dislikeService'


const HomePage = ({ userId, filters, onFiltersUpdate }) => {
    const [isLikeActionClicked, setIsLikeActionClicked] = useState(false)
    const [isDislikeActionClicked, setIsDisikeActionClicked] = useState(false)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [datingOptions, setDatingOptions] = useState([]);

    let pageContainerClasses = classes['homepage-container']

    if (isFilterModalOpen) {
        pageContainerClasses = `${classes['homepage-container']} ${classes['filter-modal-open']}`
    }

    useEffect(() => {
        const fetchData = async () => {
            const { minAge, maxAge, distance, gender } = filters

            try {
                if(userId) {
                    const result = await getFilteredMatches(userId, minAge, maxAge, distance, gender)
                    setDatingOptions(result);
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchData();
    }, [filters, userId])

const likeActionHandler = () => { 
    const { id, name, age } = datingOptions[0]
    const likedMatchPayload = {
        matchId: id,
        userId,
        name,
        age
    }

    postLikeAction(likedMatchPayload)
    removeMatchFromDatingOptions()
}

const dislikeActionHandler = () => {
    removeMatchFromDatingOptions()

    const { id } = datingOptions[0]
    const dislikePayload = {
        matchId: id,
        userId
    }

    postDislikeAction(dislikePayload)
}

const removeMatchFromDatingOptions = () => {
    let datingOptionsCopy = [...datingOptions]
    datingOptionsCopy.shift()
    setDatingOptions(datingOptionsCopy);
}

const handleLikeClick = () => {
    setIsLikeActionClicked(true)
    setTimeout(() => {
        setIsLikeActionClicked(false)
        likeActionHandler()
    }, 500)
}

const handleDislikeClick = () => {

    setIsDisikeActionClicked(true)
    setTimeout(() => {
        setIsDisikeActionClicked(false)
        dislikeActionHandler()
    }, 500)
}

const openFilterModal = () => {
    setIsFilterModalOpen(true)
}

const closeFilterModal = () => {
    setIsFilterModalOpen(false)
}

const updateFiltersHandler = (filters) => {
    onFiltersUpdate(filters)
    closeFilterModal()
}

let content = <h1 className={classes['no-matches-title']}>You Reviewd all available matches. Come back later </h1>

if (datingOptions.length === 1) {
    content = (
        <MatchImage
            matchObj={datingOptions[0]}
            likeHandler={likeActionHandler}
            dislikeHandler={dislikeActionHandler}
            isLikeActionClicked={isLikeActionClicked}
            isDislikeActionClicked={isDislikeActionClicked}
        />
    )
}

else if (datingOptions.length > 1) {
    content = (
        <MatchImage
            matchObj={datingOptions[0]}
            backgroundMatchObj={datingOptions[1]}
            likeHandler={likeActionHandler}
            dislikeHandler={dislikeActionHandler}
            isLikeActionClicked={isLikeActionClicked}
            isDislikeActionClicked={isDislikeActionClicked}
        />
    )
}

return (
    <>
        {isFilterModalOpen && (
            <>
                <div className={classes['modal-background']} onClick={closeFilterModal} ></div>
                <FilterModal filters={filters} updateFiltersHandler={updateFiltersHandler} closeFilterModal={closeFilterModal} />
            </>
        )}
        <div className={pageContainerClasses}>
            <Navbar openFilterModal={openFilterModal} />
            {content}
            {datingOptions.length > 0 &&
                <div className={classes['action-buttons-wrapper']}>
                    <ActionButton
                        className={classes['dislike-action-button']}
                        IconComponent={AiOutlineClose}
                        handleActionClick={handleDislikeClick}
                    />
                    <ActionButton
                        className={classes['like-action-button']}
                        IconComponent={AiFillHeart}
                        handleActionClick={handleLikeClick}
                    />
                </div>
            }
            <NavigationFooter />
        </div>
    </>
)
}

export default HomePage;
