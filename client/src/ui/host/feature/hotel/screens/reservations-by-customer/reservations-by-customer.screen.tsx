// src/ui/host/features/hote/screens/reservations/reservations.screen.tsx
import React from 'react';
import HotelReservationsListByCustomer
    from "../../components/reservations-list-by-customer/reservations-list-by-customer.component.tsx";
import {useParams} from "react-router-dom";

const HotelHostReservationsByCustomerPage:React.FC = () => {
    const { customerId} = useParams()
    return (
        <div className="reservations-by-customer-page">
            <HotelReservationsListByCustomer customerId={customerId as string} />
        </div>
    );
};

export default HotelHostReservationsByCustomerPage;