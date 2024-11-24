// src/models/hotel/hotel-booking/hotel-bookings.mongo.ts

import {BookingHotel, IBookingHotel} from "./hotel-bookings.model";
import {Hotel} from "../hotels.model";
import {findUserById} from "../../user/users.mongo";

// Create a new booking
export const createBooking = async (bookingData: Partial<IBookingHotel>): Promise<IBookingHotel> => {

    const booking = new BookingHotel(bookingData);
    return await booking.save();
};

// Get all bookings
export const getAllBookings = async (): Promise<IBookingHotel[]> => {
    return await BookingHotel.find().populate('hotel').populate('user');
};

// Get booking by ID
export const getBookingById = async (id: string): Promise<IBookingHotel | null> => {
    return await BookingHotel.findById(id).populate('hotel').populate('user');
};

// Get bookings by hotel
export const getBookingsByHotel = async (hotelId: string): Promise<IBookingHotel[]> => {
    return await BookingHotel.find({ hotel: hotelId })
        .populate('hotel').populate('user')
        .sort({startDate:-1});
};

// Get bookings by user
export const getBookingsByUser = async (userId: string): Promise<IBookingHotel[]> => {
    return await BookingHotel.find({ user: userId }).populate('hotel').populate('user')

        .sort({startDate:-1});
};

// Update a booking by ID
export const updateBookingById = async (id: string, updateData: Partial<IBookingHotel>): Promise<IBookingHotel | null> => {
    return await BookingHotel.findByIdAndUpdate(id, {...updateData, updatedAt:new Date()}, { new: true });
};

// Delete a booking by ID
export const deleteBookingById = async (id: string): Promise<IBookingHotel | null> => {
    return await BookingHotel.findByIdAndDelete(id);
};