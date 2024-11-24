// src/ui/admin/features/hotel/screens/hotel-bookings/hotel-bookings.screen.tsx

import React, { useEffect, useState } from 'react';
import HotelBookingsTable from '../../components/hotel-bookings-table/hotel-bookings-table.component.tsx';
import './hotel-bookings.style.scss';
import { IBookingHotel, getBookingsByHotel } from '../../../../../../data/hotel/booking-hotel.data.ts';
import { useParams } from 'react-router-dom';

const HostHotelBookingsPage: React.FC = () => {
    const [bookings, setBookings] = useState<IBookingHotel[]>([]);
    const { hotelId } = useParams(); // Retrieve hotelId from URL parameters

    useEffect(() => {
        if (hotelId) {
            getBookingsByHotel(hotelId).then((data) => {
                setBookings(data.data);
            });
        }
    }, [hotelId]);

    const handleDelete = (id: string) => {
        // Implement the delete logic for booking
        setBookings(bookings.filter(booking => booking.hotel._id !== id));
    };

    return (
        <div className="admin-bookings-page">
            <div className="title-wrapper">
                <h2>Manage Hotel Bookings</h2>
            </div>
            <HotelBookingsTable bookings={bookings} onDelete={handleDelete} />
        </div>
    );
};

export default HostHotelBookingsPage;


