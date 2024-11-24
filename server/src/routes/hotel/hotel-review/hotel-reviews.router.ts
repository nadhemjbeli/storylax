// src/routes/hotel/hotel-ratings.router.ts

import express from 'express';
import {
    createHotelRatingController,
    getRatingsByHotelController,
    getRatingByIdController,
    updateRatingByIdController,
    deleteRatingByIdController
} from './hotel-reviews.controller';
import {authenticateAdmin, authenticateTraveler, authenticateUserByRole} from "../../../middleware/auth";
import {allRoles} from "../../../utils/roleVariables";

const hotelReviewRouter = express.Router();
const path = '/hotel-reviews'

// Create a new rating
hotelReviewRouter.post(path, authenticateUserByRole(allRoles), createHotelRatingController);

// Get all ratings for a specific hotel
hotelReviewRouter.get(`${path}/hotel/:hotelId`, getRatingsByHotelController);

// Get a specific rating by ID
hotelReviewRouter.get(`${path}/:id`, getRatingByIdController);

// Update a rating by ID
hotelReviewRouter.put(`${path}/:id`, authenticateAdmin, updateRatingByIdController);

// Delete a rating by ID
hotelReviewRouter.delete(`${path}/:id`, authenticateAdmin, deleteRatingByIdController);

export default hotelReviewRouter;
