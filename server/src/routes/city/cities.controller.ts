// src/routes/city/cities.controller.ts
import { Request, Response } from 'express';
import { createCity, findCityById, getAllCities, updateCityById, deleteCityById } from '../../models/city/cities.mongo';
import { ICitySchema } from '../../models/city/cities.schema';

// Get all cities
export const getCities = async (req: Request, res: Response) => {
    try {
        const cities = await getAllCities();
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cities' });
    }
};

// Get a city by ID
export const getCityById = async (req: Request, res: Response) => {
    try {
        const city = await findCityById(req.params.id);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch city' });
    }
};

// Add a new city
export const addCity = async (req: Request, res: Response) => {
    try {
        const cityData: ICitySchema = req.body;
        const city = await createCity(cityData);
        res.status(201).json(city);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create city' });
    }
};

// Update a city by ID
export const updateCity = async (req: Request, res: Response) => {
    try {
        const city = await updateCityById(req.params.id, req.body);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update city' });
    }
};

// Delete a city by ID
export const deleteCity = async (req: Request, res: Response) => {
    try {
        const city = await deleteCityById(req.params.id);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.status(200).json({ message: 'City deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete city' });
    }
};
