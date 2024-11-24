// src/routes/blog/blogs.controller.ts

import { Request, Response } from 'express';
import { createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById } from '../../models/blog/blogs.mongo';
import { ICustomError } from '../../utils/types';
import {IUser} from "../../models/user/users.model"; // Import the custom error type

// Helper function to handle errors
const handleError = (res: Response, error: unknown) => {
    const err = error as ICustomError;
    res.status(400).json({ error: err.message || 'An unknown error occurred' });
};

// Create a new blog
export const createBlogController = async (req: Request, res: Response) => {
    try {
        const blog = await createBlog({...req.body, author:(req.user as IUser)._id});
        res.status(201).json(blog);
    } catch (error) {
        handleError(res, error);
    }
};

// Get all blogs
export const getAllBlogsController = async (_req: Request, res: Response) => {
    try {
        const blogs = await getAllBlogs();
        res.status(200).json(blogs);
    } catch (error) {
        handleError(res, error);
    }
};

// Get a blog by ID
export const getBlogByIdController = async (req: Request, res: Response) => {
    try {
        const blog = await getBlogById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        handleError(res, error);
    }
};

// Update a blog by ID
export const updateBlogByIdController = async (req: Request, res: Response) => {
    try {
        const blog = await updateBlogById(req.params.id, req.body);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a blog by ID
export const deleteBlogByIdController = async (req: Request, res: Response) => {
    try {
        const blog = await deleteBlogById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};