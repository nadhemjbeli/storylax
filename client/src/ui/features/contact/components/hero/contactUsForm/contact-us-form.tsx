import React, {useState} from 'react';
import "./contact-us-form.scss"
import {strings} from "../../../../../../i18n/strings.ts";
import {useFormik} from "formik";
import {contactUsSchema} from "../../../../../../schemas/contact-us";

const ContactUsForm : React.FC = () => {


    const onSubmit = async (values, actions) => {
        console.log(values);
        await new Promise((resolve)=>setTimeout(resolve, 1000))
        actions.resetForm()
    };
    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues:{
            name: "",
            email: "",
            object: "",
            message:""
        },
        validationSchema: contactUsSchema,
        onSubmit
    })
    return (
        <div className="right contact-us-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">{strings.contactUs.form.name} <span className="required-item">*</span></label>
                    <input
                        type="text"
                        id="name"
                        className={`form-item ${errors.name && touched.name? "input-error":""}`}
                        placeholder={`Enter your ${strings.contactUs.form.name}`}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.name && touched.name &&
                        <p className="error">
                            {errors.name}
                        </p>
                    }
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">{strings.contactUs.form.email} <span className="required-item">*</span></label>
                    <input
                        type="email"
                        id="email"
                        className={`form-item ${errors.email && touched.email? "input-error":""}`}
                        placeholder={`Enter your ${strings.contactUs.form.email}`}
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && touched.email &&
                        <p className="error">
                            {errors.email}
                        </p>
                    }
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="object">{strings.contactUs.form.object}</label>
                    <input
                        className={`form-item ${errors.object && touched.object? "input-error":""}`}
                        type="text"
                        id="object"
                        placeholder={`Enter your ${strings.contactUs.form.object}`}
                        value={values.object}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.object && touched.object &&
                        <p className="error">
                            {errors.object}
                        </p>
                    }
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="message">{strings.contactUs.form.message} <span className="required-item">*</span></label>
                    <textarea
                        className={`form-item ${errors.message && touched.message? "input-error":""}`}
                        id="message"
                        placeholder={`Your ${strings.contactUs.form.message}`}
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // required
                    />
                    {errors.message && touched.message &&
                        <p className="error">
                            {errors.message}
                        </p>
                    }
                </div>
                <button disabled={isSubmitting} className="form-button" type="submit">{strings.contactUs.form.submit}</button>
            </form>
        </div>
    );
};

export default ContactUsForm;