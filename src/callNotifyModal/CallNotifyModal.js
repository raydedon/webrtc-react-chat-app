import React from 'react'
import classes from './callNotifyModal.scss'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
    INCOMING,
    resetReceivingCallCallerSdp,
    resetReceivingCallFromCallerUserId,
    resetReceivingCallRequest,
    setCallType,
    setCommunicationPartnerUserId,
} from '../call/callActions'
import { push } from 'connected-react-router'
import { ringtoneSound } from '../call/Call'
import Avatar from 'react-avatar'

const CallNotifyModal = () => {
    const dispatch = useDispatch();
    const receivingCallRequest = !!useSelector((state) => state.call.receivingCallRequest);
    const receivingCallFromUserId = useSelector((state) => state.call.receivingCallFromUserId) ?? '';
    const users = useSelector((state) => state.userInfo.users) ?? [];
    const receivingCallFromUser = React.useMemo(() => users.find((user) => user.userName === receivingCallFromUserId), [receivingCallFromUserId])

    
    const onAccept = () => {
        dispatch(setCommunicationPartnerUserId(receivingCallFromUserId));
        dispatch(setCallType(INCOMING));
        dispatch(push('/call'));
        dispatch(resetReceivingCallRequest());
    }
    
    const onReject = () => {
        dispatch(resetReceivingCallRequest());
        ringtoneSound.unload();
        dispatch(resetReceivingCallFromCallerUserId());
        dispatch(resetReceivingCallCallerSdp());
        dispatch(resetReceivingCallRequest());
    }
    
    return (
        <Modal show={receivingCallRequest}
               onHide={() => dispatch(resetReceivingCallRequest())}
               backdrop="static"
               keyboard={false}>
            <Modal.Body>
                <div className={classes.container}>
                    <Avatar name={receivingCallFromUser?.name} size={40} round={true}/>
                    <div>Call from {receivingCallFromUser?.name}</div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onReject}>Reject</Button>
                <Button variant="primary" onClick={onAccept}>Accept</Button>
            </Modal.Footer>
        </Modal>

    );
}

export default CallNotifyModal;
