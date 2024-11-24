import React from 'react';
import './location.style.scss'

const Location: React.FC = () => {
    return (
        <div className="location-content flex">
            <div className="location-left"></div>
            <div className="location-right flex">
                <h3 className="location">Our Location</h3>
                <h2 className="connecting-title">Connecting Near and Far</h2>
                <h4 className="headquarters">headquarters</h4>
                <p className="place">Tunis, Tunisia</p>
            </div>
        </div>
    );
};

export default Location;