import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from "redux";
import {Provider} from "react-redux"

const initialState = {
    userNickname: 'pablo'
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "GET_USER_NICKNAME":
            return state.userNickname
        default:
            return state;
    }
}

const store = createStore(reducer)


ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
