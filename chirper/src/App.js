import * as React from "react"
import Login from "./components/login"
import MainPage from "./components/mainPage";
import SignUp from "./components/signUp";
import Navbar from "./components/navbar";
import {Switch} from "react-router-dom";
import Chat from "./components/chat";
import Profile from "./components/profile";
import {Route, Redirect} from 'react-router'
import { isExpired, decodeToken  } from "react-jwt";

function App() {

    let $auth = {
        isLoggedIn: function () {
            if (isExpired(localStorage.getItem('token')) || !decodeToken(localStorage.getItem('token'))) {
                return false;
            } else {
                return true;
            }
        }
    };

    return (
        <div className="mainBackground">
            <div>
                <Route path="/" exact component={Navbar}/>
                <Route path="/" exact component={MainPage}/>
                <Route path="/" exact component={Chat}/>
                <Route path="/profile" exact component={Navbar}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/profile" exact component={Chat}/>


                <Route exact path="/" render={() => (
                    $auth.isLoggedIn() ? (
                        <Redirect to="/"/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                )}/>
            </div>

            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/signUp" exact component={SignUp}/>
            </Switch>
        </div>
    )
}

export default App;