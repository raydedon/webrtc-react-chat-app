import React from 'react'
import classes from './chatBox.scss'
import UserItem from '../userList/userItem/UserItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faVideo } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    OUTGOING,
    setCallType,
    setCommunicationPartnerUserId,
} from '../call/callActions'

const ChatBox = () => {
    const dispatch = useDispatch();
    const currentlyActivePartnerUserId = useSelector((state) => state.userInfo.currentlyActivePartnerUserId) ?? '';
    const users = useSelector((state) => state.userInfo.users) ?? [];
    
    const currentlyActivePartnerUser = React.useMemo(() => users.find((user) => user.userName === currentlyActivePartnerUserId), [])

    const setCommunicationPartnerUser = React.useCallback(() => {
        dispatch(setCommunicationPartnerUserId(currentlyActivePartnerUserId));
        dispatch(setCallType(OUTGOING));
    }, [dispatch]);
    
    return (
        <div className={classes.wrapper}>
            <div className={classes.topNav}>
                <UserItem user={currentlyActivePartnerUser} size={40}/>
                <Link to='/call' onClick={setCommunicationPartnerUser}>
                    <FontAwesomeIcon icon={faVideo} size='1x'/>
                </Link>
                <Link to='/call' onClick={setCommunicationPartnerUser}>
                    <FontAwesomeIcon icon={faPhoneAlt} size='1x' />
                </Link>
            </div>
            <div className={classes.body}/>
            <div className={classes.footer}/>
        </div>
    );
}

export default ChatBox;

