// src/routes/user-interest/user-interests.controller.ts

import { Request, Response } from 'express';
import { ICustomError } from '../../utils/types';
import {
    addUserInterests,
    createUserInterest,
    deleteUserInterestById, getAllUserInterests,
    getUserInterestById, getUserInterestsByUserId,
    updateUserInterestById
} from "../../models/user-interest/user-interests.mongo";
import {IUser} from "../../models/user/users.model"; // Ensure this type is defined and imported

// Helper function to handle errors
const handleError = (res: Response, error: unknown) => {
    const err = error as ICustomError;
    res.status(400).json({ error: err.message || 'An unknown error occurred' });
};

// Create a new userInterest
export const createUserInterestController = async (req: Request, res: Response) => {
    try {
        const userInterest = await createUserInterest(req.body);
        res.status(201).json(userInterest);
    } catch (error) {
        handleError(res, error);
    }
};



// Create a new userInterests
export const addUserInterestsController = async (req: Request, res: Response) => {
    try {
        const userInterest = await addUserInterests(req.params.userId, req.body);
        res.status(201).json(userInterest);
    } catch (error) {
        handleError(res, error);
    }
};

// Get all userInterests
export const getAllUserInterestsController = async (_req: Request, res: Response) => {
    try {
        const userInterests = await getAllUserInterests();
        res.status(200).json(userInterests);
    } catch (error) {
        handleError(res, error);
    }
};

// Get userInterests by User
export const getUserInterestsByUserController = async (req: Request, res: Response) => {
    try {
        const userInterests = await getUserInterestsByUserId(req.params.userId);
        res.status(200).json(userInterests);
    } catch (error) {
        handleError(res, error);
    }
};

// Get userInterests by current User
export const getCurrentUserInterestsByUserController = async (req: Request, res: Response) => {
    try {
        const userInterests = await getUserInterestsByUserId((req.user as IUser)._id as string);
        res.status(200).json(userInterests);
    } catch (error) {
        handleError(res, error);
    }
};

// Get a userInterest by ID
export const getUserInterestByIdController = async (req: Request, res: Response) => {
    try {
        const userInterest = await getUserInterestById(req.params.id);
        if (!userInterest) {
            return res.status(404).json({ error: 'UserInterest not found' });
        }
        res.status(200).json(userInterest);
    } catch (error) {
        handleError(res, error);
    }
};

// Update a userInterest by ID
export const updateUserInterestByIdController = async (req: Request, res: Response) => {
    try {
        const userInterest = await updateUserInterestById(req.params.id, req.body);
        if (!userInterest) {
            return res.status(404).json({ error: 'UserInterest not found' });
        }
        res.status(200).json(userInterest);
    } catch (error) {
        handleError(res, error);
    }
};

// Create a new userInterests with current user
export const addCurrentUserInterestsController = async (req: Request, res: Response) => {
    try {
        console.log('add current')
        const userInterest = await addUserInterests(((req.user as IUser)._id as string), req.body);
        res.status(201).json(userInterest);
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a userInterest by ID
export const deleteUserInterestByIdController = async (req: Request, res: Response) => {
    try {
        const userInterest = await deleteUserInterestById(req.params.id);
        if (!userInterest) {
            return res.status(404).json({ error: 'UserInterest not found' });
        }
        res.status(200).json({ message: 'UserInterest deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};



