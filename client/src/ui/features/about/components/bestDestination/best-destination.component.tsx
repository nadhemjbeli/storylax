import React from 'react';
import "./best-destination.style.scss"
import {bestDestinationData} from "../../../../../data/about-us/best-destination.ts";
import {strings} from "../../../../../i18n/strings.ts";

const BestDestination:React.FC = () => {
    return (
        <div className="best-destination-section">
            <div className="heading-container">
                <h1 className="title">{strings.aboutUs.bestDestination.perfectPlace}</h1>
                <div className="right-heading">
                    <p className="description">
                        Are you on the quest to find the ideal spot to spend your time,
                        work, or even call home? let us assist you in uncovering
                        the place that suits you
                    </p>
                    <button className="primary-button">See detail</button>
                </div>
            </div>
            <div className="best-destination-list">
                {bestDestinationData.map(destination => (
                    <div key={destination.id} className="card">
                        <a href={destination.link} className="card-link">
                            <img src={destination.image} alt={destination.title} className="card-image" />
                            <div className="card-content">
                                <div className="card-heading">
                                    <span className="card-title">{destination.title}</span>
                                    <span className="card-spots">{destination.spots} Spots</span>
                                </div>
                                <p className="card-description">{destination.description}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default BestDestination;