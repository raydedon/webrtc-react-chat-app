import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ChatLandingPage from './chatLandingPage/ChatLandingPage'
import Call, { ringtoneSound } from './call/Call'
import classes from './chatApp.scss'
import configureStore, { history } from './store/configureStore.dev'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
// import Peer from "simple-peer";
import socket from './config/socketConfig'
import { setUserList, setYourSelf } from './redux/commonAction'
import {
    setReceivingCallCallerSdp,
    setReceivingCallFromCallerUserId,
    setReceivingCallRequest,
} from './call/callActions'

const store = configureStore();
socket.on("yourID", (user) => {
    console.info(`yourId: ${user.userName}`);
    store.dispatch(setYourSelf(user));
});

socket.on("allUsers", (users) => {
    console.dir(users);
    store.dispatch(setUserList(Object.values(users ?? {}).filter(({userName}) => userName !== store.getState().userInfo.user.userName).map(user => user)));
});

socket.on("hey", (data) => {
    const state = store.getState();
    if (state.call.userBusyOnCall) return;
    store.dispatch(setReceivingCallRequest());
    ringtoneSound.play();
    store.dispatch(setReceivingCallFromCallerUserId(data.from));
    store.dispatch(setReceivingCallCallerSdp(data.signal));
});



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
