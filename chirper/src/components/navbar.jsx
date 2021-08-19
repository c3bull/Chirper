import React from "react";
import {Button} from "@chakra-ui/react";
import {useHistory} from "react-router-dom";

const Navbar = () => {

    const history = useHistory();

    const NavbarHome = () => {
        history.push('/');
    };

    const NavbarLogIn = () => {
        history.push('/login');
    };

    const NavbarSignIn = () => {
        history.push('/signIn');
    };

    const NavbarProfile = () => {
        history.push('/profile');
    };

    return (
        <div id="navbarDiv">
            <div className="navbarButtons">
                <div className="shrink-border" onClick={NavbarHome}>Home</div>

                <div className="shrink-border" onClick={NavbarLogIn}>Login</div>

                <div className="shrink-border" onClick={NavbarSignIn}>Sign In</div>

                <div className="shrink-border" onClick={NavbarProfile}>Profile</div>
            </div>
        </div>
    );
};

export default Navbar;
