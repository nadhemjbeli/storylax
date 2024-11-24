// src/controllers/hotel/hotel-ratings.controller.ts

import { Request, Response } from 'express';
import {
    createHotelRating,
    getRatingsByHotel,
    getRatingById,
    updateRatingById,
    deleteRatingById
} from '../../../models/hotel/hotel-review/hotel-reviews.mongo';
import { ICustomError } from '../../../utils/types';
import { IUser } from "../../../models/user/users.model";
import {Reservation} from "../../../models/hotel/hotel-reservation/hotel-reservations.model";

// Helper function to handle errors
const handleError = (res: Response, error: unknown) => {
    const err = error as ICustomError;
    res.status(400).json({ error: err.message || 'An unknown error occurred' });
};

// Create a new rating
export const createHotelRatingController = async (req: Request, res: Response) => {
    try {
        const { reservationId, hotelId, rating, comment } = req.body;

        // Find the reservation to ensure it exists and hasn't been commented on yet
        const reservation = await Reservation.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        if (reservation.commented) {
            return res.status(400).json({ error: 'Rating already submitted for this reservation' });
        }

        // Create the new rating
        const newRating = await createHotelRating({
            reservation: reservationId,
            hotel: hotelId,
            user: (req.user as IUser)._id,
            rating,
            comment,
        });

        // Update the reservation to mark it as commented
        reservation.commented = true;
        await reservation.save();

        res.status(201).json(newRating);
    } catch (error) {
        handleError(res, error);
    }
};

// Get all ratings for a specific hotel
export const getRatingsByHotelController = async (req: Request, res: Response) => {
    try {
        const ratings = await getRatingsByHotel(req.params.hotelId);
        res.status(200).json(ratings);
    } catch (error) {
        handleError(res, error);
    }
};

// Get a specific rating by ID
export const getRatingByIdController = async (req: Request, res: Response) => {
    try {
        const rating = await getRatingById(req.params.id);
        if (!rating) {
            return res.status(404).json({ error: 'Rating not found' });
        }
        res.status(200).json(rating);
    } catch (error) {
        handleError(res, error);
    }
};

// Update a rating by ID
export const updateRatingByIdController = async (req: Request, res: Response) => {
    try {
        const rating = await updateRatingById(req.params.id, req.body);
        if (!rating) {
            return res.status(404).json({ error: 'Rating not found' });
        }
        res.status(200).json(rating);
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a rating by ID
export const deleteRatingByIdController = async (req: Request, res: Response) => {
    try {
        const rating = await deleteRatingById(req.params.id);
        if (!rating) {
            return res.status(404).json({ error: 'Rating not found' });
        }
        res.status(200).json({ message: 'Rating deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};
