// src/routes/hotel/hotel-reservation/hotel-reservations.controller.ts

import { Request, Response } from 'express';
import {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservationById,
    deleteReservationById,
    getReservationsByHotel,
    getReservationsByUser, getUsersFromReservations, getUsersByHostReservations, getReservationsByCustomerAndHotelHost
} from '../../../models/hotel/hotel-reservation/hotel-reservations.mongo';
import { handleError } from '../../../utils/types';
import {IUser} from "../../../models/user/users.model";
import {sendEmail} from "../../../services/email";

// Create a new reservation
export const createReservationController = async (req: Request, res: Response) => {
    try {
        const reservation = await createReservation(req.body);
        const customerEmail = reservation.customer.email; // Assuming the populated customer object has an email field
        const customerName = `${reservation.customer.firstName} ${reservation.customer.lastName}`; // Assuming you have the name too

        // Sending the email
        const emailContent = `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
                    <h2 style="color: #4CAF50;">Congratulations, ${customerName}!</h2>
                    <p>Your booking at <strong>${reservation.hotel.name}</strong> has been <span style="color: #4CAF50;">accepted</span> by the host.</p>
                    <p>Details of your stay:</p>
                    <ul>
                        <li><strong>Check-in Date:</strong> ${new Date(reservation.checkIn).toLocaleDateString()}</li>
                        <li><strong>Check-out Date:</strong> ${new Date(reservation.checkOut).toLocaleDateString()}</li>
                        <li><strong>Number of Travelers:</strong> ${reservation.travelers}</li>
                        <li><strong>Total Price:</strong> $${reservation.totalPrice.toFixed(2)}</li>
                    </ul>
                    <p>We wish you a wonderful experience!</p>
                    <footer style="margin-top: 20px; text-align: center; color: #888;">
                        <p>Thank you for choosing Storylax!</p>
                        <p><strong>Storylax Team</strong></p>
                    </footer>
                </div>
            `;

        await sendEmail(customerEmail, 'Booking Accepted - Welcome to Your Stay!', emailContent);
        res.status(201).json(reservation);
    } catch (error) {
        handleError(res, error);
    }
};

// Get all reservations
export const getAllReservationsController = async (_req: Request, res: Response) => {
    try {
        const reservations = await getAllReservations();
        res.status(200).json(reservations);
    } catch (error) {
        handleError(res, error);
    }
};

// Get a reservation by ID
export const getReservationByIdController = async (req: Request, res: Response) => {
    try {
        const reservation = await getReservationById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        handleError(res, error);
    }
};

// Get reservations by hotel
export const getReservationsByHotelController = async (req: Request, res: Response) => {
    try {
        const reservations = await getReservationsByHotel(req.params.hotelId);
        res.status(200).json(reservations);
    } catch (error) {
        handleError(res, error);
    }
};

// Get reservations by user
export const getReservationsByUserController = async (req: Request, res: Response) => {
    try {
        const reservations = await getReservationsByUser((req.user as IUser)?._id as string);
        res.status(200).json(reservations);
    } catch (error) {
        handleError(res, error);
    }
};

// Get reservations by customer and host
export const getReservationsByCustomerAndHotelHostController = async (req: Request, res: Response) => {
    try {
        const hostId = (req.user as IUser)._id; // Assuming the user is authenticated as the host
        const { customerId } = req.params;

        const reservations = await getReservationsByCustomerAndHotelHost(hostId as string, customerId as string);
        res.status(200).json(reservations);
    } catch (error) {
        handleError(res, error);
    }
};


// Get distinct users from reservations
export const getUsersFromReservationsController = async (_req: Request, res: Response) => {
    try {
        const users = await getUsersFromReservations();
        res.status(200).json(users);
    } catch (error) {
        handleError(res, error);
    }
};

// Get users who made reservations in hotels hosted by a specific host
export const getUsersByHostReservationsController = async (req: Request, res: Response) => {
    try {
        const hostId = (req.user as IUser)._id;
        const users = await getUsersByHostReservations(hostId as string);
        res.status(200).json(users);
    } catch (error) {
        handleError(res, error);
    }
};

// Update a reservation by ID
export const updateReservationByIdController = async (req: Request, res: Response) => {
    try {
        const reservation = await updateReservationById(req.params.id, req.body);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a reservation by ID
export const deleteReservationByIdController = async (req: Request, res: Response) => {
    try {
        const reservation = await deleteReservationById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};
