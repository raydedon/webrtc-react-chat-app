import React from 'react'
import { useSelector } from 'react-redux'
import classes from './welcome.scss'

const WelcomeBox = () => {
    const user = useSelector((state) => state.userInfo.user) ?? '';
    
    return (
        <div className={classes.container}>Hi Welcome, {user.name} </div>
    )
    
}

export default WelcomeBox;
