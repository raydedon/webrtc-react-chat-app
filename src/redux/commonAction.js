export const SET_YOUR_SELF = 'SET_YOUR_SELF';
export const SET_USER_LIST = 'SET_USER_LIST';

export const setYourSelf = (id, name) => ({
    type: SET_YOUR_SELF,
    payload: {
        id,
        name
    }
});

export const setUserList = (users) => ({
    type: SET_USER_LIST,
    payload: {users}
});
