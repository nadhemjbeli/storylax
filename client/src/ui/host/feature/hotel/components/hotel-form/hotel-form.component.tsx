// src/ui/admin/features/hotel/components/hotel-form/hotel-form.component.tsx
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import './hotel-form.style.scss';
import { getCitiesData, ICitySchema } from '../../../../../../data/city.data.ts';
import { useOutsideClick } from '../../../../../../hooks/useOutsideClick.tsx';
import { IAddHotel } from '../../../../../../data/hotel/hotel.data.ts';

interface HotelFormProps {
    onSubmit: (values: IAddHotel) => void;
    submitText: string;
    title: string;
    hotel: IAddHotel;
}

const HotelForm: React.FC<HotelFormProps> = ({ hotel, title, submitText, onSubmit }) => {
    const [cities, setCities] = useState<ICitySchema[]>([]);
    const [filteredCities, setFilteredCities] = useState<ICitySchema[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(hotel.city || '');

    const ref = useOutsideClick(() => {
        setFilteredCities([]);
        if (!values.city) {
            setFieldValue('city', '');
            setSearchQuery('');
        }
    });

    useEffect(() => {
        getCitiesData().then((data) => {
            setCities(data.data);
            setFilteredCities(data.data.filter((city: ICitySchema) => city.name === searchQuery));
        });
    }, []);

    useEffect(() => {
        setSearchQuery(hotel.city || '');
    }, [hotel]);

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setValues,
    } = useFormik<IAddHotel>({
        initialValues: {
            title: hotel.title || '',
            resume: hotel.resume || '',
            city: hotel.city || '',
            defaultImage: '',
            smallImage: '',
            mediumImage: '',
            largeImage: '',
            price: hotel.price || 0,
            minDays: hotel.minDays || 0,
            maxDays: hotel.maxDays || 0,
            capacity: hotel.capacity || 0
        },
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    useEffect(() => {
        setValues({ ...hotel, city: hotel.city });
    }, [hotel]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        const filtered = cities.filter((city) => city.name.toLowerCase().includes(query));

        setSearchQuery(query);
        setFilteredCities(filtered);

        if (!filtered.some((city) => city.name.toLowerCase() === query)) {
            setFieldValue('city', '');
        }
    };

    const handleSearchClick = () => {
        const filtered = cities.filter((city) => city.name.toLowerCase().includes(searchQuery));

        setFilteredCities(filtered);

        if (!filtered.some((city) => city.name.toLowerCase() === searchQuery)) {
            setFieldValue('city', '');
        }
    };

    const handleCitySelect = (cityName: string, cityId: string) => {
        setSearchQuery(cityName);
        setFilteredCities([]);
        setFieldValue('city', cityId);
    };

    return (
        <div className="add-hotel">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    placeholder="Hotel Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.title && touched.title && (
                    <div className="error-message">{errors.title}</div>
                )}

                <label htmlFor="resume">Resume</label>
                <textarea
                    id="resume"
                    name="resume"
                    placeholder="Hotel Resume"
                    value={values.resume}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.resume && touched.resume && (
                    <div className="error-message">{errors.resume}</div>
                )}

                <label htmlFor="defaultImage">Default Image</label>
                <input
                    id="defaultImage"
                    name="defaultImage"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        if (event.currentTarget.files) {
                            setFieldValue('defaultImage', event.currentTarget.files[0]);
                        }
                    }}
                />
                {errors.defaultImage && touched.defaultImage && (
                    <div className="error-message">{errors.defaultImage}</div>
                )}

                <label htmlFor="smallImage">Small Image</label>
                <input
                    id="smallImage"
                    name="smallImage"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        if (event.currentTarget.files) {
                            setFieldValue('smallImage', event.currentTarget.files[0]);
                        }
                    }}
                />
                {errors.smallImage && touched.smallImage && (
                    <div className="error-message">{errors.smallImage}</div>
                )}

                <label htmlFor="mediumImage">Medium Image</label>
                <input
                    id="mediumImage"
                    name="mediumImage"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        if (event.currentTarget.files) {
                            setFieldValue('mediumImage', event.currentTarget.files[0]);
                        }
                    }}
                />
                {errors.mediumImage && touched.mediumImage && (
                    <div className="error-message">{errors.mediumImage}</div>
                )}

                <label htmlFor="largeImage">Large Image</label>
                <input
                    id="largeImage"
                    name="largeImage"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        if (event.currentTarget.files) {
                            setFieldValue('largeImage', event.currentTarget.files[0]);
                        }
                    }}
                />
                {errors.largeImage && touched.largeImage && (
                    <div className="error-message">{errors.largeImage}</div>
                )}

                <label htmlFor="price">Price per day</label>
                <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Price per day"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.price && touched.price && (
                    <div className="error-message">{errors.price}</div>
                )}

                <label htmlFor="minDays">Maximum Capacity</label>
                <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    placeholder="Maximum Capacity"
                    value={values.capacity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.capacity && touched.capacity && (
                    <div className="error-message">{errors.capacity}</div>
                )}

                <label htmlFor="minDays">Minimum Days</label>
                <input
                    id="minDays"
                    name="minDays"
                    type="number"
                    placeholder="Minimum Days"
                    value={values.minDays}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.minDays && touched.minDays && (
                    <div className="error-message">{errors.minDays}</div>
                )}

                <label htmlFor="maxDays">Maximum Days</label>
                <input
                    id="maxDays"
                    name="maxDays"
                    type="number"
                    placeholder="Maximum Days"
                    value={values.maxDays}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.maxDays && touched.maxDays && (
                    <div className="error-message">{errors.maxDays}</div>
                )}

                <label htmlFor="city">City</label>
                <div className="city-search-wrapper">
                    <input
                        id="citySearch"
                        name="citySearch"
                        type="text"
                        placeholder="Search City"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onClick={handleSearchClick}
                    />
                    <div className="citiesList" ref={ref}>
                        {filteredCities.length > 0 && (
                            <ul className="city-dropdown">
                                {filteredCities.map((city) => (
                                    <li
                                        key={city._id}
                                        onClick={() => handleCitySelect(city.name, city._id as string)}
                                    >
                                        {city.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                {errors.city && touched.city && (
                    <div className="error-message">{errors.city as string}</div>
                )}

                <button type="submit" className="submit-button">
                    {submitText}
                </button>
            </form>
        </div>
    );
};

export default HotelForm;
