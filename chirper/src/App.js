import * as React from "react"
import Login from "./components/login"
import MainPage from "./components/mainPage";
import {Redirect, Route, Switch} from "react-router-dom";

function App() {
    return (
        <div>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/" component={MainPage}/>
            </Switch>
        </div>
    )
}

export default App;