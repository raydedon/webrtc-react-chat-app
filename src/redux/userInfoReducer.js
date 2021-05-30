import {
    SET_CURRENTLY_ACTIVE_PARTNER,
    SET_USER_LIST,
    SET_YOUR_SELF,
} from './commonAction'

const initialState = {
    user: {
        id: '',
        name: ''
    },
    users: [],
    currentlyActivePartnerUserId: ''
};

const userInfo = (state = initialState, action) => {
    let {type, payload} = action;
    switch(type) {
    case SET_YOUR_SELF:
        return {...state, user: {...payload.user}};
    case SET_USER_LIST:
        return {...state, ...payload};
    case SET_CURRENTLY_ACTIVE_PARTNER:
        return {...state, currentlyActivePartnerUserId: payload.userName};
    default:
        return state;
    }
};

export default userInfo;
