import React, { useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai"
import Input from "../Input/Input"
import classes from './EditProfile.module.css'
import Dropdown from "../Dropdown/Dropdown"
import ErrorMessage from "../ErrorMessage/ErrorMessage"

const genderOptions = [
    { display: 'Male', value: 'male' },
    { display: 'Female', value: 'female' },
]

const EditProfile = ({ userData, onEditClose, onSubmit }) => {
    const [tempData, setTempData] = useState(userData)
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false)
    const gender = tempData['gender']
    const [errorMessage, setErrorMessage] = useState('')

    const onChange = (fieldName, newValue) => {
        let dataCopy = { ...tempData }
        dataCopy[fieldName] = newValue
        setTempData(dataCopy)
    }

    const handleGenderSelect = (value) => {
        onChange('gender', value)
    }

    const handleToggleGenderDropdown = () => {
        setIsGenderDropdownOpen(prevState => !prevState)
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!tempData.name) {
            setErrorMessage('Please enter name and try again.')
        } else {
            if (errorMessage) {
                setErrorMessage('')
            }
            onSubmit(tempData)
        }
    }

    return (
        <div>
            <div className={classes.headline}>
                <AiOutlineArrowLeft className={classes['arrow-button']} onClick={onEditClose} />
                <h3 className={classes.title}>Edit</h3>
            </div>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.field}>
                    <div className={classes['field-title']}>Name</div>
                    <Input className={classes.input} value={tempData['name']} onChange={(e) => onChange('name', e.target.value)} />
                </div>
                <div className={classes.field}>
                    <div className={classes['field-title']}>Gender</div>
                    <Dropdown
                        className={classes.dropdown}
                        togglerClassName={classes.input}
                        isOpen={isGenderDropdownOpen}
                        toggleDropdown={handleToggleGenderDropdown}
                        options={genderOptions}
                        value={gender}
                        onSelect={handleGenderSelect}
                    />
                </div>
                {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                <button className={classes['save-button']}>SAVE</button>
            </form>
        </div>
    )
}

export default EditProfile;