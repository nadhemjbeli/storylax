// src/routes/explore-place/explore-places.router.ts

import express from 'express';
import multer from 'multer';
import {
    getEventsController,
    getEventByIdController,
    createEventController,
    updateEventController,
    deleteEventController,
    getEventsByCityController
} from './explore-place-events.controller';
import path from 'path';
import {formatPath} from "../../utils/formatPath";
import {getEventsByCityFromDB} from "../../models/explore-place-event/explore-place-events.mongo";

const explorePlaceEventsRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images/explore-place-events');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });


const prefixPath = '/explore-place-events';

explorePlaceEventsRouter.get(`${prefixPath}/`, getEventsController);
explorePlaceEventsRouter.get(`${prefixPath}/:id`, getEventByIdController);
explorePlaceEventsRouter.get(`${prefixPath}/by-city/:city`, getEventsByCityController);

explorePlaceEventsRouter.post(`${prefixPath}/`, upload.single('image'), (req, res) => {
    if (req.file) {
        req.body.image = formatPath(req.file.path);
    }
    createEventController(req, res);
});

explorePlaceEventsRouter.put(`${prefixPath}/:id`, upload.single('image'), (req, res) => {
    if (req.file) {
        req.body.image = formatPath(req.file.path);
    }
    updateEventController(req, res);
});

explorePlaceEventsRouter.delete(`${prefixPath}/:id`, deleteEventController);

export default explorePlaceEventsRouter;
