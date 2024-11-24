// src/ui/admin/features/hotel/screens/hotel-services/add-hotel-service.screen.tsx
import React from "react";
import HotelServiceForm from "../../components/hotel-service-form/hotel-service-form.component.tsx";
import { IAddHotelService } from "../../../../../../data/hotel/hotel.data.ts";
import api from "../../../../../../utils/api.ts";
import { useNavigate, useParams } from "react-router-dom";

const AdminAddHotelServiceScreen: React.FC = () => {
    const hotelService: IAddHotelService = {
        name: "",
        hotel: "",
    };

    const navigate = useNavigate();
    const { hotelId } = useParams(); // Assuming we have the hotelId in the URL

    const handleSubmit = async (values: IAddHotelService) => {
        if (values.hotel && values.name) {
            try {
                const response = await api.post(`/hotel-services`, values);
                console.log("Service added:", response.data);

                // On success, navigate to the hotel's service page or another page
                navigate(`/admin/hotel-services/${values.hotel}`);
            } catch (error) {
                console.error("Error adding hotel service:", error);
            }
        } else {
            console.log("Missing hotel or service name");
        }
    };

    return (
        <div className="add-hotel-service">
            {
                hotelId &&
                <HotelServiceForm
                    hotelService={hotelService}
                    hotelId={hotelId}
                    title="Add Hotel Service"
                    submitText="Add Service"
                    onSubmit={handleSubmit}
                />
            }
        </div>
    );
};

export default AdminAddHotelServiceScreen;
