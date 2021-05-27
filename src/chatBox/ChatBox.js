import React from 'react'
import classes from './chatBox.scss'
import UserItem from '../userList/userItem/UserItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faVideo } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const ChatBox = () => {
    const activeUser = {name: 'Soma Nayek'};
    return (
        <div className={classes.wrapper}>
            <div className={classes.topNav}>
                <UserItem user={activeUser} size={40}/>
                <Link to='/call'>
                    <FontAwesomeIcon icon={faVideo} size='1x'/>
                </Link>
                <Link to='/call'>
                    <FontAwesomeIcon icon={faPhoneAlt} size='1x' />
                </Link>
            </div>
            <div className={classes.body}/>
            <div className={classes.footer}/>
        </div>
    );
}

export default ChatBox;

