import React from 'react';
import { Itinerary } from './itineraryData'; // Adjust the path as needed

interface ItineraryCardProps {
    item: Itinerary;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ item }) => {
    return (
        <a href="#" className="itinerary-card">
            <img src={item.image} alt={item.title} className="itinerary-image" />
            <h3 className="itinerary-card-title">{item.title}</h3>
            <p className="itinerary-exact-place">{item.exactPlace}</p>
            <p className="itinerary-description">{item.description}</p>
        </a>
    );
};

export default ItineraryCard;
