import express from 'express';
import {
    createScoreController,
    getAllScoresController,
    getScoresByPlayerController,
    getScoresByEventController,
    updateScoreByIdController,
    deleteScoreByIdController
} from './event-card-score.controller';
import {authenticateUserByRole} from "../../../../middleware/auth";
import {travelerRoles} from "../../../../utils/roleVariables";

const scoreRouter = express.Router();

// Create a new score
scoreRouter.post('/scores', authenticateUserByRole(travelerRoles), createScoreController);

// Get all scores
scoreRouter.get('/scores', getAllScoresController);

// Get scores by player ID
scoreRouter.get('/scores/player/:playerId', authenticateUserByRole(travelerRoles), getScoresByPlayerController);

// Get scores by event ID
scoreRouter.get('/scores/event/:eventId', getScoresByEventController);

// Update a score by ID
scoreRouter.put('/scores/:id', updateScoreByIdController);

// Delete a score by ID
scoreRouter.delete('/scores/:id', deleteScoreByIdController);

export default scoreRouter;
