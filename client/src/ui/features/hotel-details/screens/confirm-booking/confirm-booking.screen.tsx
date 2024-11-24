// src/ui/features/hotel-details/screens/confirm-booking/confirm-booking.screens.tsx
import React, {useEffect, useState} from 'react';
import {IHotel, showHotel} from "../../../../../data/hotel/hotel.data.ts";
import {useParams} from "react-router-dom";
import ConfirmBooking from "../../components/confirm-booking/confirm-booking.component.tsx";

const ConfirmBookingPage:React.FC = () => {
    const {hotelId}=useParams()
    const [hotel, setHotel] = useState<IHotel>()
    useEffect(() => {
        showHotel(hotelId as string).then(data=>{
            // console.log('hotel: ',data.data)
            setHotel(data.data)
        })
    }, []);
    return (
        <div className="confirm-booking-page">
            {hotel && <ConfirmBooking hotel={hotel}/>}
        </div>
    );
};

export default ConfirmBookingPage;