// src/routes/hotel/hotels.router.ts

import express from 'express';
import multer from 'multer';
import {
    createHotelController,
    getAllHotelsController,
    getHotelByIdController,
    updateHotelByIdController,
    deleteHotelByIdController,
    getHotelsByCityController, getHotelsByHostController, getRecommendedHotelsController, getHotelsController
} from './hotels.controller';
import { formatPath } from "../../utils/formatPath";
import {PrincipalHotelImage} from "../../models/hotel/hotels.schema";
import {authenticateUserByRole} from "../../middleware/auth";
import {adminRoles, hostRoles, travelerRoles} from "../../utils/roleVariables";
import {IUser} from "../../models/user/users.model";

const hotelsRouter = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images/hotels');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Create a new hotel with principal image uploads
hotelsRouter.post('/hotels',
    authenticateUserByRole(hostRoles), upload.fields([
    { name: 'defaultImage', maxCount: 1 },
    { name: 'smallImage', maxCount: 1 },
    { name: 'mediumImage', maxCount: 1 },
    { name: 'largeImage', maxCount: 1 }
]), (req, res) => {
        console.log(req.body)
    const principalImage: PrincipalHotelImage = {default:'', large: "", medium: "", small: ""};
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
    createHotelController(req, res);
});

// Update a hotel by ID with principal image uploads
hotelsRouter.put('/hotels/:id',
    authenticateUserByRole(hostRoles), upload.fields([
    { name: 'defaultImage', maxCount: 1 },
    { name: 'smallImage', maxCount: 1 },
    { name: 'mediumImage', maxCount: 1 },
    { name: 'largeImage', maxCount: 1 }
]), (req, res) => {
    // console.log((req.user as any)?._id)
    const principalImage: PrincipalHotelImage = {default:'', large: "", medium: "", small: ""};
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }; // Type assertion

    if (files) {
        if (files['defaultImage']) {
            principalImage.default = formatPath(files['defaultImage'][0].path);
        }
        if (files['smallImage']) {
            principalImage.small = formatPath(files['smallImage'][0].path);
            console.log(`New small image saved at: ${principalImage.small}`);
        }
        if (files['mediumImage']) {
            principalImage.medium = formatPath(files['mediumImage'][0].path);
            console.log(`New medium image saved at: ${principalImage.medium}`);
        }
        if (files['largeImage']) {
            principalImage.large = formatPath(files['largeImage'][0].path);
            console.log(`New large image saved at: ${principalImage.large}`);
        }
    }
    req.body.host = (req.user as IUser)._id
    req.body.principalImage = principalImage;
    updateHotelByIdController(req, res);
});

// Other routes remain unchanged
hotelsRouter.get('/hotels', getHotelsController);
hotelsRouter.get('/hotels/recommended',
    authenticateUserByRole(travelerRoles),
    getRecommendedHotelsController
);
hotelsRouter.get('/hotels/host', authenticateUserByRole(hostRoles), getHotelsByHostController);
hotelsRouter.get('/hotels/:id', getHotelByIdController);
hotelsRouter.get('/hotels/city/:cityId', getHotelsByCityController);
hotelsRouter.delete('/hotels/:id', deleteHotelByIdController);

export default hotelsRouter;
