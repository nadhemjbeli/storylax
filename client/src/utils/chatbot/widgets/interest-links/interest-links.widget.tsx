// src/utils/chatbot/widgets/interest-links/interest-links.widget.tsx
import React from 'react';
import {IUserInterestData} from "../../../../data/traveler/interests.data.ts";
import "./interest-links.style.scss"

interface InterestLinksProps {
    interests: IUserInterestData[];
    actions: any;
}

const InterestLinks: React.FC<InterestLinksProps> = ({ interests, actions }) => {
    // Log actions to see if it contains handleInterestClick
    console.log('actions', actions);

    const handleInterestClick = (interest: string) => {
        // Ensure that handleInterestClick is called if available
        if (actions?.handleInterestClick) {
            actions.handleInterestClick(interest);
        } else {
            console.error('handleInterestClick not found in actions');
        }
    };

    return (
        <div className="interest-links">
            {interests.map((interest: IUserInterestData) => (
                <button
                    key={interest._id}
                    className="interest-link"
                    onClick={() => handleInterestClick(interest.name)}
                    disabled={false}  // Set to true after click
                >
                    {interest.name}
                </button>
            ))}
        </div>
    );
};


export default InterestLinks;
