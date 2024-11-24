// src/routes/hotel/hotel-booking/hotel-bookings.controller.ts

import { Request, Response } from 'express';
import {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingById,
    deleteBookingById,
    getBookingsByHotel,
    getBookingsByUser
} from '../../../models/hotel/hotel-booking/hotel-bookings.mongo';
import {handleError} from '../../../utils/types';
import {IUser, User} from '../../../models/user/users.model';
import stripe from "../../../utils/stripe";
import {Hotel} from "../../../models/hotel/hotels.model";
import {frontUrl} from "../../../services/urls";
import {sendEmail} from "../../../services/email";

// Create a new booking
export const createBookingController = async (req: Request, res: Response) => {
    try {
        const hotel = await Hotel.findById(req.body.hotel);
        const host = hotel && await User.findById(hotel.host);

        if (!host || !hotel) {
            return res.status(404).json({ message: 'Host or Hotel not found' });
        } else {
            // Generate a reservation link (you may want to specify a more detailed URL)
            const reservationLink = `${frontUrl}/reservations`;

            const subject = `New reservation request for ${hotel.title}`;
            const html = `
                <p>Dear ${host.firstName} ${host.lastName},</p>
                <p>You have received a new reservation request for your property <strong>${hotel.title}</strong>.</p>
                <p><strong>Reservation details:</strong></p>
                <ul>
                    <li><strong>Hotel:</strong> ${hotel.title}</li>
                    <li><strong>Requested by:</strong> ${(req.user as any)?.firstName} ${(req.user as any)?.lastName}</li>
                    <li><strong>Start Date:</strong> ${req.body.startDate}</li>
                    <li><strong>End Date:</strong> ${req.body.endDate}</li>
                    <li><strong>Number of travelers:</strong> ${req.body.travelers}</li>
                </ul>
                <p>To view and manage this reservation, please click the following link:</p>
                <p><a href="${reservationLink}" style="color: #4a3aff;">View Reservation</a></p>
                <p>Best regards,</p>
                <p>Your Hotel Management Team</p>
            `;

            await sendEmail(host.email, subject, html);

            // Create the booking
            const booking = await createBooking({
                ...req.body,
                user: (req.user as IUser)._id
            });

            res.status(201).json(booking);
        }
    } catch (error) {
        handleError(res, error);
    }
};


// Get all bookings
export const getAllBookingsController = async (req: Request, res: Response) => {
    try {
        const bookings = await getAllBookings();
        res.status(200).json(bookings);
    } catch (error) {
        handleError(res, error);
    }
};

// Get a booking by ID
export const getBookingByIdController = async (req: Request, res: Response) => {
    try {
        const booking = await getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        handleError(res, error);
    }
};

// Get bookings by hotel
export const getBookingsByHotelController = async (req: Request, res: Response) => {
    try {
        const bookings = await getBookingsByHotel(req.params.hotelId);
        res.status(200).json(bookings);
    } catch (error) {
        handleError(res, error);
    }
};

// Get bookings by user
export const getBookingsByUserController = async (req: Request, res: Response) => {
    try {
        const bookings = await getBookingsByUser((req.user as IUser)?._id as string );
        res.status(200).json(bookings);
    } catch (error) {
        handleError(res, error);
    }
};

// Update a booking by ID
export const updateBookingByIdController = async (req: Request, res: Response) => {
    try {
        const booking = await updateBookingById(req.params.id, req.body);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        if (req.body.status === 'rejected') {
            const customer = await User.findById(booking.user);
            const hotel = await Hotel.findById(booking.hotel);

            if (customer && hotel) {
                const subject = 'Booking Request Rejected';
                const html = `
                    <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
                        <h2 style="color: #ff4d4f;">Your Booking Request for ${hotel.title} Has Been Rejected</h2>
                        <p>Dear ${customer.firstName} ${customer.lastName},</p>
                        <p>We regret to inform you that your booking request for <strong>${hotel.title}</strong> 
                           from <strong>${booking.startDate.toDateString()}</strong> to 
                           <strong>${booking.endDate.toDateString()}</strong> has been rejected by the host.</p>
                        <p>If you have any questions or wish to make another booking, please visit our website:</p>
                        <p><a href="${frontUrl}/Exclusive" style="background-color: #4a3aff; padding: 10px 20px; color: white; text-decoration: none; border-radius: 5px;">
                           View Other Options</a></p>
                        <p>We apologize for any inconvenience caused, and we hope to assist you in finding another great stay.</p>
                        <p>Best regards,</p>
                        <p><strong>The Storylax Team</strong></p>
                    </div>
                `;
                await sendEmail(customer.email, subject, html);
            }
        }
        res.status(200).json(booking);
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a booking by ID
export const deleteBookingByIdController = async (req: Request, res: Response) => {
    try {
        const booking = await deleteBookingById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};
export const getPublishableKeyController = async (_req: Request, res: Response) => {
    try {
        res.status(200).json({publishableKey: process.env.PUBLISHABLE_KEY||""});
    } catch (error) {
        handleError(res, error);
    }
};
export const createPaymentIntent = async (req: Request, res: Response) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'usd',
            amount: req.body.totalPrice,
            automatic_payment_methods:{
                enabled: true,
            }
        })
        res.status(200).json({clientSecret: paymentIntent.client_secret});
    } catch (error) {
        handleError(res, error);
    }
};


