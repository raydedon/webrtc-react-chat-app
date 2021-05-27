import React from 'react'
import classes from './userItem.scss'
import Avatar from 'react-avatar'

const UserItem = (props) => {
    const {user: {name}, size} = props;
    return (
        <div className={classes.container}>
            <Avatar name={name} size={size ?? 50} round={true}/>
            <div className={classes.userInfo}>{name}</div>
        </div>
    );
}

export default UserItem;
