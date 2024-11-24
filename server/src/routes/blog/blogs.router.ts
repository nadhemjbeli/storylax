// src/routes/blog/blogs.router.ts

import express from 'express';
import multer from 'multer';
import { createBlogController, getAllBlogsController, getBlogByIdController, updateBlogByIdController, deleteBlogByIdController } from './blogs.controller';
import { formatPath } from "../../utils/formatPath";
import {PrincipalBlogImage} from "../../models/blog/blogs.schema";
import {authenticateUserByRole} from "../../middleware/auth";

const router = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images/blogs');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Create a new blog with principal image uploads
router.post('/blogs',
    authenticateUserByRole(['admin']), upload.fields([
    { name: 'defaultImage', maxCount: 1 },
    { name: 'smallImage', maxCount: 1 },
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
    createBlogController(req, res);
});

// Update a blog by ID with principal image uploads
router.put('/blogs/:id', upload.fields([
    { name: 'defaultImage', maxCount: 1 },
    { name: 'smallImage', maxCount: 1 },
    { name: 'mediumImage', maxCount: 1 },
    { name: 'largeImage', maxCount: 1 }
]), (req, res) => {
    // console.log((req.user as any)?._id)
    const principalImage: PrincipalBlogImage = {default:'', large: "", medium: "", small: ""};
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
    req.body.principalImage = principalImage;
    updateBlogByIdController(req, res);
});

// Other routes remain unchanged
router.get('/blogs', getAllBlogsController);
router.get('/blogs/:id', getBlogByIdController);
router.delete('/blogs/:id', deleteBlogByIdController);

export default router;
