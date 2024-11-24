// src/models/explore-place/explore-places.mongo.ts
import {ExplorePlace as Place, IExplorePlace} from './explore-places.model';

// Create a new place
export const createPlace = async (placeData: Partial<IExplorePlace>) => {
    const place = new Place(placeData);
    return await place.save();
};

// Get all places
export const getAllPlaces = async () => {
    return await Place.find().populate('city');
};

// Get a place by ID
export const getPlaceById = async (id: string) => {
    return await Place.findById(id).populate('city');
};

// Update a place by ID
export const updatePlaceById = async (id: string, updateData: Partial<IExplorePlace>) => {
    return await Place.findByIdAndUpdate(id, { ...updateData, updatedAt: Date.now() }, { new: true });
};

// Delete a place by ID
export const deletePlaceById = async (id: string) => {
    return await Place.findByIdAndDelete(id);
};
