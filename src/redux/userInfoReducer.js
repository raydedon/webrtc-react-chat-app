import { SET_USER_LIST, SET_YOUR_SELF } from './commonAction'

const initialState = {};

const userInfo = (state = initialState, action) => {
    let {type, payload} = action;
    switch(type) {
    case SET_YOUR_SELF:
        return {...state, user: {...payload}};
    case SET_USER_LIST:
        return {...state, ...payload};
    default:
        return state;
    }
};

export default userInfo;
