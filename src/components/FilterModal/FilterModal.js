import classes from './FilterModal.module.css'
import {AiOutlineArrowLeft, AiOutlineCheck} from 'react-icons/ai'
import React from 'react'
import Modal from '../HomePage/Modal/Modal'
import Dropdown from '../Dropdown/Dropdown'
import { useState } from 'react'
import AgeRangeSlider from '../AgeRangeSlider/AgeRangeSlider'

const distanceOptions = [
    {display: '10km', value: 10},
    {display: '20km', value: 20},
    {display: '30km', value: 30},
    {display: '40km', value: 40}
]

const FilterModal = ({filters, updateFiltersHandler, closeFilterModal}) => {
    // Update state to be back in home page 
    const [distance, setDistance] = useState(filters.distance)
    const [gender, setGender] = useState(filters.gender)
    const [tempMinAge, setTempMinAge] = useState(filters.minAge)
    const [tempMaxAge, setTempMaxAge] = useState(filters.maxAge)
    const [isDistanceDropDownOpen, setIsDistanceDropdownOpen] = useState('')

    const handleDistanceSelect = (value) => {
        setDistance(value)
    }

    const onGenderClick = (value) => {
        setGender(value)
    }
    
    const handleToggleDistanceDropdown = () => {
        setIsDistanceDropdownOpen(prevState => !prevState) 
    }

    const onFiltersSubmit = () => {
        filters = {
            ...filters,
            distance,
            gender,
            minAge: tempMinAge,
            maxAge: tempMaxAge
        }

        updateFiltersHandler(filters)
        closeFilterModal()
    }

    return (
        <Modal className={classes.container}>
            <div className={classes.headline}>
                <AiOutlineArrowLeft className={classes['headline-icon']} onClick={closeFilterModal}/>
                <h3>Filter</h3>
                <AiOutlineCheck className={classes['headline-icon']} onClick={onFiltersSubmit}/>
            </div>
            <div className={classes.filters}>
                <h4 className={classes['filter-title']}>Distance</h4>
                <Dropdown
                    className={classes['distance-options']} 
                    togglerClassName={classes['distance-dropdown-toggler']}
                    isOpen={isDistanceDropDownOpen}
                    toggleDropdown={handleToggleDistanceDropdown}
                    options={distanceOptions}
                    value={distance}
                    onSelect={handleDistanceSelect}
                />
                <div className={classes['gender-container']}>
                    <div 
                        className={`${classes.gender} ${gender === 'Male' && classes['active-gender-option']}`}
                        onClick={() => onGenderClick('Male')}
                    >
                        Male
                    </div>
                    <div 
                        className={`${classes.gender} ${gender === 'Female' && classes['active-gender-option']}`} 
                        onClick={() => onGenderClick('Female')}
                    >
                        Female
                    </div>
                </div>
                <AgeRangeSlider minAge={tempMinAge} maxAge={tempMaxAge} updateMinAge={setTempMinAge} updateMaxAge={setTempMaxAge}/>
            </div>
        </Modal>        
    )    
}

export default FilterModal;