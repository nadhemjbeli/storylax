import React, {useEffect, useState} from "react";
import CityForm from "./city-form/city-form.component.tsx";
import api from "../../../../../utils/api.ts";
import {useNavigate, useParams} from "react-router-dom";
import {ICitySchema, showCityData} from "../../../../../data/city.data.ts";

const AdminUpdateCity: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [city, setCity] = useState<ICitySchema>({
        name: "",
        location: { long: 0, lat: 0 }
    })
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            showCityData(id).then(data => {
                setCity(data.data);
                console.log(data.data);
            })
        }
    }, [id]);
    const handleSubmit = async (values: ICitySchema) => {
        // console.log('Submitted values:', values);
        // Send the FormData to the API
        try {
            const response = await api.put(`/cities/${city._id}`, values);

            console.log('Server response:', response.data);

            // Handle success, e.g., redirect to another page
            navigate('/admin/cities')
        } catch (error) {
            console.error('Error uploading blog:', error);
        }
    };


    return (
        <div className="update-city">
            <CityForm city={city}  title={"Update city"} submitText={"Update"} onSubmit={handleSubmit} />
        </div>
    );
};

export default AdminUpdateCity;
