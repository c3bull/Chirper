import React from 'react';
import chirper12 from '../images/chirper12.png';
import {Redirect} from "react-router-dom";

const MainPage = () => {

    return (
        <div id="mainPageDiv" className="mainPageBackground">
            <img src={chirper12} alt="chirperLogo"/>
        </div>
    )
};

export default MainPage;
