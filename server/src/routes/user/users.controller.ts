// src/routes/user/users.controller.ts
import { Request, Response } from 'express';
import {
    createUser,
    findUserByEmail,
    getAllUsers,
    findUserById,
    updateUserById,
    deleteUserById,
    findUserByEmailAndRole, checkResetPassword, findUserByEmailAndProvider, updateUserByIdHasInterests
} from '../../models/user/users.mongo';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import {IUser, User} from "../../models/user/users.model";
import {sendEmail} from "../../services/email";
import { randomBytes } from 'crypto';
import {frontUrl} from "../../services/urls";

// Define the secret for JWT (ensure this is stored securely in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
};

// Create a new user
export const addUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (await findUserByEmail(email)) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const user = await createUser({ name, email, password } as any);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await findUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user' });
    }
};

// Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await updateUserById(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

// Update a user by ID
export const updateUserHasInterestsController = async (req: Request, res: Response) => {
    try {
        const updatedUser = await updateUserByIdHasInterests(((req.user as IUser)._id as string));
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await deleteUserById(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

// User Sign-Up
export const signUp = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, password, role, hostSpecificField } = req.body;

        if (await findUserByEmail(email)) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = role === "host"?await createUser({ firstName, lastName, email, role, password: hashedPassword, hostSpecificField }):
            await createUser({ firstName, lastName, email, password: hashedPassword })
        ;


        // Generate a token
        // const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
        // Set the token as a cookie
        res.cookie('storylax-token', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

// User Sign-In
export const signIn = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await findUserByEmailAndProvider(email, 'email');

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a token
        // const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        const token = jwt.sign({ id: user._id, hasInterests: user.hasInterests, role: user.role }, JWT_SECRET);
        // Set the token as a cookie
        console.log(token)
        res.cookie('storylax-token', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        console.log("cookie set")
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Error signing in' });
    }
};

// Generate a random token
const generateResetToken = () => {
    return randomBytes(32).toString('hex');
};

// Forgot Password
export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await findUserByEmailAndProvider(email,'email');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a password reset token and expiration
        const resetToken = generateResetToken();
        const resetTokenExpiration = Date.now() + 3600000; // 1 hour from now

        // Update user with reset token and expiration
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiration;
        await user.save();

        // Send reset email
        const resetLink = `${frontUrl}/reset-password/${resetToken}`;
        const subject = 'Password Reset Request';
        const text = `You are receiving this because you (or someone else) have requested a password reset. Please click the link to reset your password: ${resetLink}`;
        const html = `<p>You are receiving this because you (or someone else) have requested a password reset.</p><p>Please click this <a href="http://localhost:3009/reset-password/${resetToken}" style="color: #4a3aff">link</a> to reset your password:</p>`;

        await sendEmail(email, subject, html);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending password reset email' });
    }
};

// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, newPassword } = req.body;

        // Find user by reset token and check if it hasn't expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {$gt: Date.now()},
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid' });
        }
        // Hash new password
        console.log(newPassword)
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        console.log(user)
        await user.save();



        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password' });
    }
};
