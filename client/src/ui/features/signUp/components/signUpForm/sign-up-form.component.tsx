import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import "./sign-up-form.style.scss";
import { signUpSchema } from "../../../../../schemas/authenticate/sign-up/sign-up.schema.ts";
import { ReactComponent as Eye } from "../../../../../assets/svg/eye.svg";
import { ReactComponent as EyeSlash } from "../../../../../assets/svg/eye-slash.icon.svg";
import {Link, useNavigate} from "react-router-dom";
import { replaceSpace } from "../../../../../utils/string-manipulation.ts";
import { strings } from "../../../../../i18n/strings.ts";
import {authTravelerIcons, authHostIcons} from "../../../../../data/authentication/sign-in.icons.tsx";
import api from "../../../../../utils/api.ts";
import IUserSchema from "../../../../../schemas/authenticate/sign-up/sign-up.interface.ts";

const SignUpForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formType, setFormType] = useState<'traveler' | 'host'>('traveler');
    const [formError, setFormError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (values: IUserSchema, actions: any) => {
        console.log(values);
        let signUpForm:IUserSchema = {
            firstName:values.firstName,
            lastName:values.lastName,
            email:values.email,
            password:values.password,
            role:formType
        }
        signUpForm =formType === "host"?{...signUpForm,hostSpecificField:values.hostSpecificField}:signUpForm
        console.log(signUpForm)
        try{
            await api.post('auth/sign-up', signUpForm).then(response=>{

                // Perform additional actions after login, such as redirecting the user
                console.log('Sign Up successful:', response.data);
                navigate("/");

                // Reset the form
                actions.resetForm();
            })

        } catch (error: any) {
            console.error('Error during sign up:', error);
            const errorMessage = error?.response?.data?.errors[0]?.msg || 'An error occurred during sign up.';
            setFormError(errorMessage);
            actions.setSubmitting(false);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // actions.resetForm();
    };

    const onChangeForm = (newFormType: 'traveler' | 'host', resetForm: any) => {
        if(formType !== newFormType) {
            setFormError(null)
            setFormType(newFormType);
            resetForm({
                values: {
                    firstName:'',
                    lastName:'',
                    email: '',
                    password: '',
                    confirmPassword: '', ...(newFormType === 'host' && {hostSpecificField: ''})
                }
            });
        }
    };

    useEffect(() => {
        if (formRef.current) {
            formRef.current.style.height = 'auto'; // Reset to auto to get the correct scrollHeight
            const height = formRef.current.scrollHeight;
            formRef.current.style.height = `${height}px`;
        }
    }, [formType]);

    return (
        <div className="sign-up-form-section">
            <h1>{strings.authentication.signUp.joinUsToday}</h1>
            <Formik
                initialValues={{firstName:'', lastName:'', email: '', password: '', confirmPassword: '', ...(formType === 'host' && { hostSpecificField: '' }) }}
                validationSchema={signUpSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, resetForm }) => (
                    <Form className="sign-up-form" noValidate ref={formRef}>
                        <div className="form-type-toggle">
                            <button
                                type="button"
                                className={`form-type-button ${formType === 'traveler' ? 'active' : ''}`}
                                onClick={() => onChangeForm('traveler', resetForm)}
                            >
                                {strings.authentication.signUp.traveler}
                            </button>
                            <button
                                type="button"
                                className={`form-type-button ${formType === 'host' ? 'active' : ''}`}
                                onClick={() => onChangeForm('host', resetForm)}
                            >
                                {strings.authentication.signUp.host}
                            </button>
                        </div>
                        <div className="form-group">
                            <label className="label" htmlFor="firstName">First Name</label>
                            <Field name="firstName">
                                {({ field, meta }: FieldProps) => (
                                    <input
                                        type="text"
                                        placeholder={strings.authentication.signUp.enterYourFirstName}
                                        {...field}
                                        className={`input ${meta.touched && meta.error ? 'error' : ''}`}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="firstName" component="div" className="error-message" />
                        </div>
                        <div className="form-group">
                            <label className="label" htmlFor="firstName">Last Name</label>
                            <Field name="lastName">
                                {({ field, meta }: FieldProps) => (
                                    <input
                                        type="text"
                                        placeholder={strings.authentication.signUp.enterYourLastName}
                                        {...field}
                                        className={`input ${meta.touched && meta.error ? 'error' : ''}`}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="lastName" component="div" className="error-message" />
                        </div>
                        {formType === 'host' && (
                            <div className="form-group">
                                <label className="label" htmlFor="hostSpecificField">Host Specific Field</label>
                                <Field name="hostSpecificField">
                                    {({ field, meta }: FieldProps) => (
                                        <input
                                            type="text"
                                            placeholder={"Enter host specific information"}
                                            {...field}
                                            className={`input ${meta.touched && meta.error ? 'error' : ''}`}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="hostSpecificField" component="div" className="error-message" />
                            </div>
                        )}
                        <div className="form-group">
                            <label className="label" htmlFor="email">Email</label>
                            <Field name="email">
                                {({ field, meta }: FieldProps) => (
                                    <input
                                        type="email"
                                        placeholder={strings.authentication.signUp.enterYourEmail}
                                        {...field}
                                        className={`input ${meta.touched && meta.error|| formError ==="Email already exists" ? 'error' : ''}`}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="email" component="div" className="error-message" />
                            {formError ==="Email already exists" && (
                                <div className="form-error-message">
                                    {formError}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label className="label" htmlFor="password">{strings.authentication.signUp.password}</label>
                            <div className="password-wrapper">
                                <Field name="password">
                                    {({ field, meta }: FieldProps) => (
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder={strings.authentication.signUp.enterYourPassword}
                                            {...field}
                                            className={`input ${meta.touched && meta.error ? 'error' : ''}`}
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
                        <div className="form-group">
                            <label className="label" htmlFor="confirmPassword">{strings.authentication.signUp.confirmPassword}</label>
                            <div className="password-wrapper">
                                <Field name="confirmPassword">
                                    {({ field, meta }: FieldProps) => (
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder={strings.authentication.signUp.confirmYourPassword}
                                            {...field}
                                            className={`input ${meta.touched && meta.error ? 'error' : ''}`}
                                        />
                                    )}
                                </Field>
                                {showPassword ?
                                    <Eye className="toggle-password-icon" onClick={togglePasswordVisibility} />
                                    :
                                    <EyeSlash className="toggle-password-icon" onClick={togglePasswordVisibility} />
                                }
                            </div>
                            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                        </div>
                        {formError !=="Email already exists" && (
                            <div className="form-error-message">
                                {formError}
                            </div>
                        )}
                        <button className="primary-button" type="submit" disabled={isSubmitting}>
                            Sign Up
                        </button>
                        <div className="sign-in-option">
                            {strings.authentication.signUp.alreadyHaveAccount} <Link to={`/${replaceSpace(strings.navbar.signin)}`} className="sign-in-link">Sign in</Link>
                        </div>
                        <div className="separator">
                            <hr className="hr" />
                            <span className="sign-up-with">{strings.authentication.signUp.orSignUpWith}</span>
                            <hr className="hr" />
                        </div>
                        {formType==='traveler'?

                            <div className="social-login">
                                {authTravelerIcons.map(icon=>(
                                    <button className={`social-button ${icon.class}`} key={icon.id} onClick={()=>{
                                        setTimeout(()=>{
                                            window.location.href = `${icon.link}/`
                                        },300)
                                    }}>
                                        {icon.icon}
                                    </button>
                                ))}
                            </div>:

                            <div className="social-login">
                                {authHostIcons.map(icon=>(
                                    <button className={`social-button ${icon.class}`} key={icon.id} onClick={()=>{
                                        setTimeout(()=>{
                                            window.location.href = `${icon.link}`
                                        },300)
                                    }}>
                                        {icon.icon}
                                    </button>
                                ))}
                            </div>
                        }
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignUpForm;
