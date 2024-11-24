// src/routes/event/event-cards.router.ts

import express from 'express';
import { getCardsByEventIdController, createCardController, deleteCardController } from './event-cards.controller';
import multer from "multer";

const eventCardsRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images/events');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const prefixPath = '/event-cards';

eventCardsRouter.get(`${prefixPath}/:eventId`, getCardsByEventIdController);

eventCardsRouter.post(`${prefixPath}/`, upload.single('image'), createCardController);

eventCardsRouter.delete(`${prefixPath}/:id`, deleteCardController);

export default eventCardsRouter;
