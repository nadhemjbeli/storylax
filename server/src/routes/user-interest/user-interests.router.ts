// src/routes/user-interest/user-interests.router.ts

import express from 'express';
import {
    addCurrentUserInterestsController,
    addUserInterestsController,
    createUserInterestController,
    deleteUserInterestByIdController,
    getAllUserInterestsController, getCurrentUserInterestsByUserController,
    getUserInterestByIdController, getUserInterestsByUserController,
    updateUserInterestByIdController
} from "./user-interests.controller";
import {authenticateUserByRole} from "../../middleware/auth";
import {allRoles, travelerRoles} from "../../utils/roleVariables";

const userInterestsRouter = express.Router();

// Create a new interest
userInterestsRouter.post('/user-interests', createUserInterestController);

// Create a new interests to current user
userInterestsRouter.post(
    '/user-interests/current/multiple',
    authenticateUserByRole(allRoles),
    addCurrentUserInterestsController
);

// Create a new interests to user
userInterestsRouter.post('/user-interests/:userId/multiple', addUserInterestsController);

// Get user's interests by user ID'
userInterestsRouter.get(
    '/user-interests/current/multiple',
    authenticateUserByRole(allRoles),
    getCurrentUserInterestsByUserController
);

// Get user's interests by user ID'
userInterestsRouter.get('/user-interests/:userId/multiple', getUserInterestsByUserController);


// Get all tags
userInterestsRouter.get('/user-interests', getAllUserInterestsController);

// Get a tag by ID
userInterestsRouter.get('/user-interests/:id', getUserInterestByIdController);

// Update a tag by ID
userInterestsRouter.put('/user-interests/:id', updateUserInterestByIdController);

// Delete a tag by ID
userInterestsRouter.delete('/user-interests/:id', deleteUserInterestByIdController);

export default userInterestsRouter;
