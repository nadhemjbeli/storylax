// src/ui/admin/features/event/components/event-form/event-form.component.tsx
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import './event-card-form.style.scss';
import { getCitiesData, ICitySchema } from '../../../../../../data/city.data.ts';
import { useOutsideClick } from '../../../../../../hooks/useOutsideClick.tsx';
import ReactQuillComponent from '../../../../components/react-quill/react-quill.component.tsx';
import {EventCardFormSchema, EventUpdateFormSchema} from '../../../../../../schemas/event/event.schema.ts';
import {IAddEvent, IAddEventCard} from '../../../../../../data/explore/events.data.ts';

interface EventCardFormProps {
    onSubmit: (values: IAddEventCard) => void;
    submitText: string;
    title: string;
    eventCard: IAddEventCard;
}


const EventCardForm: React.FC<EventCardFormProps> = ({ eventCard, title, submitText, onSubmit }) => {

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
            image:'',
            name:'',
            event:'',
        },
        validationSchema: EventCardFormSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    useEffect(() => {
        setValues({ ...eventCard, event: eventCard.event });
    }, [eventCard]);

    return (
        <div className="add-event">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="name"
                    placeholder="EventCard Title"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.name && touched.name && (
                    <div className="error-message">{errors.name}</div>
                )}

                <label htmlFor="image">Image</label>
                <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        if (event.currentTarget.files) {
                            setFieldValue('image', event.currentTarget.files[0]);
                        }
                    }}
                />
                {errors.image && touched.image && (
                    <div className="error-message">{errors.image}</div>
                )}

                <button type="submit" className="submit-button">
                    {submitText}
                </button>
            </form>
        </div>
    );
};

export default EventCardForm;
