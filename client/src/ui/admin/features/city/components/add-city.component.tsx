import React, { useState } from "react";
import api from "../../../../../utils/api.ts";
import { ICitySchema } from "../../../../../data/city.data.ts";
import CityForm from "./city-form/city-form.component.tsx";

const AdminAddCity: React.FC = () => {

    const city : ICitySchema = {
        name: "",
        location: { long: 0, lat: 0 }
    }

    const handleSubmit = async (values: ICitySchema) => {
        if (values.name) {
            console.log('Submitted values:', values);

            try {
                const response = await api.post('/cities', values);

                console.log('Server response:', response.data);

                // Handle success, e.g., redirect to another page
                window.location.href = "/admin/cities";
            } catch (error) {
                console.error('Error uploading city:', error);
            }
        } else {
            console.log("No city selected");
        }
    };

    return (
        <div className="add-city">
            <CityForm city={city} title={"Add City"} submitText={"Submit"} onSubmit={handleSubmit} />
        </div>
    );
};

export default AdminAddCity;
