// src/ui/admin/features/hotel/components/hotel-booking-status-form/hotel-booking-status-form.component.tsx
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import './hotel-booking-status-form.style.scss';
import {IStatusBookingHotel} from "../../../../../../data/hotel/booking-hotel.data.ts";

interface HotelBookingStatusFormProps {
    onSubmit: (values: IStatusBookingHotel) => void;
    submitText: string;
    title: string;
    statusBookingHotel: IStatusBookingHotel;
}

const HotelBookingStatusForm: React.FC<HotelBookingStatusFormProps> = ({ statusBookingHotel, title, submitText, onSubmit }) => {



    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
    } = useFormik<IStatusBookingHotel>({
        initialValues: {
            status: 'in progress', // Added default status
        },
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    useEffect(() => {
        setValues(statusBookingHotel);
    }, [statusBookingHotel]);

    return (
        <div className="add-hotel">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
                <label htmlFor="status">Booking Status</label>
                <select
                    id="status"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <option value="in progress">In Progress</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                </select>
                {errors.status && touched.status && (
                    <div className="error-message">{errors.status}</div>
                )}

                <button type="submit" className="submit-button">
                    {submitText}
                </button>
            </form>
        </div>
    );
};

export default HotelBookingStatusForm;
