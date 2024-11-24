import React from 'react';
import { IMapData, IPlaceDetail } from "../../../../../../data/explore/maps.data.ts";
import "./cards.style.scss"

interface CardsProps {
    filteredActiveMapPoints: IMapData[];
    onCardClick: (place: IPlaceDetail, type: string, color: string) => void; // New prop for handling card clicks
}

const Cards: React.FC<CardsProps> = ({ filteredActiveMapPoints, onCardClick }) => {
    const allPlaces: IPlaceDetail[] = filteredActiveMapPoints.flatMap(point =>
        point.placeDetails.map(place => ({
            ...place,
            type: point.type, // Assigning the type from parent MapData
            color: point.color, // Assigning color from parent MapData
        }))
    );

    return (
        <div className="cards-container">
            {allPlaces.map((place) => (
                <div
                    key={place._id}
                    className="card"
                    onClick={() => onCardClick(place, place.exploreMap.type, place.exploreMap.color)} // Handle card click
                >
                    <p className="description">{place.type}</p>
                    <h3 className="title">{place.title}</h3>
                    <p className="city">{place.explorePlace?.city?.name}</p>
                    <p className="transportation">{place.transportation}</p>
                </div>
            ))}
        </div>
    );
};

export default Cards;
