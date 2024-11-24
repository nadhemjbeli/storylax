// src/routes/hotel/hotel-services.controller.ts

import { Request, Response } from 'express';
import {
    createHotelService,
    getAllHotelServices,
    getHotelServiceById,
    updateHotelServiceById,
    deleteHotelServiceById, getHotelServicesByHotel, getHotelsByService
} from '../../../models/hotel/hotel-service/hotel-services.mongo';
import { ICustomError } from '../../../utils/types'; // Custom error type

const handleError = (res: Response, error: unknown) => {
    const err = error as ICustomError;
    res.status(400).json({ error: err.message || 'An unknown error occurred' });
};

// Create a new hotel service
export const createHotelServiceController = async (req: Request, res: Response) => {
    try {
        const service = await createHotelService(req.body);
        res.status(201).json(service);
    } catch (error) {
        handleError(res, error);
    }
};

// Get all hotel services
export const getAllHotelServicesController = async (_req: Request, res: Response) => {
    try {
        const services = await getAllHotelServices();
        res.status(200).json(services);
    } catch (error) {
        handleError(res, error);
    }
};

// Get hotels by service
export const getHotelsByServiceController = async (req: Request, res: Response) => {
    try {
        const {service} = req.query
        const hotels = service?await getHotelsByService(service as string):[];
        res.status(200).json(hotels);
    } catch (error) {
        handleError(res, error);
    }
};

// Get all hotel services
export const getHotelServicesByHotelController = async (req: Request, res: Response) => {
    try {
        const services = await getHotelServicesByHotel(req.params.hotelId);
        res.status(200).json(services);
    } catch (error) {
        handleError(res, error);
    }
};

// Get a hotel service by ID
export const getHotelServiceByIdController = async (req: Request, res: Response) => {
    try {
        const service = await getHotelServiceById(req.params.id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        handleError(res, error);
    }
};

// Update a hotel service by ID
export const updateHotelServiceByIdController = async (req: Request, res: Response) => {
    try {
        const service = await updateHotelServiceById(req.params.id, req.body);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a hotel service by ID
export const deleteHotelServiceByIdController = async (req: Request, res: Response) => {
    try {
        const service = await deleteHotelServiceById(req.params.id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};
