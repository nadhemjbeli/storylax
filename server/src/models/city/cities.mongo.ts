// src/models/city/cities.mongo.ts
import { City, ICity } from './cities.model';
import { ICitySchema } from './cities.schema';

// Create a new city
export const createCity = async (cityData: ICitySchema) => {
    const city = new City(cityData);
    return await city.save();
};

// Find a city by name
export const findCityByName = async (name: string) => {
    return await City.findOne({ name });
};

// Get all cities
export const getAllCities = async () => {
    return await City.find();
};

// Find city by ID
export const findCityById = async (id: string) => {
    return await City.findById(id);
};

// Update city by ID
export const updateCityById = async (id: string, updateData: Partial<ICity>) => {
    return await City.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete city by ID
export const deleteCityById = async (id: string) => {
    return await City.findByIdAndDelete(id);
};
