import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import './interest-form.style.scss';
import {BlogTagFormSchema} from "../../../../../../schemas/blog/blog-tag.schema.ts";
import {IUserInterest} from "../../../../../../data/authenticate/user.data.ts";

interface InterestFormProps {
    onSubmit: (values: IUserInterest) => void;
    submitText: string;
    title: string;
    interest: IUserInterest;
}

const AdminInterestForm: React.FC<InterestFormProps> = ({ interest, title, submitText, onSubmit }) => {


    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        // setFieldValue,
        setValues
    } = useFormik({
        initialValues: {
            name: interest.name || '',
        },
        validationSchema: BlogTagFormSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    useEffect(() => {
        console.log(interest)
        setValues(interest);
    }, [interest]);


    return (
        <div className="admin-form">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className="blog-tag-form">
                <label htmlFor="name">Interest:</label>
                <input
                    id="name"
                    name="name"
                    placeholder="Tag Name"
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

export default AdminInterestForm;

