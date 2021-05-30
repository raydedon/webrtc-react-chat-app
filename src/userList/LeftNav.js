import React from 'react'
import classes from './leftNav.scss'
import UserList from './UserList'
import { useDispatch, useSelector } from 'react-redux'
import UserItem from './userItem/UserItem'
import { setCurrentlyActivePartnerUserId } from '../redux/commonAction'

const LeftNav = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userInfo.user) ?? {};
    
    const setCurrentlyActivePartnerUser = React.useCallback((user) => dispatch(setCurrentlyActivePartnerUserId(user.userName)), []);
    
    return (
        <div className={classes.container}>
            <div className={classes.selfProfileNav}>
                <UserItem user={user} size='40'/>
            </div>
            <div className={classes.userListWrapper}>
                <UserList setCurrentlyActivePartnerUser={setCurrentlyActivePartnerUser}/>
            </div>
        </div>
    );
}

export default LeftNav;
