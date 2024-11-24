// src/routes/explore-place/explore-places.router.ts

import express from 'express';
import multer from 'multer';
import path from 'path';
import { createPlaceController, getAllPlacesController, getPlaceByIdController, updatePlaceByIdController, deletePlaceByIdController } from './explore-places.controller';
import {formatPath} from "../../utils/formatPath";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images/explore-places');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });


router.post('/explore-places', upload.single('image'), (req, res) => {
    if (req.file) {
        req.body.image = formatPath(req.file.path);
    }
    createPlaceController(req, res);
});

router.get('/explore-places', getAllPlacesController);

router.get('/explore-places/:id', getPlaceByIdController);

router.put('/explore-places/:id', upload.single('image'), (req, res) => {
    if (req.file) {
        req.body.image = formatPath(req.file.path);
    }
    updatePlaceByIdController(req, res);
});

router.delete('/explore-places/:id', deletePlaceByIdController);

export default router;
