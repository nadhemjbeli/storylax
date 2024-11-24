// src/routes/blog-image/blogImages.router.ts

import express from 'express';
import multer from 'multer';
import {
    createBlogImageController,
    deleteBlogImageByIdController,
    getAllImagesController,
    getImagesByBlogIdController,
    getImagesByBlogIdAndSizeController
} from './blog-images.controller';

const blogImagesRouter = express.Router();

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images/blog-images');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const prepath='/blog-images'

// Add an image to a blog
blogImagesRouter.post(`${prepath}/:id`, upload.single('image'), createBlogImageController);

// Get all images
blogImagesRouter.get(`${prepath}`, getAllImagesController);

// Get images by blog ID
blogImagesRouter.get(`${prepath}/blog/:blogId/`, getImagesByBlogIdController);

// Get images by blog ID and size
blogImagesRouter.get(`${prepath}/blog/:blogId//size/:size`, getImagesByBlogIdAndSizeController);

// Delete an image by ID
blogImagesRouter.delete(`${prepath}/:imageId`, deleteBlogImageByIdController);

export default blogImagesRouter;
