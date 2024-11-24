import React from 'react';
import { ReactComponent as NextArrow } from "../../../../../assets/svg/next-arrow.svg";
import "./floating-button.style.scss";

const FloatingButton: React.FC = () => {
    return (
        <button className="floating-button primary-button-outline">
            <NextArrow className="call-to-action-icon" />
            Call to Action
        </button>
    );
};

export default FloatingButton;
