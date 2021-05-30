import {
    RESET_COMMUNICATION_PARTNER,
    RESET_RECEIVING_CALL_FROM_CALLER_USERS_SDP,
    RESET_RECEIVING_CALL_FROM_USER,
    RESET_RECEIVING_CALL_REQUEST,
    RESET_USER_BUSY_ON_CALL,
    SET_CALL_TYPE,
    SET_COMMUNICATION_PARTNER,
    SET_RECEIVING_CALL_FROM_CALLER_USERS_SDP,
    SET_RECEIVING_CALL_FROM_USER,
    SET_RECEIVING_CALL_REQUEST,
    SET_USER_BUSY_ON_CALL,
} from '../redux/commonAction'

const initialState = {
    communicationPartnerUserId: '',
    callType: '',
    userBusyOnCall: false,
    receivingCallRequest: false,
    receivingCallFromUserId: '',
    receivingCallFromCallerUsersSdp: null
};

const call = (state = initialState, action) => {
    let {type, payload} = action;
    switch(type) {
    case SET_COMMUNICATION_PARTNER:
        return {...state, communicationPartnerUserId: payload.userName};
    case RESET_COMMUNICATION_PARTNER: {
        const { communicationPartnerUserId, ...rest } = state;
        return rest;
    }
    case SET_CALL_TYPE:
        return {...state, callType: payload.type};
    case SET_USER_BUSY_ON_CALL:
        return {...state, userBusyOnCall: true};
    case RESET_USER_BUSY_ON_CALL:
        return {...state, userBusyOnCall: false};
    case SET_RECEIVING_CALL_REQUEST:
        return {...state, receivingCallRequest: true};
    case RESET_RECEIVING_CALL_REQUEST:
        return {...state, receivingCallRequest: false};
    case SET_RECEIVING_CALL_FROM_USER:
        return {...state, receivingCallFromUserId: payload.userName};
    case RESET_RECEIVING_CALL_FROM_USER: {
        const { receivingCallFromUserId, ...rest } = state;
        return rest;
    }
    case SET_RECEIVING_CALL_FROM_CALLER_USERS_SDP:
        return {...state, receivingCallFromCallerUsersSdp: payload.sdp};
    case RESET_RECEIVING_CALL_FROM_CALLER_USERS_SDP: {
        const { receivingCallFromCallerUsersSdp, ...rest } = state;
        return rest;
    }
    default:
        return state;
    }
};

export default call;
