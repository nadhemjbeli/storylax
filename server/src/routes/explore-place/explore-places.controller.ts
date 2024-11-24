// src/routes/explore-place/explore-places.controller.ts

import { Request, Response } from 'express';
import { createPlace, getAllPlaces, getPlaceById, updatePlaceById, deletePlaceById } from '../../models/explore-place/explore-places.mongo';
import { ICustomError } from '../../utils/types'; // Assuming a custom error type is defined

const handleError = (res: Response, error: unknown) => {
    const err = error as ICustomError;
    res.status(400).json({ error: err.message || 'An unknown error occurred' });
};

export const createPlaceController = async (req: Request, res: Response) => {
    try {
        const place = await createPlace(req.body);
        res.status(201).json(place);
    } catch (error) {
        handleError(res, error);
    }
};

export const getAllPlacesController = async (_req: Request, res: Response) => {
    try {
        const places = await getAllPlaces();
        res.status(200).json(places);
    } catch (error) {
        handleError(res, error);
    }
};

export const getPlaceByIdController = async (req: Request, res: Response) => {
    try {
        const place = await getPlaceById(req.params.id);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }
        res.status(200).json(place);
    } catch (error) {
        handleError(res, error);
    }
};

export const updatePlaceByIdController = async (req: Request, res: Response) => {
    try {
        const place = await updatePlaceById(req.params.id, req.body);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }
        res.status(200).json(place);
    } catch (error) {
        handleError(res, error);
    }
};

export const deletePlaceByIdController = async (req: Request, res: Response) => {
    try {
        const place = await deletePlaceById(req.params.id);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }
        res.status(200).json({ message: 'Place deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};
