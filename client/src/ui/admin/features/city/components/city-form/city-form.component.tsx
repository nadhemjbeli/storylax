import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './city-form.style.scss';
import { ICitySchema } from '../../../../../../data/city.data.ts';

interface CityFormProps {
    onSubmit: (values: ICitySchema) => void;
    submitText: string;
    title: string;
    city: ICitySchema;
}

const CityFormSchema = Yup.object().shape({
    name: Yup.string().required('City name is required'),
    location: Yup.object({
        long: Yup.number()
            .required('Longitude is required')
            .min(-180, 'Longitude must be at least -180')
            .max(180, 'Longitude must be at most 180'),
        lat: Yup.number()
            .required('Latitude is required')
            .min(-90, 'Latitude must be at least -90')
            .max(90, 'Latitude must be at most 90'),
    }),
});

const CityForm: React.FC<CityFormProps> = ({ city, title, submitText, onSubmit }) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
    } = useFormik({
        initialValues: {
            name: city.name || '',
            location: city.location || { long: 0, lat: 0 },
        },
        validationSchema: CityFormSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    useEffect(() => {
        setValues({ ...city });
    }, [city, setValues]);

    return (
        <div className="add-city">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className="city-form">
                <label htmlFor="name">City Name</label>
                <input
                    id="name"
                    name="name"
                    placeholder="City Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.name && touched.name && (
                    <div className="error-message">{errors.name}</div>
                )}

                <label htmlFor="location.long">Longitude</label>
                <input
                    id="location.long"
                    name="location.long"
                    placeholder="Longitude"
                    type="number"
                    value={values.location.long}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.location?.long && touched.location?.long && (
                    <div className="error-message">{errors.location.long}</div>
                )}

                <label htmlFor="location.lat">Latitude</label>
                <input
                    id="location.lat"
                    name="location.lat"
                    placeholder="Latitude"
                    type="number"
                    value={values.location.lat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.location?.lat && touched.location?.lat && (
                    <div className="error-message">{errors.location.lat}</div>
                )}

                <button type="submit" className="submit-button">{submitText}</button>
            </form>
        </div>
    );
};

export default CityForm;
