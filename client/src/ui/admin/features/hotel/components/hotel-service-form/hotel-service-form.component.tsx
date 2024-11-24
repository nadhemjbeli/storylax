// src/ui/admin/features/hotel/components/hotel-service-form/hotel-service-form.component.tsx
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import './hotel-service-form.style.scss';
import { IAddHotelService } from '../../../../../../data/hotel/hotel.data.ts';

interface HotelServiceFormProps {
    onSubmit: (values: IAddHotelService) => void;
    hotelId: string;
    submitText: string;
    title: string;
    hotelService: IAddHotelService;
}

const HotelServiceForm: React.FC<HotelServiceFormProps> = ({ hotelService, hotelId, title, submitText, onSubmit }) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
    } = useFormik<IAddHotelService>({
        initialValues: {
            name: '',
            hotel: hotelId,
        },
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    useEffect(() => {
        setValues({ ...hotelService, hotel: hotelId });
    }, [hotelService, hotelId, setValues]);

    return (
        <div className="add-hotel-service">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className="hotel-service-form">
                <label htmlFor="name">Service Name</label>
                <input
                    id="name"
                    name="name"
                    placeholder="Service Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.name && touched.name && (
                    <div className="error-message">{errors.name}</div>
                )}

                <button type="submit" className="submit-button">
                    {submitText}
                </button>
            </form>
        </div>
    );
};

export default HotelServiceForm;
