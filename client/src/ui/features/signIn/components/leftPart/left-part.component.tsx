import React from 'react';
import "./left-part.style.scss"
import logo from "../../../../../assets/images/logo/dark-logo.png"
import happyClient from "../../../../../assets/images/happyclient.jpg"

const LeftPart:React.FC = () => {
    return (
        <div className="left-part-section">
            <h1 className="slogan">
                Discover Tunisia's Hidden Gems with <img className="sign-in-logo-img" src={logo} alt=""/>
            </h1>
            <img src={happyClient} alt="happy client" className="left-part-img"/>
        </div>
    );
};

export default LeftPart;