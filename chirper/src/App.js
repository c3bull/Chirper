import * as React from "react"
import Login from "./components/login"
import MainPage from "./components/mainPage";
import SignIn from "./components/signIn";
import Navbar from "./components/navbar";
import {Route, Router, Switch} from "react-router-dom";
import Chat from "./components/chat";

function App() {
    return (
        <div className="mainBackground">
            <div>
                <Route path="/" exact component={Navbar}/>
                <Route path="/" exact component={MainPage}/>
                <Route path="/" exact component={Chat}/>
            </div>

            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/signIn" exact component={SignIn}/>
            </Switch>
        </div>
    )
}

export default App;