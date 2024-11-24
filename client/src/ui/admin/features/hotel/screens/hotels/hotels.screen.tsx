// src/ui/admin/features/hotel/screens/hotels/hotels.screen.tsx

import React, { useEffect, useState } from 'react';
import HotelTable from '../../components/hotels-table/hotels-table.component.tsx';
import './hotels.style.scss';
import { getHotels, IHotel } from '../../../../../../data/hotel/hotel.data.ts';
import { Link } from 'react-router-dom';
import api from '../../../../../../utils/api.ts';

const AdminHotels: React.FC = () => {
    const [hotels, setHotels] = useState<IHotel[]>([]);

    useEffect(() => {
        getHotels().then((response) => {
            setHotels(response.data);
        });
    }, []);

    const handleDelete = (id: string) => {
        api.delete(`hotels/${id}`).then(() => {
            setHotels(hotels.filter(hotel => hotel._id !== id));
        });
    };

    return (
        <div className="admin-hotels-page">
            <div className={"title-wrapper"}>
                <h2>Manage Hotels</h2>
                <div className="buttons-wrapper">
                    <Link to={"/admin/add-hotel"}>
                        <button className="primary-button">Add a Hotel</button>
                    </Link>
                </div>
            </div>
            <HotelTable hotels={hotels} onDelete={handleDelete} />
        </div>
    );
};

export default AdminHotels;

