import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('firstName is required'),
    lastName: Yup.string()
        .required('Surname is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
});
