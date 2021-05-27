import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ChatLandingPage from './chatLandingPage/ChatLandingPage'
import Call from './call/Call'
import classes from './chatApp.scss'
import configureStore, { history } from './store/configureStore'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'

const store = configureStore();


const ChatApp = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div className={classes.container}>
                    <Switch>
                        <Route path="/call">
                            <Call/>
                        </Route>
                        <Route path="/">
                            <ChatLandingPage/>
                        </Route>
                    </Switch>
                </div>
            </ConnectedRouter>
        </Provider>
    )
}

export default ChatApp;
