import React, { useState } from "react";
import classes from './LoginPage.module.css'
import Input from "../Input/Input";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../Logo/Logo"
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { login } from "../../services/api-services/authService";

const LoginPage = ({ onLogin }) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate();

    const handleUserNameChange = (event) => {
        setUserName(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const loginToApp = async () => {
            const payload = JSON.stringify({
                userName,
                password
            })

            const response = await login(payload)
            if (response) {
                onLogin(response)
                navigate('/home')
            }
        }

        if (userName && password) {
            try {
                await loginToApp()
            } catch (error) {
                setErrorMessage(error.message)
            }
        }
        else {
            setErrorMessage('Missing Username or Password')
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.logo}>
                <Logo />
            </div>
            <form className={classes.form}>
                <h2 className={classes.title}>Login</h2>
                <Input placeHolder='User Name *' value={userName} onChange={handleUserNameChange} className={classes.input} />
                <Input placeHolder='Password *' type='password' onChange={handlePasswordChange} className={classes.input} />
                {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
                <button onClick={handleFormSubmit} className={classes['login-button']}>LOGIN</button>
                <div className={classes['sign-up-link']}>Don't have an account? <Link to='/signup'>Sign up now</Link></div>
            </form>
        </div>
    )
}

export default LoginPage;