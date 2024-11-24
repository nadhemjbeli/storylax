// src/models/hotel/hotel-reservation/hotel-reservations.mongo.ts
import { Reservation, IReservation } from './hotel-reservations.model';
import {IUser, User} from "../../user/users.model";
import {Hotel} from "../hotels.model";

// Create a new reservation
export const createReservation = async (reservationData: Partial<IReservation>): Promise<IReservation> => {
    const reservation = new Reservation(reservationData);
    await reservation.save()
    return reservation.populate('customer');
};

// Get all reservations
export const getAllReservations = async (): Promise<IReservation[]> => {
    return await Reservation.find().populate('hotel').populate('customer');
};

// Get reservation by ID
export const getReservationById = async (id: string): Promise<IReservation | null> => {
    return await Reservation.findById(id).populate('hotel').populate('customer');
};

// Get reservations by hotel
export const getReservationsByHotel = async (hotelId: string): Promise<IReservation[]> => {
    return await Reservation.find({ hotel: hotelId })
        .populate('hotel').populate('customer')
        .sort({checkIn:-1});
};


// Get reservations by user
export const getReservationsByUser = async (userId: string): Promise<IReservation[]> => {
    return await Reservation.find({ customer: userId })
        .populate('hotel')
        .populate('customer')
        .sort({checkIn:-1});
};

// Get reservations by host and customer
export const getReservationsByCustomerAndHotelHost = async (hostId: string, customerId: string): Promise<IReservation[]> => {
    // Find hotels where the host matches the given hostId
    const hostHotelIds = await Hotel.find({ host: hostId })
        .distinct('_id');

    // Find reservations for those hotels and the specific customer
    return await Reservation.find({
        hotel: { $in: hostHotelIds },
        customer: customerId
    })
        .populate('hotel')
        .populate('customer')
        .sort({checkIn:-1});
};


// Get distinct users who made reservations
export const getUsersFromReservations = async (): Promise<IUser[]> => {
    const users = await Reservation.distinct('customer');
    return await User.find({ _id: { $in: users } });
};

// Get users who have made reservations in hotels hosted by a specific host
export const getUsersByHostReservations = async (hostId: string): Promise<IUser[]> => {
    // Find hotels where the host matches the given hostId
    const hostHotels = await Hotel.find({ host: hostId }).select('_id');

    // Find reservations for the host's hotels
    const reservations = await Reservation.find({ hotel: { $in: hostHotels.map(hotel => hotel._id) } })
        .distinct('customer'); // Only select customer field
    // Fetch users with those customer IDs
    return await User.find({ _id: { $in: reservations } });
};

// Update a reservation by ID
export const updateReservationById = async (id: string, updateData: Partial<IReservation>): Promise<IReservation | null> => {
    console.log(updateData)
    return await Reservation
        .findByIdAndUpdate(id, { ...updateData, updatedAt: new Date() }, { new: true })
        .populate('hotel')
        .populate('customer');
};

// Delete a reservation by ID
export const deleteReservationById = async (id: string): Promise<IReservation | null> => {
    return await Reservation.findByIdAndDelete(id);
};
