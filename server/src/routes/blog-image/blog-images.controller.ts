// src/routes/blog-image/blog-images.controller.ts

import { Request, Response } from 'express';
import {
    createBlogImage,
    deleteBlogImageById,
    getAllImages,
    getImagesByBlogId,
    getImagesByBlogIdAndSize
} from '../../models/blog-image/blog-images.mongo';
import { formatPath } from '../../utils/formatPath';
import { ImageSize } from '../../models/blog-image/blog-images.model';

// Handle errors
const handleError = (res: Response, error: unknown) => {
    res.status(400).json({ error: (error as Error).message || 'An unknown error occurred' });
};

// Create a new blog image
export const createBlogImageController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { size } = req.body;
    if (req.file) {
        const imagePath = formatPath(req.file.path);
        try {
            const image = await createBlogImage({size: size, image: imagePath, blog: id});
            res.status(201).json(image);
        } catch (error) {
            handleError(res, error);
        }
    } else {
        res.status(400).json({ error: 'No image uploaded' });
    }
};

// Get all images
export const getAllImagesController = async (_req: Request, res: Response) => {
    try {
        const images = await getAllImages();
        res.status(200).json(images);
    } catch (error) {
        handleError(res, error);
    }
};

// Get images by blog ID
export const getImagesByBlogIdController = async (req: Request, res: Response) => {
    try {
        const images = await getImagesByBlogId(req.params.blogId);
        res.status(200).json(images);
    } catch (error) {
        handleError(res, error);
    }
};

// Get images by blog ID and size
export const getImagesByBlogIdAndSizeController = async (req: Request, res: Response) => {
    try {
        const images = await getImagesByBlogIdAndSize(req.params.blogId, req.params.size as ImageSize);
        res.status(200).json(images);
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a blog image by ID
export const deleteBlogImageByIdController = async (req: Request, res: Response) => {
    try {
        await deleteBlogImageById(req.params.imageId);
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};
