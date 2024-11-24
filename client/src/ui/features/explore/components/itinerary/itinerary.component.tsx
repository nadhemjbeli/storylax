import React, { useState } from 'react';
import { strings } from "../../../../../i18n/strings.ts";
import "./itinerary.style.scss";
import { ReactComponent as ChevronLeft } from "../../../../../assets/svg/explore/chevron-left.icon.svg";
import { ReactComponent as ChevronRight } from "../../../../../assets/svg/explore/chevron-right.icon.svg";
import { itineraryData } from "../../../../../data/explore/itirenary.data.tsx";
import ItineraryCard from "./card/card.component.tsx";

interface ItineraryProps{
    explorePlaceId:string,
}
const Itinerary: React.FC<ItineraryProps> = ({explorePlaceId}) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const itemsPerPage = 3;

    const handleNext = () => {
        if ((currentPage + 1) * itemsPerPage < itineraryData.length) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPage(currentPage + 1);
                setIsAnimating(false);
            }, 300); // Match this duration with your CSS transition
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentPage(currentPage - 1);
                setIsAnimating(false);
            }, 300); // Match this duration with your CSS transition
        }
    };
    const itineraryDataByPlace = itineraryData.filter(item =>item.explorePlace===explorePlaceId)
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = itineraryDataByPlace.slice(startIndex, endIndex);

    return (
        <div className="itinerary-section container">
            <h2 className="itinerary-title">{strings.explorePage.itinerary.recommendedItinerary}</h2>
            <div className={`cards ${isAnimating ? 'animating' : ''}`}>
                {currentItems.map(item => (
                    <ItineraryCard key={item.id} item={item} />
                ))}
            </div>
            {
                itineraryDataByPlace.length > 3 &&
                <div className="navigation-buttons">
                    <button className="btn" onClick={handlePrevious} disabled={currentPage === 0}>
                        <ChevronLeft className="icon" />
                    </button>
                    <button className="btn" onClick={handleNext}
                            disabled={endIndex >= itineraryDataByPlace.length}
                    >
                        <ChevronRight className="icon" />
                    </button>
                </div>
            }
        </div>
    );
};

export default Itinerary;
