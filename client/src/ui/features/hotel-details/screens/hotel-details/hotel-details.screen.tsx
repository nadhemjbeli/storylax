// src/ui/features/hotel/screens/hotel-details/hotel-details.screens.tsx
import React, {useEffect, useState} from 'react';
import {IHotel, showHotel} from "../../../../../data/hotel/hotel.data.ts";
import HotelAbout from "../../components/hotel-about/hotel-about.component.tsx";
import {useParams} from "react-router-dom";
import './hotel-details.style.scss'

const HotelDetailsPage:React.FC = () => {
    const {id}=useParams()
    const [hotel, setHotel] = useState<IHotel>()
    useEffect(() => {
        showHotel(id as string).then(data=>{
            console.log('hotel: ',data.data)
            setHotel(data.data)
        })
    }, []);
    return (
        <div className="hotel-details-page">
            <HotelAbout hotel={hotel as IHotel} />
            {/*<h1>Hotel Details Page</h1>*/}
        </div>
    );
};

export default HotelDetailsPage;