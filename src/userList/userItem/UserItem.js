import React from 'react'
import classes from './userItem.scss'
import Avatar from 'react-avatar'

const UserItem = (props) => {
    const {user, size, setCurrentlyActivePartnerUser} = props;
    
    const onClickHandler = React.useCallback(() => {
        setCurrentlyActivePartnerUser(user);
    }, [user, setCurrentlyActivePartnerUser]);
    
    return (
        <div className={classes.container} {...setCurrentlyActivePartnerUser && {onClick: onClickHandler}}>
            <Avatar name={user?.name} size={size ?? 50} round={true}/>
            <div className={classes.userInfo}>{user?.name}</div>
        </div>
    );
}

export default UserItem;
