import React from 'react';
import "./why-choose-us.style.scss"
import {whyChooseUsData} from "../../../../../data/about-us/why-choose-us.data.ts";
import {strings} from "../../../../../i18n/strings.ts";

const WhyChooseUs: React.FC = () => {
    return (
        <div className="why-choose-us-section">
            <h1 className="section-title heading-underlined">
                {strings.aboutUs.whyChooseUs.experienceTunisia}
            </h1>
            <div className="why-choose-us-grid">
                {whyChooseUsData.map((item) => (
                    <div key={item.id} className={`card ${item.id % 2 === 0 ? 'image-left' : 'image-right'}`}>
                        <div className="card-content">
                            <div className="bordered-image-container">
                                <div className="first-div"></div>
                                <img src={item.image} alt={item.title} className="bordered-image" />
                            </div>
                            <div className="card-text">
                                <h3 className="card-title">{item.title}</h3>
                                <p className="card-description">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseUs;