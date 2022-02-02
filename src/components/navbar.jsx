import React from "react";
import {useHistory} from "react-router-dom";
import chirper8 from '../images/chirper8.png';
import {decodeToken} from "react-jwt";

/**
 * Component which includes buttons to navigate to different components.
 * @constructor
 * @returns {JSX.Element} Returns logo of the webside and navigating buttons
 */
const Navbar = () => {

    const history = useHistory();
    const nickname = decodeToken(localStorage.getItem('token')).nickname;

    /**
     * Function that navigates client to the home component
     */
    const NavbarHome = () => {
        history.push('/');
    };

    /**
     * Function that navigates client to the profile component
     */
    const NavbarProfile = () => {
        history.push(`/profile/${nickname}`);
        window.location.reload(false);
    };

    /**
     * Function that logs out the client by removing token
     * and navigates the client to the login component
     */
    const NavbarLogout = () => {
        localStorage.removeItem('token');
        history.push('/login');
    }

    return (
        <div id="navbarDiv">
            <div className="navbarButtons">
                <img className="chirperLogoNavbar" src={chirper8} alt="chirperLogo" onClick={NavbarHome}/>
                <div className="shrink-border" onClick={NavbarHome}>Home</div>
                <div className="shrink-border" onClick={NavbarProfile}>Profile</div>
                <div className="shrink-border" onClick={NavbarLogout}>Log Out</div>
            </div>
        </div>
    );
};

export default Navbar;
