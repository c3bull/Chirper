import React from "react";
import {useHistory} from "react-router-dom";
import chirper8 from '../images/chirper8.png';

const Navbar = () => {

    const history = useHistory();

    const NavbarHome = () => {
        history.push('/');
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
                <img className="chirperLogoNavbar" src={chirper8} alt="chirperLogo" onClick={NavbarHome}/>
                <div className="shrink-border" onClick={NavbarHome}>Home</div>
                <div className="shrink-border" onClick={NavbarProfile}>Profile</div>
                <div className="shrink-border" onClick={NavbarLogout}>Log Out</div>
            </div>
        </div>
    );
};

export default Navbar;
