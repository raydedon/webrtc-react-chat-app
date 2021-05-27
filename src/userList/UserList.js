import React from 'react'
import UserItem from './userItem/UserItem'
import classes from './userList.scss'

const UserList = () => {
    const users = [{name: 'Soma Nayek', userName: 'soma'}, {name: 'Sumon Nayek', userName: 'sumon'}]

    return (
        <div className={classes.container}>
            {users.map(user => <UserItem key={user.userName} user={user}/>)}
        </div>
    )
}

export default UserList;
