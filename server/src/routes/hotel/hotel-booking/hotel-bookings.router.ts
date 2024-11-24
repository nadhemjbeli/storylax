// src/routes/hotel/hotel-booking/hotel-bookings.router.ts

import express from 'express';
import {
    createBookingController,
    getAllBookingsController,
    getBookingByIdController,
    updateBookingByIdController,
    deleteBookingByIdController,
    getBookingsByHotelController,
    getBookingsByUserController, getPublishableKeyController, createPaymentIntent
} from './hotel-bookings.controller';
import { authenticateUserByRole } from '../../../middleware/auth';
import {allRoles, travelerRoles} from "../../../utils/roleVariables";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const hotelBookingRouter = express.Router();

// Create a new hotelBooking
hotelBookingRouter.post('/hotel-bookings', authenticateUserByRole(allRoles), createBookingController);

// Get all hotelBookings
hotelBookingRouter.get('/hotel-bookings', authenticateUserByRole(allRoles), getAllBookingsController);

// Get a hotelBooking by ID
hotelBookingRouter.get('/hotel-bookings/:id', authenticateUserByRole(allRoles), getBookingByIdController);

// Get hotel-bookings by hotel
hotelBookingRouter.get('/hotel-bookings/hotel/:hotelId', authenticateUserByRole(allRoles), getBookingsByHotelController);

// Get hotel-bookings by user
hotelBookingRouter.get('/hotel-bookings/user', authenticateUserByRole(allRoles), getBookingsByUserController);

// Update a booking by ID

hotelBookingRouter.put('/hotel-bookings/:id', authenticateUserByRole(allRoles), updateBookingByIdController);
// Delete a booking by ID

hotelBookingRouter.delete('/hotel-bookings/:id', authenticateUserByRole(travelerRoles), deleteBookingByIdController);


hotelBookingRouter.get('/publishable-key', authenticateUserByRole(travelerRoles), getPublishableKeyController);

hotelBookingRouter.post('/create-payment-intent', authenticateUserByRole(travelerRoles), createPaymentIntent);

export default hotelBookingRouter;
