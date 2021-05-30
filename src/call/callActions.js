import {
    RESET_COMMUNICATION_PARTNER,
    RESET_RECEIVING_CALL_FROM_CALLER_USERS_SDP,
    RESET_RECEIVING_CALL_FROM_USER,
    RESET_RECEIVING_CALL_REQUEST,
    SET_CALL_TYPE,
    SET_COMMUNICATION_PARTNER,
    SET_RECEIVING_CALL_FROM_CALLER_USERS_SDP,
    SET_RECEIVING_CALL_FROM_USER,
    SET_RECEIVING_CALL_REQUEST,
    SET_USER_BUSY_ON_CALL,
} from '../redux/commonAction'

export const INCOMING = 'INCOMING';
export const OUTGOING = 'OUTGOING';

export const setCommunicationPartnerUserId = (userName) => ({
    type: SET_COMMUNICATION_PARTNER,
    payload: {userName}
});

export const resetCommunicationPartnerUser = () => ({
    type: RESET_COMMUNICATION_PARTNER
});

export const setCallType = (type) => ({
    type: SET_CALL_TYPE,
    payload: {type}
});

export const setUserBusyOnCall = () => ({
    type: SET_USER_BUSY_ON_CALL
});

export const resetUserBusyOnCall = () => ({
    type: SET_USER_BUSY_ON_CALL
});

export const setReceivingCallRequest = () => ({
    type: SET_RECEIVING_CALL_REQUEST
});

export const resetReceivingCallRequest = () => ({
    type: RESET_RECEIVING_CALL_REQUEST
});

export const setReceivingCallFromCallerUserId = (userName) => ({
    type: SET_RECEIVING_CALL_FROM_USER,
    payload: {userName}
});

export const resetReceivingCallFromCallerUserId = () => ({
    type: RESET_RECEIVING_CALL_FROM_USER
});

export const setReceivingCallCallerSdp = (sdp) => ({
    type: SET_RECEIVING_CALL_FROM_CALLER_USERS_SDP,
    payload: {sdp}
});

export const resetReceivingCallCallerSdp = () => ({
    type: RESET_RECEIVING_CALL_FROM_CALLER_USERS_SDP
});
