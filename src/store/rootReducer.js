import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import call from '../call/callReducer'
import userInfo from '../redux/userInfoReducer'

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    call,
    userInfo
});

export default rootReducer;
