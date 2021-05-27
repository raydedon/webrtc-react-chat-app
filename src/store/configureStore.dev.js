import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory();

export default function configureStore(initialState = {}) {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	const enhancer = composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)));

	return createStore(rootReducer(history), initialState, enhancer);
}
