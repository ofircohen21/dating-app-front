import React, { useState } from "react";
import classes from './SignUpPage.module.css'
import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import DropdownToggler from "../Dropdown/DropdownToggler/DropdownToggler";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { registerUser } from "../../services/api-services/usersService";

const genderOptions = [
    { display: 'Male', value: 'male' },
    { display: 'Female', value: 'female' },
]

const SignUpPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false)
    const [birthDate, setBirthDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate();

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
    }

    const handleUserNameChange = (event) => {
        setUserName(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    
    const handleGenderSelect = (value) => {
        setGender(value)
    }

    const handleToggleGenderDropdown = () => {
        // Only one dropdown menu opens at a time
        if (showCalendar) {
            setShowCalendar(false)
        }
    
        setIsGenderDropdownOpen(prevState => !prevState)
    }

    const handleBirthDateChange = (date) => {
        const month = date.getMonth() + 1
        const calendarDay = date.getDate()
        const year = date.getFullYear()

        setBirthDate(`${month}/${calendarDay}/${year}`)
        setShowCalendar(false)
    }

    const handleBirthDateTogglerClick = () => {
        // Only one dropdown menu opens at a time
        if (isGenderDropdownOpen) {
            setIsGenderDropdownOpen(false)
        }
        setShowCalendar((prevShowCalendar => !prevShowCalendar))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()


        if (firstName && lastName && userName && gender && birthDate && password) {

            const payload = {
                firstName,
                lastName,
                userName,
                password,
                gender,
                birthDate
            }

            try {
                await registerUser(payload)
                navigate('/login')
            } catch (error) {
                setErrorMessage(error.message)
            }
        }
        else {
            setErrorMessage('Please enter all fields and try again.')
        }
    }


    return (
        <div>
            <form className={classes.form}>
                <h2 className={classes.title}>Sign Up</h2>
                <Input className={classes.input} type='text' placeHolder='First Name *' value={firstName} onChange={handleFirstNameChange} />
                <Input className={classes.input} type='text' placeHolder='Last Name *' value={lastName} onChange={handleLastNameChange} />
                <Input className={classes.input} type='text' placeHolder='User Name *' value={userName} onChange={handleUserNameChange} />
                <Input className={classes.input} type='password' placeHolder='Password *' onChange={handlePasswordChange} />
                <Dropdown
                    className={classes['gender-dropdown']}
                    togglerClassName={classes.input}
                    isOpen={isGenderDropdownOpen}
                    toggleDropdown={handleToggleGenderDropdown}
                    options={genderOptions}
                    placeholder='Gender *'
                    value={gender}
                    onSelect={handleGenderSelect}
                />
                <DropdownToggler
                    className={classes.input}
                    placeholder='MM/DD/YYYY *'
                    value={birthDate}
                    onClick={handleBirthDateTogglerClick}
                />
                {showCalendar && <Calendar onChange={handleBirthDateChange} value={birthDate} />}
                {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                <button onClick={handleFormSubmit} className={classes['signup-button']}>SIGN UP</button>
                <div className={classes['login-link']}>Already have an account? <Link to='/login'>Sign in now</Link></div>
            </form>
        </div>
    )
}

export default SignUpPage;