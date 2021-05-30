import React from 'react'
import classes from './chatLandingPage.scss'
import LeftNav from '../userList/LeftNav'
import ChatBox from '../chatBox/ChatBox'
import { useSelector } from 'react-redux'
import WelcomeBox from '../welcomeBox/WelcomeBox'
import CallNotifyModal from '../callNotifyModal/CallNotifyModal'

const ChatLandingPage = () => {
    const isCurrentlyActivePartnerChosen = !!(useSelector((state) => state.userInfo.currentlyActivePartnerUserId) ?? '');
    return (
        <div className={classes.chatContainer}>
            <LeftNav/>
            {isCurrentlyActivePartnerChosen ? <ChatBox/> : <WelcomeBox/>}
            <CallNotifyModal/>
        </div>
    )
}

export default ChatLandingPage;
