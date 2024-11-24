// src/ui/admin/features/hotel/screens/add-hotel.screen.tsx
import React from "react";
import HotelForm from "../../components/hotel-form/hotel-form.component.tsx";
import { IAddHotel } from "../../../../../../data/hotel/hotel.data.ts";
import api from "../../../../../../utils/api.ts";
import { useNavigate } from "react-router-dom";

const AdminAddHotel: React.FC = () => {
    const hotel: IAddHotel = {
        title: "",
        resume: "",
        city: "",
        defaultImage: "",
        smallImage: "",
        mediumImage: "",
        largeImage: "",
        price: 0,
        capacity: 1,
        minDays: 1,
        maxDays: 7,
    };

    const navigate = useNavigate();

    const handleSubmit = async (values: IAddHotel) => {
        if (values.city) {
            console.log('Submitted values:', values);

            // Create a FormData object to handle file uploads
            const formData = new FormData();

            // Append file and other form data to FormData
            formData.append('defaultImage', values.defaultImage);
            formData.append('smallImage', values.smallImage);
            formData.append('mediumImage', values.mediumImage);
            formData.append('largeImage', values.largeImage);
            formData.append('title', values.title);
            formData.append('resume', values.resume);
            formData.append('city', values.city);
            formData.append('capacity', values.capacity.toString());
            formData.append('price', values.price.toString());
            formData.append('minDays', values.minDays.toString());
            formData.append('maxDays', values.maxDays.toString());

            // Send the FormData to the API
            try {
                const response = await api.post('/hotels', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Server response:', response.data);

                // Handle success, e.g., redirect to another page
                navigate(`/admin/hotels`);
            } catch (error) {
                console.error('Error uploading hotel:', error);
            }
        } else {
            console.log("No city selected");
        }
    };

    return (
        <div className="add-hotel">
            <HotelForm hotel={hotel} title={"Add Hotel"} submitText={"Submit"} onSubmit={handleSubmit} />
        </div>
    );
};

export default AdminAddHotel;
