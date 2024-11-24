// src/routes/hotel/hotels.controller.ts

import { Request, Response } from 'express';
import {
    createHotel,
    getAllHotels,
    getHotelById,
    updateHotelById,
    deleteHotelById,
    getHotelsByCity, getHotelsByHost
} from '../../models/hotel/hotels.mongo';
import { ICustomError } from '../../utils/types';
import {IUser} from "../../models/user/users.model";
import {recommendHotelsByKNN} from "./hotel-recommendation";
import {
    getHotelServicesByHotel,
    getHotelServicesByHotelForHotel
} from "../../models/hotel/hotel-service/hotel-services.mongo";
import {Hotel, IHotel} from "../../models/hotel/hotels.model";
import {HotelRating} from "../../models/hotel/hotel-review/hotel-reviews.model";

// Helper function to handle errors
const handleError = (res: Response, error: unknown) => {
    const err = error as ICustomError;
    res.status(400).json({ error: err.message || 'An unknown error occurred' });
};

// Create a new hotel
export const createHotelController = async (req: Request, res: Response) => {
    try {
        const hotel = await createHotel({...req.body, host:(req.user as IUser)._id});
        res.status(201).json(hotel);
    } catch (error) {
        handleError(res, error);
    }
};

// Get all hotels
export const getAllHotelsController = async (_req: Request, res: Response) => {
    try {
        const hotels = await getAllHotels();
        res.status(200).json(hotels);
    } catch (error) {
        handleError(res, error);
    }
};


// Get hotels with filters, review count, and average rating
export const getHotelsController = async (req: Request, res: Response) => {
    try {
        const { city, capacity, rooms } = req.query;
        const filter: any = {};

        // Filter by city if it exists
        if (city) {
            filter.city = city;
        }

        // Filter by capacity if it exists
        if (capacity) {
            filter.capacity = { $gte: Number(capacity) };
        }

        // Filter by number of rooms if it exists
        if (rooms) {
            filter.rooms = { $gte: Number(rooms) };
        }

        // Fetch all hotels based on filters
        const hotels: IHotel[] = await Hotel.find(filter)
            .populate('city')
            .populate('host')
            .sort({ updatedAt: -1 });

        // Fetch review count and average rating for each hotel
        const hotelsWithReviews = await Promise.all(
            hotels.map(async (hotel) => {
                const reviews = await HotelRating.find({ hotel: hotel._id });
                const reviewCount = reviews.length;
                const avgRating = reviewCount
                    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount
                    : 0;

                return { ...hotel.toObject(), reviewCount, avgRating };
            })
        );

        res.status(200).json(hotelsWithReviews);
    } catch (error) {
        handleError(res, error);
    }
};

// Get recommended hotels
export const getRecommendedHotelsController = async (req: Request, res: Response) => {
    try {
        const hotels = await recommendHotelsByKNN((req.user as IUser)._id as string);
        res.status(200).json(hotels);
    } catch (error) {
        handleError(res, error);
    }
};

// Get hotels by host
export const getHotelsByHostController = async (req: Request, res: Response) => {
    try {
        const hotels = await getHotelsByHost((req.user as IUser)._id as string);
        res.status(200).json(hotels);
    } catch (error) {
        handleError(res, error);
    }
};

// Get a hotel by ID with related services, review count, and average rating
export const getHotelByIdController = async (req: Request, res: Response) => {
    try {
        const hotel = await getHotelById(req.params.id);

        if (!hotel) {
            return res.status(404).json({ error: 'Hotel not found' });
        }

        // Fetch related hotel services
        const services = await getHotelServicesByHotelForHotel(req.params.id);

        // Fetch reviews for the hotel
        const reviews = await HotelRating.find({ hotel: hotel._id });
        const reviewCount = reviews.length;
        const avgRating = reviewCount
            ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount
            : 0;

        // Include the services and review data in the response
        res.status(200).json({
            ...hotel.toObject(),
            services,
            reviews,
            avgRating
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Get a hotels by city
export const getHotelsByCityController = async (req: Request, res: Response) => {
    try {
        const hotel = await getHotelsByCity(req.params.cityId);
        if (!hotel) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        res.status(200).json(hotel);
    } catch (error) {
        handleError(res, error);
    }
};

// Update a hotel by ID
export const updateHotelByIdController = async (req: Request, res: Response) => {
    try {
        const hotel = await updateHotelById(req.params.id, req.body);
        if (!hotel) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        res.status(200).json(hotel);
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a hotel by ID
export const deleteHotelByIdController = async (req: Request, res: Response) => {
    try {
        const hotel = await deleteHotelById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ error: 'Hotel not found' });
        }
        res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};