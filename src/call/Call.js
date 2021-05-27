import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMicrophoneSlash,
    faPhoneSlash,
    faShareSquare,
    faVideo,
} from '@fortawesome/free-solid-svg-icons'
import classes from './call.scss'

const Call = () => {
    // const partnerVideo = React.createRef();
    // const userVideo = React.createRef();
    return (
        <div className={classes.container}>
            <Link to='/'><button type='button' className={classes.backBtn}>&#60;&#60;&nbsp;Back</button></Link>
            <div className={classes.partnerVideoContainer}>
                {/*<video className={classes.partnerVideo} playsinline ref={partnerVideo} autoPlay/>*/}
            </div>
            <div className={classes.userVideoContainer}>
                {/*<video className={classes.userVideo} playsinline muted ref={userVideo} autoPlay/>*/}
            </div>
            <div className={classes.controlsContainer}>
                <FontAwesomeIcon icon={faMicrophoneSlash} size='1x'/>
                <FontAwesomeIcon icon={faVideo} size='1x'/>
                <FontAwesomeIcon icon={faShareSquare} size='1x'/>
                <FontAwesomeIcon icon={faPhoneSlash} size='1x'/>
            </div>
        </div>
    )
}

export default Call;
