// src/routes/event/events.controller.ts

import { Request, Response } from 'express';
import {
    getEventsFromDB,
    getEventByIdFromDB,
    createEventInDB,
    updateEventInDB,
    deleteEventFromDB, getEventsSortedByStartDateFromDB,
} from '../../models/event/events.mongo';
import { ICustomError } from '../../utils/types';
import {authenticateUserByRole} from "../../middleware/auth"; // Assuming a custom error type is defined

const handleError = (res: Response, error: unknown) => {
    const err = error as ICustomError;
    res.status(400).json({ error: err.message || 'An unknown error occurred' });
};

export const getEventsController = async (_req: Request, res: Response) => {
    try {

        const events = await getEventsFromDB();
        res.status(200).json(events);
    } catch (error) {
        handleError(res, error);
    }
};

export const getEventsSortedByStartDateController = async (_req: Request, res: Response) => {
    try {

        const events = await getEventsSortedByStartDateFromDB();
        res.status(200).json(events);
    } catch (error) {
        handleError(res, error);
    }
};


export const getEventByIdController = async (req: Request, res: Response) => {
    try {
        const event = await getEventByIdFromDB(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        handleError(res, error);
    }
};

export const createEventController = async (req: Request, res: Response) => {
    // const { explorePlace, title, description, startDate, endDate, principalImage } = req.body;

    try {
        const newEvent = await createEventInDB(req.body);
        res.status(201).json(newEvent);
    } catch (error) {
        handleError(res, error);
    }
};

export const updateEventController = async (req: Request, res: Response) => {
    // const { explorePlace, title, description, startDate, endDate } = req.body;

    try {
        const updatedEvent = await updateEventInDB(req.params.id, {
        ...req.body, updatedAt: new Date()
    });

        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        handleError(res, error);
    }
};

export const deleteEventController = async (req: Request, res: Response) => {
    try {
        const deletedEvent = await deleteEventFromDB(req.params.id);

        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};


