// src/ui/admin/features/blog/screens/admin-cities.tsx

import React, {useEffect, useState} from 'react';
import CityTable from '../components/cities-table/cities-table.component.tsx';
import './cities.style.scss';
import {Link} from "react-router-dom";
import api from "../../../../../utils/api.ts";
import {getCitiesData, ICitySchema} from "../../../../../data/city.data.ts";

const AdminCities: React.FC = () => {
    const [cities, setCities] = useState<ICitySchema[]>([]);

    useEffect(() => {
        getCitiesData().then((data) => {
            setCities(data.data);
        })
    }, []);

    const handleDelete = (id: string) => {
        api.delete(`cities/${id}`).then((_) => {
            setCities(cities.filter(blog => blog._id !== id));
        })
    };

    return (
        <div className="admin-cities-page">
            <div className={"title-wrapper"}>
                <h2>Manage Cities</h2>
                <Link to={"/admin/add-city"}>
                    <button className="primary-button">add a City</button>
                </Link>
            </div>
            <CityTable cities={cities} onDelete={handleDelete} />
            {/*cities page*/}
        </div>
    );
};

export default AdminCities;
