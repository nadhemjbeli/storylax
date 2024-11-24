// src/routes/event/event-card/event-cards.controller.ts

import { Request, Response } from 'express';
import {
    getCardsByEventIdFromDB,
    createCardInDB,
    deleteCardFromDB
} from '../../../models/event/event-card/event-cards.mongo';
import {formatPath} from "../../../utils/formatPath";
import {createBlogImage} from "../../../models/blog-image/blog-images.mongo";

const handleError = (res: Response, error: unknown) => {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
};

export const getCardsByEventIdController = async (req: Request, res: Response) => {
    try {
        const cards = await getCardsByEventIdFromDB(req.params.eventId);
        res.status(200).json(cards);
    } catch (error) {
        handleError(res, error);
    }
};

export const createCardController = async (req: Request, res: Response) => {
    const { name, event } = req.body;
    if (req.file) {
        const imagePath = formatPath(req.file.path);
        try {
            const newCard = await createCardInDB({ event: event, name:name, image: imagePath });
            res.status(201).json(newCard);
        } catch (error) {
            handleError(res, error);
        }
    } else {
        res.status(400).json({ error: 'No image uploaded' });
    }
};

export const deleteCardController = async (req: Request, res: Response) => {
    try {
        const deletedCard = await deleteCardFromDB(req.params.id);
        if (!deletedCard) {
            return res.status(404).json({ error: 'Card not found' });
        }
        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};
