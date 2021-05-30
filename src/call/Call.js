import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faMicrophoneSlash,
    faPhoneSlash,
    faShareSquare,
    faVideo,
} from '@fortawesome/free-solid-svg-icons'
import classes from './call.scss'
import Peer from 'simple-peer'
import socket from '../config/socketConfig'
import { useDispatch, useSelector } from 'react-redux'
import {
    OUTGOING,
    resetCommunicationPartnerUser,
    resetUserBusyOnCall,
    setUserBusyOnCall,
} from './callActions'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Howl } from 'howler'
import ringtone from '../sounds/ringtone.mp3'
import { push } from 'connected-react-router'

export const ringtoneSound = new Howl({
    src: [ringtone],
    loop: true,
    preload: true
})

const Call = () => {
    const dispatch = useDispatch();
    const partnerVideo = useRef();
    const userVideo = useRef();
    const myPeer = useRef();
    const [stream, setStream] = useState();
    const [modalVisible, toggleModal] = useState(false);
    const [modalMsg, setModalMsg] = useState();
    const user = useSelector((state) => state.userInfo.user) ?? '';
    const communicationPartnerUserId = useSelector((state) => state.call.communicationPartnerUserId) ?? '';
    const callType = useSelector((state) => state.call.callType) ?? OUTGOING;
    const receivingCallFromCallerUsersSdp = useSelector((state) => state.call.receivingCallFromCallerUsersSdp);
    const userBusyOnCall = useSelector((state) => state.call.userBusyOnCall) ?? false
    
    useEffect(() => {
        if(!communicationPartnerUserId) {
            dispatch(push('/'));
            return;
        }
        if (callType === OUTGOING) {
            callPeer();
        } else {
            acceptCall();
        }
        return () => {
            endCall();
        }
    }, []);
    
    const callPeer = () => {
        const onSuccessMedia = (stream) => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
            const peer = new Peer({
                initiator: true,
                trickle: false,
/*
                config: {
                    iceServers: [
                        // {
                        //     urls: "stun:numb.viagenie.ca",
                        //     username: "sultan1640@gmail.com",
                        //     credential: "98376683"
                        // },
                        // {
                        //     urls: "turn:numb.viagenie.ca",
                        //     username: "sultan1640@gmail.com",
                        //     credential: "98376683"
                        // }
                        {url:'stun:stun01.sipphone.com'},
                        {url:'stun:stun.ekiga.net'},
                        {url:'stun:stun.fwdnet.net'},
                        {url:'stun:stun.ideasip.com'},
                        {url:'stun:stun.iptel.org'},
                        {url:'stun:stun.rixtelecom.se'},
                        {url:'stun:stun.schlund.de'},
                        {url:'stun:stun.l.google.com:19302'},
                        {url:'stun:stun1.l.google.com:19302'},
                        {url:'stun:stun2.l.google.com:19302'},
                        {url:'stun:stun3.l.google.com:19302'},
                        {url:'stun:stun4.l.google.com:19302'},
                        {url:'stun:stunserver.org'},
                        {url:'stun:stun.softjoys.com'},
                        {url:'stun:stun.voiparound.com'},
                        {url:'stun:stun.voipbuster.com'},
                        {url:'stun:stun.voipstunt.com'},
                        {url:'stun:stun.voxgratia.org'},
                        {url:'stun:stun.xten.com'},
                        {
                            url: 'turn:numb.viagenie.ca',
                            credential: 'muazkh',
                            username: 'webrtc@live.com'
                        },
                        {
                            url: 'turn:192.158.29.39:3478?transport=udp',
                            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                            username: '28224511:1379330808'
                        },
                        {
                            url: 'turn:192.158.29.39:3478?transport=tcp',
                            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                            username: '28224511:1379330808'
                        }
                    ]
                },
*/
                stream: stream,
            });
    
            myPeer.current = peer;
    
            peer.on("signal", data => {
                socket.emit("callUser", { userToCall: communicationPartnerUserId, signalData: data, from: user.userName })
            })
    
            peer.on("stream", stream => {
                if (partnerVideo.current) {
                    partnerVideo.current.srcObject = stream;
                }
            });
    
            peer.on('error', ()=>{
                endCall()
            })
    
            socket.on("callAccepted", signal => {
                dispatch(setUserBusyOnCall());
                // setCallAccepted(true);
                peer.signal(signal);
            })
    
            socket.on('close', ()=>{
                endCallWoSocket();
            })
    
            socket.on('rejected', ()=>{
                dispatch(resetUserBusyOnCall());
                dispatch(push('/'));
            })
        }
        
        const onFailureMedia = () => {
            setModalMsg('You cannot place/ receive a call without granting video and audio permissions! Please change your settings to use Cuckoo.');
            toggleModal(!modalVisible);
        }
        
        navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({  audio: true, video: true })
                .then(onSuccessMedia)
                .catch(onFailureMedia);
        }
        else {
            navigator.getWebcam({ audio: true, video: true }, onSuccessMedia, onFailureMedia);
        }
    }
    
    const endCall = () => {
        socket.emit('close',{to: communicationPartnerUserId});
        endCallWoSocket();
    }
    
    const endCallWoSocket = () => {
        myPeer.current && myPeer.current.destroy();
        stream?.getTracks?.()?.forEach(track => {
            if(track.readyState === 'live') track.stop();
        });
        dispatch(resetUserBusyOnCall());
        dispatch(resetCommunicationPartnerUser());
        dispatch(push('/'));
    }
    
    const acceptCall = () => {
        ringtoneSound.unload();
        
        const onSuccessMedia = (stream) => {
            setStream(stream);
            if (userVideo.current) {
                userVideo.current.srcObject = stream;
            }
            dispatch(setUserBusyOnCall());
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: stream
            });
    
            myPeer.current = peer;
    
            peer.on("signal", data => {
                socket.emit("acceptCall", { signal: data, to: communicationPartnerUserId })
            })
    
            peer.on("stream", stream => {
                partnerVideo.current.srcObject = stream;
            });
    
            peer.on('error', ()=>{
                endCall()
            })
    
            peer.signal(receivingCallFromCallerUsersSdp);
    
            socket.on('close', ()=>{
                endCallWoSocket();
            })
        };
        
        const onFailureMedia = () => {
            setModalMsg('You cannot place/ receive a call without granting video and audio permissions! Please change your settings to use Cuckoo.')
            toggleModal(!modalVisible);
        }
    
        navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        if (navigator?.mediaDevices?.getUserMedia) {
            navigator.mediaDevices.getUserMedia({  audio: true, video: true })
                .then(onSuccessMedia)
                .catch(onFailureMedia);
        }
        else {
            navigator.getWebcam({ audio: true, video: true }, onSuccessMedia, onFailureMedia);
        }
    }
    
    const closeModal = () => toggleModal(!modalVisible);
    
    return (
        <div className={classes.container}>
            <Link to='/'><button type='button' className={classes.backBtn}>&#60;&#60;&nbsp;Back</button></Link>
            <div className={classes.partnerVideoContainer}>
                {userBusyOnCall && <video className={classes.partnerVideo} ref={partnerVideo} autoPlay/>}
            </div>
            <div className={classes.userVideoContainer}>
                {stream && <video className={classes.userVideo} muted ref={userVideo} autoPlay/>}
            </div>
            <div className={classes.controlsContainer}>
                <FontAwesomeIcon icon={faMicrophoneSlash} size='1x' className={classes.icons}/>
                <FontAwesomeIcon icon={faVideo} size='1x' className={classes.icons}/>
                <FontAwesomeIcon icon={faShareSquare} size='1x' className={classes.icons}/>
                <FontAwesomeIcon icon={faPhoneSlash} size='1x' className={classes.icons} onClick={endCall}/>
            </div>
            <Modal show={modalVisible}
                   onHide={closeModal}
                   backdrop="static"
                   keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMsg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Call;
