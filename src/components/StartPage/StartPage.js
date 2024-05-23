import React from 'react'
import classes from './StartPage.module.css'
import { Link , useNavigate} from 'react-router-dom'
import Logo from '../Logo/Logo'

const StartPage = () => {
    const navigate = useNavigate()

    const onClick = () => {
        navigate('/signup')
    }
    
    return (
        <div className={classes.wrapper}>
            <div className={classes.logo}>
                <Logo />
            </div>
            <div className={classes['paragraph-wrapper']}>
                <p className={classes.paragraph}>
                    By clicking log in you agree to our <span><Link to='/terms' className={classes.link}>Terms</Link></span> Learn how we process your data in our  <Link to='/privacy' className={classes.link}>Privacy policy</Link>
                </p>
            </div>
            <div className={classes.bottom}>
                <button onClick={onClick} className={classes['create-account']}>Create an account</button> 
                <p className={classes['sign-in']}>
                    Already have an account? <Link to='/login' className={classes.link}>Sign in</Link>
                </p>
            </div>
        </div>
    ) 
}

export default StartPage;