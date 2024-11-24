import React from 'react';
import "./hero.style.scss"

const Hero:React.FC = () => {
    return (
        <div className="hero-section-blog">
            <div className="hero-content">
                <h2 className="hero-title">
                    TRAVEL IN STYLE ON A BUDGET
                </h2>
                <div className="search-form">
                    <input type="text" className="search" placeholder={"Search for blogs"}/>
                    <button className="primary-button">Search</button>
                </div>
            </div>
        </div>
    );
};

export default Hero;