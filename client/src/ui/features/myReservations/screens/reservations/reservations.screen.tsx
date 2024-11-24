// src/ui/features/my-reservations/screens/reservations/reservations.screen.tsx
import React from 'react';
import HotelTravelerReservationsList from "../../components/reservations-list/reservations-list.component.tsx";

const HotelReservationsPage:React.FC = () => {
    return (
        <div className="reservations-page">
            <HotelTravelerReservationsList />
        </div>
    );
};

export default HotelReservationsPage;