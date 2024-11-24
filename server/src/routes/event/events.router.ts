// src/routes/event/events.router.ts

import express from 'express';
import multer from 'multer';
import {
    getEventsController,
    getEventByIdController,
    createEventController,
    updateEventController,
    deleteEventController, getEventsSortedByStartDateController,
} from './events.controller';
import path from 'path';
import { formatPath } from '../../utils/formatPath';
import {PrincipalBlogImage} from "../../models/blog/blogs.schema";
import {authenticateUserByRole} from "../../middleware/auth";
import {IUser} from "../../models/user/users.model";

const eventsRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images/events');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const prefixPath = '/events';

eventsRouter.get(`${prefixPath}/`, getEventsController);
eventsRouter.get(`${prefixPath}/sorted-start-date`, getEventsSortedByStartDateController);
eventsRouter.get(`${prefixPath}/:id`, getEventByIdController);

eventsRouter.post(`${prefixPath}/`,
    // authenticateUserByRole(['admin']),
    upload.fields([
    { name: 'smallImage', maxCount: 1 },
    { name: 'defaultImage', maxCount: 1 },
    { name: 'mediumImage', maxCount: 1 },
    { name: 'largeImage', maxCount: 1 }
]), (req, res) => {

    const principalImage: PrincipalBlogImage = {default:'', large: "", medium: "", small: ""};
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }; // Type assertion

    if (files) {
        if (files['defaultImage']) {
            principalImage.default = formatPath(files['defaultImage'][0].path);
        }
        if (files['smallImage']) {
            principalImage.small = formatPath(files['smallImage'][0].path);
        }
        if (files['mediumImage']) {
            principalImage.medium = formatPath(files['mediumImage'][0].path);
        }
        if (files['largeImage']) {
            principalImage.large = formatPath(files['largeImage'][0].path);
        }
    }
    // req.body.author = (req.user as IUser)?._id
    req.body.principalImage = principalImage;
    createEventController(req, res);
});

eventsRouter.put(`${prefixPath}/:id`, upload.fields([
    { name: 'smallImage', maxCount: 1 },
    { name: 'defaultImage', maxCount: 1 },
    { name: 'mediumImage', maxCount: 1 },
    { name: 'largeImage', maxCount: 1 }
]), (req, res) => {
    const principalImage: PrincipalBlogImage = {default:'', large: "", medium: "", small: ""};
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }; // Type assertion

    if (files) {
        if (files['defaultImage']) {
            principalImage.default = formatPath(files['defaultImage'][0].path);
        }
        if (files['smallImage']) {
            principalImage.small = formatPath(files['smallImage'][0].path);
        }
        if (files['mediumImage']) {
            principalImage.medium = formatPath(files['mediumImage'][0].path);
        }
        if (files['largeImage']) {
            principalImage.large = formatPath(files['largeImage'][0].path);
        }
    }
    req.body.principalImage = principalImage;
    updateEventController(req, res);
});

eventsRouter.delete(`${prefixPath}/:id`, deleteEventController);

export default eventsRouter;
