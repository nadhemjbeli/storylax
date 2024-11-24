// src/models/hotel/hotel-service/hotel-services.mongo.ts

import { HotelService, IHotelService } from './hotel-services.model';
import {Hotel, IHotel} from "../hotels.model";

// Create a new hotel service
export const createHotelService = async (serviceData: Partial<IHotelService>) => {
    const service = new HotelService(serviceData);
    return await service.save();
};

// Get all hotel services
export const getAllHotelServices = async () => {
    return await HotelService.find().sort({ name: 1 });
};

// Get hotel services by hotel
export const getHotelServicesByHotel = async (hotelId:string) => {
    return await HotelService.find( {hotel:hotelId})
        .sort({ name: 1 })
        .populate('hotel');
};

// Get hotel services by hotel
export const getHotelServicesByHotelForHotel = async (hotelId:string) => {
    return await HotelService.find( {hotel:hotelId})
        .sort({ name: 1 });
};

// Get a hotel service by ID
export const getHotelServiceById = async (id: string) => {
    return await HotelService.findById(id);
};

// Update a hotel service by ID
export const updateHotelServiceById = async (id: string, updateData: Partial<IHotelService>) => {
    return await HotelService.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a hotel service by ID
export const deleteHotelServiceById = async (id: string) => {
    return await HotelService.findByIdAndDelete(id);
};

// Get hotels by a specific service
export const getHotelsByService = async (serviceName: string): Promise<IHotel[]> => {
    // Step 1: Find services by name
    const services = await HotelService.find({ name: serviceName });

    if (!services || services.length === 0) {
        return []; // Return an empty array if no services are found
    }

    // Step 2: Extract hotel IDs from the services
    const hotelIds = services.map(service => service.hotel);

    // Step 3: Query hotels by their IDs
    const hotels = await Hotel.find({ _id: { $in: hotelIds } }).populate('city').populate('host');

    return hotels;
};
