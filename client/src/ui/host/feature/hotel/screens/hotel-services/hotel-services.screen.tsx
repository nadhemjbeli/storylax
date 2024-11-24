import React, { useEffect, useState } from 'react';
import HotelServicesTable from '../../../../../admin/features/hotel/components/hotel-services-table/hotel-services-table.component.tsx';
import {getHotelServicesByHotel, IHotelService} from '../../../../../../data/hotel/hotel.data.ts';
import api from '../../../../../../utils/api.ts';
import {Link, useParams} from "react-router-dom";
import "./hotel-services.style.scss"

interface AdminHotelServicesComponentProps {
    // onHotelDelete: (id: string) => void;
}

const HostHotelServicesComponent: React.FC<AdminHotelServicesComponentProps> = () => {
    const {hotelId} = useParams(); // Replace with the actual hotel ID
    const [hotelServices, setHotelServices] = useState<IHotelService[]>([]);

    useEffect(() => {
        getHotelServicesByHotel(hotelId as string).then((response) => {
            setHotelServices(response.data);
        });
    }, []);

    const handleDelete = (id: string) => {
        api.delete(`hotel-services/${id}`).then(() => {
            setHotelServices(hotelServices.filter(hotelService => hotelService._id !== id));
        });
    };

    return (
        <div className="admin-hotel-services-page">
            <div className="title-wrapper">
                <h2>Manage Hotel Services</h2>
                <div className="buttons-wrapper">
                    <Link to={`/admin/add-hotel-service/${hotelId}`}>
                        <button className="primary-button">Add an Hotel Service</button>
                    </Link>
                </div>
            </div>
            <HotelServicesTable hotelServices={hotelServices} onDelete={handleDelete} />
        </div>
    );
};

export default HostHotelServicesComponent;
