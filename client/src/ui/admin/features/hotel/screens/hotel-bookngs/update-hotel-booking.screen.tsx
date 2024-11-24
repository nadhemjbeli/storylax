// src/ui/admin/features/hotel/screens/hotel-bookings/update-hotel-bookings.screen.tsx
import React, { useEffect, useState } from "react";
import api from "../../../../../../utils/api.ts";
import { useNavigate, useParams } from "react-router-dom";
import {IBookingHotel, IStatusBookingHotel} from "../../../../../../data/hotel/booking-hotel.data.ts";
import HotelBookingStatusForm from "../../components/hotel-booking-status-form/hotel-booking-status-form.component.tsx";

const AdminUpdateHotelBookings: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the booking ID from the URL
    const [bookingStatus, setBookingStatus] = useState<IStatusBookingHotel>({
        status: "in progress", // Default booking status
    });
    const [bookingHotel, setBookingHotel] = useState<IBookingHotel>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Fetch the current booking data based on the ID
            api.get(`/hotel-bookings/${id}`).then((response) => {
                setBookingStatus(response.data); // Set the fetched booking status data
                setBookingHotel(response.data); // Set the fetched booking status data
                console.log("Booking data:", response.data);
            });
        }
    }, [id]);

    const handleSubmit = async (values: IStatusBookingHotel) => {
        try {
            // Send the updated booking status to the API
            const response = await api.put(`/hotel-bookings/${id}`, values);
            console.log("Server response:", response.data);

            // Redirect after successful update
            navigate(`/admin/booking-hotels/${bookingHotel?.hotel?._id}`);
        } catch (error) {
            console.error("Error updating booking:", error);
        }
    };

    return (
        <div className="update-booking-status">
            <HotelBookingStatusForm
                statusBookingHotel={bookingStatus}
                title={"Update Booking Status"}
                submitText={"Update Status"}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default AdminUpdateHotelBookings;

