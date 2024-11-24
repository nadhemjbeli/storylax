import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import "./sign-in-form.style.scss";
import { signInSchema } from "../../../../../schemas/authenticate/sign-in.ts";
import { ReactComponent as Eye } from "../../../../../assets/svg/eye.svg";
import { ReactComponent as EyeSlash } from "../../../../../assets/svg/eye-slash.icon.svg";
import { Link } from "react-router-dom";
import Modal from "../../../../components/modal/modal.component.tsx";
import { forgotPasswordSchema } from "../../../../../schemas/authenticate/forgot-password.ts";
import { replaceSpace } from "../../../../../utils/string-manipulation.ts";
import { strings } from "../../../../../i18n/strings.ts";
import {signInIcons} from "../../../../../data/authentication/sign-in.icons.tsx";
import api from "../../../../../utils/api.ts";

const SignInForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null); // New state for notification
    const [errorNotification, setErrorNotification] = useState<string | null>(null); // New state for notification


    const handleModalClose = () => {
        setShowModal(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (values: any, actions: any) => {
        setFormError(null);  // Reset form error on new submission
        try {
            await api.post('/auth/sign-in', {
                email: values.email,
                password: values.password,
            }).then(response => {
                // Perform additional actions after login, such as redirecting the user
                console.log('Login successful:', response.data);
                // navigate("/");
                window.location.href = '/'

                // Reset the form
                actions.resetForm();
            });


        } catch (error: any) {
            console.error('Error during login:', error);
            const errorMessage = error?.response?.data?.message || 'An error occurred during login.';
            setFormError(errorMessage);
            actions.setSubmitting(false);
        }
    };

    const onSubmitForgotPassword = async (values: any, actions: any) => {
        try {
            // Make a POST request to the /auth/forgot-password endpoint
            await api.post('/auth/forgot-password', { email: values.email });

            // Show success notification
            setNotification('Email sent successfully! Please check your mail.');

            actions.resetForm();
            handleModalClose();
        } catch (error) {
            console.error('Error sending reset email:', error);
            // Show error notification
            setErrorNotification(error['response']['data']['message']||'Error occurred while sending email.');
        } finally {
            // Hide notification after 5 seconds
            setTimeout(() => {
                setNotification(null)
                setErrorNotification(null)
            }, 5000);

        }
    };

    return (
        <div className="sign-in-form-section">
            <h1>{strings.authentication.signIn.welcomeBack}</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={signInSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="sign-in-form" noValidate>
                        <div className="form-group">
                            <label className="label" htmlFor="email">Email</label>
                            <Field name="email">
                                {({ field, meta }: FieldProps) => (
                                    <input
                                        type="email"
                                        placeholder={strings.authentication.signIn.enterYourEmail}
                                        {...field}
                                        className={`input ${(meta.touched && meta.error) || formError ? 'error' : ''}`}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>
                        <div className="form-group">
                            <label className="label" htmlFor="password">{strings.authentication.signIn.password}</label>
                            <div className="password-wrapper">
                                <Field name="password">
                                    {({ field, meta }: FieldProps) => (
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder={strings.authentication.signIn.enterYourPassword}
                                            {...field}
                                            className={`input ${(meta.touched && meta.error) || formError ? 'error' : ''}`}
                                        />
                                    )}
                                </Field>
                                {showPassword ?
                                    <Eye className="toggle-password-icon" onClick={togglePasswordVisibility} />
                                    :
                                    <EyeSlash className="toggle-password-icon" onClick={togglePasswordVisibility} />
                                }
                            </div>
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>
                        {formError && (
                            <div className="form-error-message">
                                {formError}
                            </div>
                        )}
                        <div className="form-group password">
                            <div className="remember-me">
                                <Field type="checkbox" id="rememberMe" name="rememberMe" className="checkbox" />
                                <label htmlFor="rememberMe" className="checkbox-label">{strings.authentication.signIn.rememberMe}</label>
                            </div>
                            <span className="forgot-password" onClick={() => {
                                setShowModal(true)
                            }}>{strings.authentication.signIn.forgotPassword}</span>
                        </div>
                        <button className="primary-button" type="submit" disabled={isSubmitting}>
                            Login
                        </button>
                        <div className="sign-up-option">
                            {strings.authentication.signIn.dontHaveAccount} <Link to={`/${replaceSpace(strings.navbar.signup)}`} className="sign-up-link">Sign up</Link>
                        </div>
                        <div className="separator">
                            <hr className="hr" />
                            <span className="login-with">{strings.authentication.signIn.orLoginWith}</span>
                            <hr className="hr" />
                        </div>
                        <div className="social-login">
                            {signInIcons.map(icon => (
                                <button
                                    className={`social-button ${icon.class}`}
                                    key={icon.id}
                                    onClick={()=>window.location.href = icon.link}
                                >
                                    {icon.icon}
                                </button>
                            ))}
                        </div>
                    </Form>
                )}
            </Formik>
            <Modal isOpen={showModal} onClose={handleModalClose}>
                <h2 className="forgot-title">{strings.authentication.signIn.modalPassword.passwordForgot}</h2>
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={forgotPasswordSchema}
                    onSubmit={onSubmitForgotPassword}
                >
                    <Form
                        className={"forgot-password-form"} noValidate>
                        <div className="form-group">
                            <Field name="email">
                                {({ field, meta }: FieldProps) => (
                                    <input
                                        type="email"
                                        placeholder={"Enter your email"}
                                        {...field}
                                        className={`input ${meta.touched && meta.error ? 'error' : ''}`}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </div>
                        <div className="form-buttons">
                            <button type="button" onClick={handleModalClose} className="cancel-button">
                                {strings.authentication.signIn.modalPassword.cancel}
                            </button>
                            <button type="submit" className="send-button">
                                {strings.authentication.signIn.modalPassword.send}
                            </button>
                        </div>

                        {errorNotification && (
                            <div className="error-notification">
                                {errorNotification}
                            </div>
                        )}
                    </Form>
                </Formik>
            </Modal>
            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}
        </div>
    );
};

export default SignInForm;
