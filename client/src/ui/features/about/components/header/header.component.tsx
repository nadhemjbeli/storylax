import React from 'react';
import "./header.style.scss"
import happyTeam from "../../../../../assets/images/about-us/happy-working-team.webp"
import {aboutUsHeader} from "../../../../../data/about-us/header.data.tsx";
import {strings} from "../../../../../i18n/strings.ts";

const Header:React.FC = () => {
    return (
        <div className="header-section">
            <div className="first-part">
                <h1 className="heading about-title">
                    {strings.aboutUs.header.aboutUs}
                </h1>
                <p className="description">
                    At <strong>Storylax</strong>, we are dedicated to showcasing the charm and authenticity of Tunisia through unique and personalized travel experiences. Our platform highlights local guest houses and cultural treasures, ensuring an unforgettable journey for every visitor. Join us to discover the hidden gems of Tunisia and create lasting memories.
                </p>
            </div>
            <div className="second-part">
                <div className="left-part">
                    <h1 className="heading-underlined">
                        {strings.aboutUs.header.deepPassion}
                    </h1>
                    <p className="description">
                        At Storylax, our deep passion for travel drives us to create unforgettable journeys
                        that immerse you in the heart of Tunisia's rich culture and history. We are committed
                        to showcasing the unique charm of local guest houses and hidden gems, ensuring every
                        traveler experiences the true essence of each destination. Join us at Storylax to
                        explore, discover, and create lasting memories through authentic and personalized
                        travel experiences.
                    </p>
                    <div className="bordered-image-container">
                        <div className="first-div"></div>
                        <img src={happyTeam} alt="" className="bordered-image"/>
                    </div>
                </div>
                <div className="right-part">
                    {aboutUsHeader.map(item => (
                        <div key={item.id} className="card">
                            <div className="icon-container">
                                {item.icon}
                            </div>
                            <h3 className="title">{item.title}</h3>
                            <p className="description">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;