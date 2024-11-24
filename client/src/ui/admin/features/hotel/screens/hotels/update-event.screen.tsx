// src/ui/admin/features/event/screens/events/update-event.screen.tsx
import React, {useEffect, useState} from "react";
import api from "../../../../../../utils/api.ts";
import {useNavigate, useParams} from "react-router-dom";
import {IAddHotel, showHotel} from "../../../../../../data/hotel/hotel.data.ts";
import HotelForm from "../../components/hotel-form/hotel-form.component.tsx";

const AdminUpdateHotel: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [hotel, setHotel] = useState<IAddHotel>({
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
    })
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            showHotel(id).then(data => {
                setHotel(data.data);
                console.log('event:',data.data);
            })
        }
    }, [id]);
    const handleSubmit = async (values: any) => {

        if (values.city) {
            console.log('Updated values:', values);

            // Create a FormData object to handle file uploads
            const formData = new FormData();
            console.log(values)
            // Append file and other form data to FormData
            values.defaultImage && formData.append('defaultImage', values.defaultImage);
            values.smallImage && formData.append('smallImage', values.smallImage);
            values.mediumImage && formData.append('mediumImage', values.mediumImage);
            values.largeImage && formData.append('largeImage', values.largeImage);
            formData.append('title', values.title);
            formData.append('resume', values.resume);
            formData.append('city', values.city);
            formData.append('capacity', values.capacity.toString());
            formData.append('price', values.price.toString());
            formData.append('minDays', values.minDays.toString());
            formData.append('maxDays', values.maxDays.toString());

            // Send the FormData to the API
            try {
                const response = await api.put(`/hotels/${id}`, formData, {
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
            <HotelForm hotel={hotel} title={"Update Hotel"} submitText={"Update"} onSubmit={handleSubmit} />
        </div>
    );
};

export default AdminUpdateHotel;
