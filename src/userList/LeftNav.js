import React from 'react'
import classes from './leftNav.scss'
import UserList from './UserList'
import { useSelector } from 'react-redux'
import UserItem from './userItem/UserItem'

const LeftNav = () => {
    const user = useSelector((state) => state.userInfo.user) ?? {};
    return (
        <div className={classes.container}>
            <div className={classes.selfProfileNav}>
                <UserItem user={user} size='40'/>
            </div>
            <div className={classes.userListWrapper}>
                <UserList/>
            </div>
        </div>
    );
}

export default LeftNav;
