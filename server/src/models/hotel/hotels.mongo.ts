// src/models/hotel/hotels.mongo.ts

// Create a new hotel
import {Hotel, IHotel} from "./hotels.model";

export const createHotel = async (hotelData: Partial<IHotel>) => {
    console.log(hotelData);
    const hotel = new Hotel(hotelData);
    return await hotel.save();
};

// Get all hotels and manually populate tags
export const getAllHotels = async () => {
    // Fetch all hotels
    const hotels:IHotel[] = await Hotel.find().populate('city').populate('host').sort({updatedAt:-1});

    // Fetch tags for each hotel and attach them
    // const hotelsWithTagsAndImages = await Promise.all(
    //     hotels.map(async (hotel) => {
    //         // Fetch tags associated with the current hotel
    //         // const tags = await HotelTag.find({ hotel: hotel._id });
    //         // Fetch images associated with the current hotel
    //         const images = await getImagesByHotelId(hotel._id as string);
    //         return { ...hotel.toObject(), images }; // Attach tags and images to the hotel object
    //     })
    // );

    return hotels;
};

// Get all hotels
// Get all hotels and manually populate tags
export const getHotelsByCity = async (city:string) => {
    // Fetch all hotels
    const hotels = await Hotel.find({city}).populate('city');

    // // Fetch tags for each hotel and attach them
    // const hotelsWithTags = await Promise.all(
    //     hotels.map(async (hotel) => {
    //         // Fetch tags associated with the current hotel
    //         const tags = await HotelTag.find({ hotel: hotel._id });
    //         return { ...hotel.toObject(), tags }; // Attach tags to the hotel object
    //     })
    // );

    return hotels;
};

// Get host's hotels
export const getHotelsByHost = async (host:string) => {
    // Fetch hotels by host
    console.log('fetching')
    const hotels = await Hotel.find({host}).populate('city');
    console.log('hotels',hotels)
    // // Fetch tags for each hotel and attach them
    // const hotelsWithTags = await Promise.all(
    //     hotels.map(async (hotel) => {
    //         // Fetch tags associated with the current hotel
    //         const tags = await HotelTag.find({ hotel: hotel._id });
    //         return { ...hotel.toObject(), tags }; // Attach tags to the hotel object
    //     })
    // );

    return hotels;
};

// Get a hotel by ID with manually populated tags
export const getHotelById = async (id: string) => {
    // Fetch a single hotel
    const hotel = await Hotel.findById(id).populate('host').populate('city');

    if (!hotel) {
        return null;
    }
    return hotel; // Attach tags and images to the hotel object
};

// Update a hotel by ID
export const updateHotelById = async (id: string, updateData: Partial<IHotel>) => {
    return await Hotel.findByIdAndUpdate(id, {...updateData, updatedAt:Date.now()}, { new: true });
};

// Delete a hotel by ID
export const deleteHotelById = async (id: string) => {
    return await Hotel.findByIdAndDelete(id);
};
