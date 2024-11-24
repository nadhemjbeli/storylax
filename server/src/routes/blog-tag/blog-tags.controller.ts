// src/routes/blog-tag/blog-tags.controller.ts

import { Request, Response } from 'express';
import { createTag, getAllTags, getTagById, updateTagById, deleteTagById } from '../../models/blog/blog-tag/blog-tags.mongo';
import { ICustomError } from '../../utils/types'; // Ensure this type is defined and imported

// Helper function to handle errors
const handleError = (res: Response, error: unknown) => {
    const err = error as ICustomError;
    res.status(400).json({ error: err.message || 'An unknown error occurred' });
};

// Create a new tag
export const createTagController = async (req: Request, res: Response) => {
    try {
        const tag = await createTag(req.body);
        res.status(201).json(tag);
    } catch (error) {
        handleError(res, error);
    }
};

// Get all tags
export const getAllTagsController = async (_req: Request, res: Response) => {
    try {
        const tags = await getAllTags();
        res.status(200).json(tags);
    } catch (error) {
        handleError(res, error);
    }
};

// Get a tag by ID
export const getTagByIdController = async (req: Request, res: Response) => {
    try {
        const tag = await getTagById(req.params.id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.status(200).json(tag);
    } catch (error) {
        handleError(res, error);
    }
};

// Update a tag by ID
export const updateTagByIdController = async (req: Request, res: Response) => {
    try {
        const tag = await updateTagById(req.params.id, req.body);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.status(200).json(tag);
    } catch (error) {
        handleError(res, error);
    }
};

// Delete a tag by ID
export const deleteTagByIdController = async (req: Request, res: Response) => {
    try {
        const tag = await deleteTagById(req.params.id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};

