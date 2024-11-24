// src/routes/explore-place/explore-places.controller.ts
import { Request, Response } from 'express';
import {
    getAllMapsFromDB,
    getMapByIdFromDB,
    createMapInDB,
    updateMapInDB,
    deleteMapInDB,
    updateMapDetailInDB,
    deleteMapDetailInDB,
    createMapDetailInDB,
    getMapDetailByIdFromDB,
    getAllMapDetailsFromDB
} from '../../models/explore-place-map/explore-place-maps.mongo';
import { ICustomError } from '../../utils/types'; // Assuming a custom error type is defined

const handleError = (res: Response, error: unknown) => {
    const err = error as ICustomError;
    res.status(400).json({ error: err.message || 'An unknown error occurred' });
};

export const getAllMaps = async (_req: Request, res: Response) => {
    try {
        const maps = await getAllMapsFromDB();
        res.status(200).json(maps);
    } catch (error) {
        handleError(res, error);
    }
};

export const getMapById = async (req: Request, res: Response) => {
    try {
        const map = await getMapByIdFromDB(req.params.id);
        if (!map) {
            return res.status(404).json({ error: 'Map not found' });
        }
        res.status(200).json(map);
    } catch (error) {
        handleError(res, error);
    }
};

export const createMap = async (req: Request, res: Response) => {
    try {
        const newMap = await createMapInDB(req.body);
        res.status(201).json(newMap);
    } catch (error) {
        handleError(res, error);
    }
};

export const updateMap = async (req: Request, res: Response) => {
    try {
        const updatedMap = await updateMapInDB(req.params.id, req.body);
        if (!updatedMap) {
            return res.status(404).json({ error: 'Map not found' });
        }
        res.status(200).json(updatedMap);
    } catch (error) {
        handleError(res, error);
    }
};

export const deleteMap = async (req: Request, res: Response) => {
    try {
        const deletedMap = await deleteMapInDB(req.params.id);
        if (!deletedMap) {
            return res.status(404).json({ error: 'Map not found' });
        }
        res.status(200).json({ message: 'Map deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};

// For ExplorePlaceMapDetail
export const getAllMapDetails = async (_req: Request, res: Response) => {
    try {
        const mapDetails = await getAllMapDetailsFromDB();
        res.status(200).json(mapDetails);
    } catch (error) {
        handleError(res, error);
    }
};

export const getMapDetailById = async (req: Request, res: Response) => {
    try {
        const mapDetail = await getMapDetailByIdFromDB(req.params.id);
        if (!mapDetail) {
            return res.status(404).json({ error: 'Map detail not found' });
        }
        res.status(200).json(mapDetail);
    } catch (error) {
        handleError(res, error);
    }
};

export const createMapDetail = async (req: Request, res: Response) => {
    try {
        const newMapDetail = await createMapDetailInDB(req.body);
        res.status(201).json(newMapDetail);
    } catch (error) {
        handleError(res, error);
    }
};

export const updateMapDetail = async (req: Request, res: Response) => {
    try {
        const updatedMapDetail = await updateMapDetailInDB(req.params.id, req.body);
        if (!updatedMapDetail) {
            return res.status(404).json({ error: 'Map detail not found' });
        }
        res.status(200).json(updatedMapDetail);
    } catch (error) {
        handleError(res, error);
    }
};

export const deleteMapDetail = async (req: Request, res: Response) => {
    try {
        const deletedMapDetail = await deleteMapDetailInDB(req.params.id);
        if (!deletedMapDetail) {
            return res.status(404).json({ error: 'Map detail not found' });
        }
        res.status(200).json({ message: 'Map detail deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};