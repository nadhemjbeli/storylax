// src/routes/hotel/hotel-reservation/hotel-reservations.router.ts
import express from 'express';
import {
    createReservationController,
    getAllReservationsController,
    getReservationByIdController,
    updateReservationByIdController,
    deleteReservationByIdController,
    getReservationsByHotelController,
    getReservationsByUserController,
    getUsersFromReservationsController,
    getUsersByHostReservationsController,
    getReservationsByCustomerAndHotelHostController
} from './hotel-reservations.controller';
import { authenticateUserByRole } from '../../../middleware/auth';
import {adminRoles, allRoles, hostRoles, travelerRoles} from '../../../utils/roleVariables';

const reservationRouter = express.Router();

// Create a new reservation
reservationRouter.post('/hotel-reservations', authenticateUserByRole(allRoles), createReservationController);

// Get all reservations
reservationRouter.get('/hotel-reservations', authenticateUserByRole(travelerRoles), getAllReservationsController);

// Get shotel-reservation by hotel
reservationRouter.get('/hotel-reservations/hotel/:hotelId', authenticateUserByRole(hostRoles), getReservationsByHotelController);

// Get hotel-reservation by user
reservationRouter.get('/hotel-reservations/user', authenticateUserByRole(travelerRoles), getReservationsByUserController);

// Get all users from reservations
reservationRouter.get('/hotel-reservations/users', authenticateUserByRole(adminRoles), getUsersFromReservationsController);

// Get reservations by host and customer
reservationRouter.get(
    '/hotel-reservations/by-customer-and-hotel-host/:customerId',
    authenticateUserByRole(hostRoles),
    getReservationsByCustomerAndHotelHostController
);


// Add the new route for getting users who reserved hotels by host
reservationRouter.get('/hotel-reservations/users-by-host', authenticateUserByRole(hostRoles), getUsersByHostReservationsController);

// Get a reservation by ID
reservationRouter.get('/hotel-reservations/:id', authenticateUserByRole(travelerRoles), getReservationByIdController);

// Update a reservation by ID
reservationRouter.put('/hotel-reservations/:id', authenticateUserByRole(allRoles), updateReservationByIdController);

// Delete a reservation by ID
reservationRouter.delete('/hotel-reservations/:id', authenticateUserByRole(travelerRoles), deleteReservationByIdController);

export default reservationRouter;
