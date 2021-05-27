import React from 'react'
import classes from './userItem.scss'
import Avatar from 'react-avatar'

const UserItem = (props) => {
    const {user, size} = props;
    return (
        <div className={classes.container}>
            <Avatar name={user?.name} size={size ?? 50} round={true}/>
            <div className={classes.userInfo}>{user?.name}</div>
        </div>
    );
}

export default UserItem;
