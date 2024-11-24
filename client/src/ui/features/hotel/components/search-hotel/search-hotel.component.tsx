// src/ui/features/hotel/components/search-hotel/search-hotel.component.tsx
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, format, parse } from 'date-fns';
import './search-hotel.style.scss';
import { useOutsideClick } from '../../../../../hooks/useOutsideClick.tsx';
import { getCitiesData, ICitySchema } from '../../../../../data/city.data.ts';
import {strings} from "../../../../../i18n/strings.ts";
import {useLocation} from "react-router-dom";

const SearchHotel: React.FC<{ onSearch: (queries: string) => void }> = ({ onSearch }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const defaultCity =  searchParams.get('cityName') || '';
    const defaultPersons = searchParams.get('persons') || '';
    const defaultRooms = searchParams.get('rooms') || '';
    const defaultStartDate = searchParams.get('startDate')
        ? parse(searchParams.get('startDate') as string, 'dd/MM/yyyy', new Date())
        : addDays(new Date(),1);
    const defaultEndDate = searchParams.get('endDate')
        ? parse(searchParams.get('endDate') as string, 'dd/MM/yyyy', new Date())
        : addDays(defaultStartDate, 4);

    const [cities, setCities] = useState<ICitySchema[]>([]);
    // const [query, setQuery] = useState<string>('');
    const [filteredCities, setFilteredCities] = useState<ICitySchema[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(defaultCity);

    const formik = useFormik({
        initialValues: {
            persons: defaultPersons,
            rooms: defaultRooms,
            city: defaultCity,
            startDate: defaultStartDate,
            endDate: defaultEndDate,
        },
        onSubmit: (values) => {
            const url = `/${strings.navbar.exclusive}`
            let queries = '?';
            values.city && (queries += `city=${values.city}&cityName=${searchQuery}&`);
            values.persons && (queries += `persons=${values.persons}&`);
            values.rooms && (queries += `rooms=${values.rooms}&`);
            values.startDate && (queries += `startDate=${format(values.startDate, 'dd/MM/yyyy')}&`);
            values.endDate && (queries += `endDate=${format(values.endDate, 'dd/MM/yyyy')}&`);
            onSearch(queries);
            window.location.href = url + queries
        },
    });

    const { values, handleChange, handleSubmit, setFieldValue } = formik;
    const ref = useOutsideClick(() => {
        setFilteredCities([]);
        !values.city && setSearchQuery('');
    });

    useEffect(() => {
        getCitiesData().then((data) => setCities(data.data));
    }, []);

    const handleStartDateChange = (date: Date | null) => {
        setFieldValue('startDate', date);
        setFieldValue('endDate', addDays(date as Date, 3));
    };

    const handleEndDateChange = (date: Date | null) => {
        setFieldValue('endDate', date);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        const filtered = cities.filter((city) => city.name.toLowerCase().includes(query));
        setSearchQuery(query);
        setFilteredCities(filtered);
        if (!filtered.some((city) => city.name.toLowerCase() === query)) {
            setFieldValue('city', '');
        }
    };

    const handleCitySelect = (city: ICitySchema) => {
        setSearchQuery(city.name);
        setFilteredCities([]);
        setFieldValue('city', city._id);
    };

    return (
        <div className="search-hotel-section">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="form-row">
                    <div className="form-group">
                        <input
                            name="location"
                            onChange={handleSearchChange}
                            value={searchQuery}
                            autoComplete="off"
                            type="text"
                            placeholder="Type your destination..."
                            className="form-control"
                        />
                        <div className="citiesList" ref={ref}>
                            {filteredCities.length > 0 && (
                                <ul className="city-dropdown">
                                    {filteredCities.map((city) => (
                                        <li key={city._id} onClick={() => handleCitySelect(city)}>
                                            {city.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <DatePicker
                            selected={values.startDate}
                            onChange={handleStartDateChange}
                            selectsStart
                            startDate={values.startDate}
                            endDate={values.endDate}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            customInput={<input value={values.startDate} className="form-control date-input" />}
                        />
                    </div>
                    <div className="form-group">
                        <DatePicker
                            style={{zIndex:'1000'}}
                            selected={values.endDate}
                            onChange={handleEndDateChange}
                            selectsEnd
                            startDate={values.startDate}
                            endDate={values.endDate}
                            minDate={values.startDate || new Date()}
                            dateFormat="dd/MM/yyyy"
                            customInput={<input value={values.endDate} className="form-control date-input" />}
                        />
                    </div>
                    <div className="form-group">
                        <select name="persons" className="form-control" onChange={handleChange} value={values.persons}>
                            <option value="">Travelers</option>
                            {[...Array(10)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1} {index + 1 === 1 ? "traveler" :"travelers"}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <select name="rooms" className="form-control" onChange={handleChange} value={values.rooms}>
                            <option value="">Rooms</option>
                            {[...Array(10)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1} {index + 1 === 1 ? "room" :"rooms"}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="search-btn">
                            Check Availability
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SearchHotel;
