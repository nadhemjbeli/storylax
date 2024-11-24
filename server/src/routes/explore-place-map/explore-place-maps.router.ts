// src/routes/explore-place-map/explore-place-maps.router.ts

import express from 'express';
import multer from 'multer';
import {
    getAllMaps,
    getMapById,
    createMap,
    updateMap,
    deleteMap,
    updateMapDetail,
    deleteMapDetail,
    createMapDetail,
    getAllMapDetails, getMapDetailById
} from './explore-place-maps.controller';
import path from 'path';
import {formatPath} from "../../utils/formatPath";
import {getEventsByCityFromDB} from "../../models/explore-place-event/explore-place-events.mongo";

const explorePlaceMapsRouter = express.Router();

const storageMaps = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/icons/explore-place-maps');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadMaps = multer({ storage:storageMaps });


const prefixPathMaps = '/explore-place-maps';

// Routes for ExplorePlaceMap
explorePlaceMapsRouter.get(`${prefixPathMaps}/`, getAllMaps);
explorePlaceMapsRouter.get(`${prefixPathMaps}/:id`, getMapById);

explorePlaceMapsRouter.post(`${prefixPathMaps}/`, uploadMaps.single('cardIcon'), (req, res) => {
    if (req.file) {
        req.body.cardIcon = formatPath(req.file.path);
    }
    createMap(req, res);
});

explorePlaceMapsRouter.put(`${prefixPathMaps}/:id`, uploadMaps.single('cardIcon'), (req, res) => {
    if (req.file) {
        req.body.cardIcon = formatPath(req.file.path);
    }
    updateMap(req, res);
});

explorePlaceMapsRouter.delete(`${prefixPathMaps}/:id`, deleteMap);


// Routes for ExplorePlaceMapDetail

const storageMapDetails = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images/explore-place-map-details');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadMapDetails = multer({ storage:storageMapDetails });
const detailPrefixPath = '/explore-place-map-details';

explorePlaceMapsRouter.get(`${detailPrefixPath}/`, getAllMapDetails);
explorePlaceMapsRouter.get(`${detailPrefixPath}/:id`, getMapDetailById);

explorePlaceMapsRouter.post(`${detailPrefixPath}/`, uploadMapDetails.single('image'), (req, res) => {
    if (req.file) {
        req.body.image = formatPath(req.file.path);
    }
    createMapDetail(req, res);
});

explorePlaceMapsRouter.put(`${detailPrefixPath}/:id`, uploadMapDetails.single('image'), (req, res) => {
    if (req.file) {
        req.body.image = formatPath(req.file.path);
    }
    updateMapDetail(req, res);
});

explorePlaceMapsRouter.delete(`${detailPrefixPath}/:id`, deleteMapDetail);
export default explorePlaceMapsRouter;
