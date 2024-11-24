import React from 'react';
import {IHotel} from "../../../../data/hotel/hotel.data.ts";
import './hotel-links.style.scss'

interface HotelLinksProps {
    hotels: IHotel[];
}

const HotelLinks: React.FC<HotelLinksProps> = ({ hotels }) => {
    return (
        <div className='hotel-links'>
            <p>Here are some hotels matching your criteria:</p>
            <ul>
                {hotels.map((hotel) => (
                    <li key={hotel._id}>
                        <a href={`/hotels/${hotel._id}`} target="_blank" rel="noopener noreferrer">
                            {hotel.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HotelLinks;
