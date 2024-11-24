// src/models/hotel/hotel-review/hotel-reviews.mongo.ts

import { HotelRating, IHotelRating } from "./hotel-reviews.model";

export const createHotelRating = async (ratingData: Partial<IHotelRating>) => {
    const rating = new HotelRating(ratingData);
    return await rating.save();
};

export const getRatingsByHotel = async (hotelId: string) => {
    return await HotelRating.find({ hotel: hotelId }).populate('user').sort({ createdAt: -1 });
};

export const getRatingById = async (id: string) => {
    return await HotelRating.findById(id).populate('user').populate('hotel');
};

export const updateRatingById = async (id: string, updateData: Partial<IHotelRating>) => {
    return await HotelRating.findByIdAndUpdate(id, { ...updateData, updatedAt: Date.now() }, { new: true });
};

export const deleteRatingById = async (id: string) => {
    return await HotelRating.findByIdAndDelete(id);
};
