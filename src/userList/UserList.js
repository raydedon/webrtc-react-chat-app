import React from 'react'
import UserItem from './userItem/UserItem'
import classes from './userList.scss'
import { useSelector } from 'react-redux'

const UserList = () => {
    const users = useSelector((state) => state.userInfo.users) ?? [];

    return (
        <div className={classes.container}>
            {users.map(user => <UserItem key={user.id} user={user}/>)}
        </div>
    )
}

export default UserList;
