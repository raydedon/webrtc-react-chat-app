import { combineReducers } from 'redux'
import call from '../call/Call'
import { connectRouter } from 'connected-react-router'

const rootReducer = (history) => combineReducers({
    router: connectRouter(history),
    call
});

export default rootReducer;
