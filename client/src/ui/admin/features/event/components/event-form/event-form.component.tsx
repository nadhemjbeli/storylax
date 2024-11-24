// src/ui/admin/features/event/components/event-form/event-form.component.tsx
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import './event-form.style.scss';
import { getCitiesData, ICitySchema } from '../../../../../../data/city.data.ts';
import { useOutsideClick } from '../../../../../../hooks/useOutsideClick.tsx';
import ReactQuillComponent from '../../../../components/react-quill/react-quill.component.tsx';
import { EventUpdateFormSchema } from '../../../../../../schemas/event/event.schema.ts';
import { IAddEvent } from '../../../../../../data/explore/events.data.ts';

interface EventFormProps {
    onSubmit: (values: IAddEvent) => void;
    submitText: string;
    title: string;
    event: IAddEvent;
}

const formatDateTime = (dateString: string | undefined) => {
    if (!dateString) return ''; // Return empty string if the date is undefined or null

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ''; // Return empty string if the date is invalid

    return date.toISOString().slice(0, 16); // Format the date as "YYYY-MM-DDTHH:MM"
};

const EventForm: React.FC<EventFormProps> = ({ event, title, submitText, onSubmit }) => {
    const [cities, setCities] = useState<ICitySchema[]>([]);
    const [filteredCities, setFilteredCities] = useState<ICitySchema[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(event.city ? event.city?.name : '');

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
        setSearchQuery(event.city ? event.city?.name : '');
    }, [event]);

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setValues,
    } = useFormik({
        initialValues: {
            title: event.title || '',
            description: event.description || '',
            resume: event.resume || '',
            city: event.city || '',
            defaultImage: '',
            smallImage: '',
            mediumImage: '',
            largeImage: '',
            startDate: event.startDate || '',
            endDate: event.endDate || '',
        },
        validationSchema: EventUpdateFormSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    useEffect(() => {
        setValues({ ...event, city: event.city._id });
        console.log(event.startDate)
    }, [event]);

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

    const handleCitySelect = (cityId: string, cityName: string) => {
        setSearchQuery(cityName);
        setFilteredCities([]);
        setFieldValue('city', cityId);
    };

    return (
        <div className="add-event">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    placeholder="Event Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.title && touched.title && (
                    <div className="error-message">{errors.title}</div>
                )}

                <label htmlFor="description">Description</label>
                <ReactQuillComponent
                    value={values.description}
                    onChange={(content) => setFieldValue('description', content)}
                />
                {errors.description && touched.description && (
                    <div className="error-message">{errors.description}</div>
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

                <label htmlFor="resume">Resume</label>
                <textarea
                    id="resume"
                    name="resume"
                    placeholder="Event Resume"
                    value={values.resume}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.resume && touched.resume && (
                    <div className="error-message">{errors.resume}</div>
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
                                        onClick={() => handleCitySelect(city._id as string, city.name)}
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

                <label htmlFor="startDate">Start Date</label>
                <input
                    id="startDate"
                    name="startDate"
                    type="datetime-local"
                    value={formatDateTime(values.startDate)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.startDate && touched.startDate && (
                    <div className="error-message">{errors.startDate}</div>
                )}

                <label htmlFor="endDate">End Date</label>
                <input
                    id="endDate"
                    name="endDate"
                    type="datetime-local"
                    value={formatDateTime(values.endDate)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.endDate && touched.endDate && (
                    <div className="error-message">{errors.endDate}</div>
                )}

                <button type="submit" className="submit-button">
                    {submitText}
                </button>
            </form>
        </div>
    );
};

export default EventForm;
