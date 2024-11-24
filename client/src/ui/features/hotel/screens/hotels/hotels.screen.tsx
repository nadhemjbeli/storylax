// src/ui/features/hotel/screens/hotels/hotels.screens.tsx
import React from 'react';
import ListHotels from "../../components/list-hotels/list-hotels.components.tsx";

const HotelsPage:React.FC = () => {
    return (
        <div className="hotels-page">
             <ListHotels/>
        </div>
    );
};

export default HotelsPage;