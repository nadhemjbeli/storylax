// src/routes/hotel/hotel-service/hotel-services.router.ts

import express from 'express';
import {
    createHotelServiceController,
    getAllHotelServicesController,
    getHotelServiceByIdController,
    updateHotelServiceByIdController,
    deleteHotelServiceByIdController, getHotelServicesByHotelController, getHotelsByServiceController
} from './hotel-services.controller';
import { authenticateUserByRole } from "../../../middleware/auth";
import { adminRoles } from "../../../utils/roleVariables"; // Assuming admins manage services

const hotelServicesRouter = express.Router();

// Create a new hotel service (Admin only)
hotelServicesRouter.post('/hotel-services', authenticateUserByRole(adminRoles), createHotelServiceController);

// Get all hotel services
hotelServicesRouter.get('/hotel-services', getAllHotelServicesController);

// Get all hotel services
hotelServicesRouter.get('/hotels-by-service', getHotelsByServiceController);
// Get all hotel services
hotelServicesRouter.get('/hotel-services-by-hotel/:hotelId', getHotelServicesByHotelController);

// Get a service by ID
hotelServicesRouter.get('/hotel-services/:id', getHotelServiceByIdController);

// Update a service by ID (Admin only)
hotelServicesRouter.put('/hotel-services/:id', authenticateUserByRole(adminRoles), updateHotelServiceByIdController);

// Delete a service by ID (Admin only)
hotelServicesRouter.delete('/hotel-services/:id', authenticateUserByRole(adminRoles), deleteHotelServiceByIdController);

export default hotelServicesRouter;
