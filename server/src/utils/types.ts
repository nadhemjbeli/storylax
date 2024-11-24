// src/utils/types.ts

// Define a custom error type
import {Response} from "express";

export interface ICustomError extends Error {
    message: string;
}


export const handleError = (res: Response, error: unknown) => {
    const err = error as ICustomError;
    res.status(400).json({ error: err.message || 'An unknown error occurred' });
};