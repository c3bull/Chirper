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

    const NavbarSignUp = () => {
        history.push('/signUp');
    };

    const NavbarProfile = () => {
        history.push('/profile');
    };

    const NavbarLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }

    return (
        <div id="navbarDiv">
            <div className="navbarButtons">
                <div className="shrink-border" onClick={NavbarHome}>Home</div>

                <div className="shrink-border" onClick={NavbarLogIn}>Login</div>

                <div className="shrink-border" onClick={NavbarSignUp}>Sign Up</div>

                <div className="shrink-border" onClick={NavbarProfile}>Profile</div>

                <div className="shrink-border" onClick={NavbarLogout}>Log Out</div>
            </div>
        </div>
    );
};

export default Navbar;
