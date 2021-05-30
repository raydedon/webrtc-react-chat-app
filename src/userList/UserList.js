import React from 'react'
import UserItem from './userItem/UserItem'
import classes from './userList.scss'
import { useSelector } from 'react-redux'

const UserList = (props) => {
    const users = useSelector((state) => state.userInfo.users) ?? [];

    return (
        <div className={classes.container}>
            {users.map(user => <UserItem key={user.userName} user={user} {...props}/>)}
        </div>
    )
}

export default UserList;
