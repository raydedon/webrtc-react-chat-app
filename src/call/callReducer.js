import { START_CALL } from './callActions'

const initialState = {userBusyOnCall: false};

const call = (state = initialState, action) => {
    let {type} = action;
    switch(type) {
    case START_CALL:
        return {userBusyOnCall: true};
    default:
        return state;
    }
};

export default call;
