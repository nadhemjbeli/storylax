import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import api from "../../../../utils/api.ts";
import './forgot-password.style.scss';
import { ReactComponent as Eye } from "../../../../assets/svg/eye.svg";
import { ReactComponent as EyeSlash } from "../../../../assets/svg/eye-slash.icon.svg";
import { ResetPasswordSchema } from "../../../../schemas/authenticate/forgot-password.ts";
import {strings} from "../../../../i18n/strings.ts";
import {replaceSpace} from "../../../../utils/string-manipulation.ts";

const ResetPassword: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [formError, setFormError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (values: any, actions: any) => {
        setFormError(null);
        try {
            const response = await api.post('/auth/reset-password', {
                token,
                newPassword: values.newPassword,
            });

            setSuccessMessage(response.data.message);
            actions.resetForm();
            // Redirect to sign-in after a successful password reset
            setTimeout(() => {
                navigate(`/${replaceSpace(strings.navbar.signin)}`);
            }, 3000);
        } catch (error: any) {
            console.error('Error resetting password:', error);
            const errorMessage = error?.response?.data?.message || 'Error resetting password';
            setFormError(errorMessage);
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <div className="reset-password">
            <h2 className="title">Reset Password</h2>
            <Formik
                initialValues={{ newPassword: '', confirmPassword: '' }}
                validationSchema={ResetPasswordSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="reset-password-form" noValidate>
                        <div className="form-group">
                            <label>New Password</label>
                            <div className="password-wrapper">
                                <Field name="newPassword">
                                    {({ field, meta }: FieldProps) => (
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            {...field}
                                            className={`password ${meta.touched && meta.error ? 'error' : ''}`}
                                            required
                                        />
                                    )}
                                </Field>
                                {showPassword ? (
                                    <Eye className="toggle-password-icon" onClick={togglePasswordVisibility} />
                                ) : (
                                    <EyeSlash className="toggle-password-icon" onClick={togglePasswordVisibility} />
                                )}
                            </div>
                            <ErrorMessage name="newPassword" component="div" className="error-message" />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <div className="password-wrapper">
                                <Field name="confirmPassword">
                                    {({ field, meta }: FieldProps) => (
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            {...field}
                                            className={`${meta.touched && meta.error ? 'error' : ''}`}
                                            required
                                        />
                                    )}
                                </Field>
                                {showPassword ? (
                                    <Eye className="toggle-password-icon" onClick={togglePasswordVisibility} />
                                ) : (
                                    <EyeSlash className="toggle-password-icon" onClick={togglePasswordVisibility} />
                                )}
                            </div>
                            <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                        </div>
                        {formError && <p className="error-form-message">{formError}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        <button type="submit" disabled={isSubmitting}>Reset Password</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ResetPassword;
