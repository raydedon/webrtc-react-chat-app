import React from 'react'
import classes from './leftNav.scss'
import UserList from './UserList'
import Avatar from 'react-avatar'

const LeftNav = () => {
    return (
        <div className={classes.container}>
            <div className={classes.selfProfileNav}>
                <Avatar name={'Animesh Ray'} size='40' round={true}/>
            </div>
            <div className={classes.userListWrapper}>
                <UserList/>
            </div>
        </div>
    );
}

export default LeftNav;
