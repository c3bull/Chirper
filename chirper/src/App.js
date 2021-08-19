import * as React from "react"
import Login from "./components/login"
import MainPage from "./components/mainPage";
import SignIn from "./components/signIn";
import Navbar from "./components/navbar";
import {Switch} from "react-router-dom";
import Chat from "./components/chat";
import {Route, Redirect} from 'react-router'
import { isExpired, decodeToken  } from "react-jwt";

function App() {

    let $auth = {
        isLoggedIn: function () {
            if (isExpired(localStorage.getItem('token')) || !decodeToken(localStorage.getItem('token'))) {
                console.log('dec tok ' + decodeToken(localStorage.getItem('token')))
                return false;
            } else {
                console.log('dec tok2 ' + JSON.stringify(decodeToken(localStorage.getItem('token'))));
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
                <Route path="/profile" exact component={MainPage}/>
                <Route path="/profile" exact component={Chat}/>


                <Route exact path="/" render={() => (
                    $auth.isLoggedIn() ? (
                        <Redirect to="/"/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                )}/>


            {/*    render={props => {*/}
            {/*    if (isExpired(localStorage.getItem('token'))) {*/}
            {/*        return <Redirect to="/" />;*/}
            {/*    }*/}
            {/*    return <Posts />;*/}
            {/*}}*/}


            </div>

            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/signIn" exact component={SignIn}/>
            </Switch>
        </div>
    )
}

export default App;