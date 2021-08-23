import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from "redux";
import {Provider} from "react-redux"

const initialState = {
    userNickname: 'nickname'
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SAVE_USER_NICKNAME":
            return {
                ...state,
                userNickname: action.payload
            }
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