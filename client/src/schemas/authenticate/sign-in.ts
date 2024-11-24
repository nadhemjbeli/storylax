import * as Yup from 'yup';

// let passwordChars = 5
export const signInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        // .min(passwordChars, `Password is too short - should be ${passwordChars} chars minimum.`)
        .required('Required'),
});