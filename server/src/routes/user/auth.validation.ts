// src/routes/user/auth.validation.ts
import { checkSchema } from 'express-validator';
import { findUserByEmail } from '../../models/user/users.mongo'; // Import the function to find a user by email

export const signUpSchema = checkSchema({
    firstName: {
        notEmpty: {
            errorMessage: 'First name is required',
        },
    },
    lastName: {
        notEmpty: {
            errorMessage: 'Last name is required',
        },
    },
    email: {
        isEmail: {
            errorMessage: 'Please include a valid email',
        },
        custom: {
            options: async (email) => {
                const user = await findUserByEmail(email);
                if (user) {
                    return Promise.reject('Email already exists');
                }
            },
        },
    },
    password: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'Password must be at least 6 characters long',
        },
    },
    role: {
        optional: true,
        isIn: {
            options: [['admin', 'traveler', 'host']],
            errorMessage: 'Role must be one of admin, traveler, or host',
        },
    },
});

export const signInSchema = checkSchema({
    email: {
        isEmail: {
            errorMessage: 'Please include a valid email',
        },
    },
    password: {
        notEmpty: {
            errorMessage: 'Password is required',
        },
    },
});
