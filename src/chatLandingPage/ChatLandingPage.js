import React from 'react'
import classes from './chatLandingPage.scss'
import LeftNav from '../userList/LeftNav'
import ChatBox from '../chatBox/ChatBox'

const ChatLandingPage = () => {
    return (
        <div className={classes.chatContainer}>
            <LeftNav/>
            <ChatBox/>
        </div>
    )
}

export default ChatLandingPage;
