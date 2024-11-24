import { Request, Response } from 'express';
import { createScore, getAllScores, getScoresByPlayer, getScoresByEvent, updateScoreById, deleteScoreById } from '../../../../models/event/event-card/event-card-score/event-card-score.mongo';
import {IUser} from "../../../../models/user/users.model";
import mongoose from "mongoose";

// Helper function to handle errors
const handleError = (res: Response, error: unknown) => {
    const err = error as { message: string };
    res.status(400).json({ error: err.message || 'An unknown error occurred' });
};

// Create a new score
export const createScoreController = async (req: Request, res: Response) => {
    try {
        const { score, event } = req.body
        const scoreRes = await createScore({score, event, player:(req.user as IUser)._id as string});
        res.status(201).json(scoreRes);
    } catch (error) {
        handleError(res, error);
    }
};

// Get all scores
export const getAllScoresController = async (_req: Request, res: Response) => {
    try {
        const scores = await getAllScores();
        res.status(200).json(scores);
    } catch (error) {
        handleError(res, error);
    }
};

// Get scores by player ID
export const getScoresByPlayerController = async (req: Request, res: Response) => {
    try {
        const scores = await getScoresByPlayer(req.params.playerId);
        res.status(200).json(scores);
    } catch (error) {
        handleError(res, error);
    }
};

// Get scores by event ID
export const getScoresByEventController = async (req: Request, res: Response) => {
    try {
        console.log(req.params.eventId)
        const scores = await getScoresByEvent(req.params.eventId);
        console.log(scores)
        res.status(200).json(scores);
    } catch (error) {
        handleError(res, error);
    }
};

// Update a score by ID
export const updateScoreByIdController = async (req: Request, res: Response) => {
    try {
        const score = await updateScoreById(req.params.id, req.body);
        if (!score) {
            return res.status(404).json({ error: 'Score not found' });
        }
        res.status(200).json(score);
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a score by ID
export const deleteScoreByIdController = async (req: Request, res: Response) => {
    try {
        const score = await deleteScoreById(req.params.id);
        if (!score) {
            return res.status(404).json({ error: 'Score not found' });
        }
        res.status(200).json({ message: 'Score deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};
