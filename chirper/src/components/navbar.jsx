import React from "react";
import { Link } from "react-router-dom";
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
                <Button onClick={NavbarHome}>Home</Button>

                <Button onClick={NavbarLogIn}>Login</Button>

                <Button onClick={NavbarSignIn}>Sign In</Button>

                <Button onClick={NavbarProfile}>Profile</Button>

        </div>
    );
};

export default Navbar;
