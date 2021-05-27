import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ChatLandingPage from './chatLandingPage/ChatLandingPage'
import Call from './call/Call'
import classes from './chatApp.scss'
import configureStore, { history } from './store/configureStore.dev'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
// import Peer from "simple-peer";
import socket from './config/socketConfig'
import { setUserList, setYourSelf } from './redux/commonAction'

const store = configureStore();
socket.on("yourID", (user) => {
    console.info(`yourId: ${user.id}`);
    store.dispatch(setYourSelf(user.userName, user.name));
})

socket.on("allUsers", (users) => {
    console.dir(users);
    store.dispatch(setUserList(Object.keys(users ?? {}).filter(userName => userName !== store.getState().userInfo.user.id).map(userName => ({
        id: userName,
        name: users[userName].name
    }))));
})


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
