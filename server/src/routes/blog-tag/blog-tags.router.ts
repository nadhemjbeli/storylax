// src/routes/blog-tag/blog-tags.router.ts

import express from 'express';
import {
    createTagController, deleteTagByIdController,
    getAllTagsController,
    getTagByIdController,
    updateTagByIdController
} from "./blog-tags.controller";

const router = express.Router();

// Create a new tag
router.post('/blog-tags', createTagController);

// Get all tags
router.get('/blog-tags', getAllTagsController);

// Get a tag by ID
router.get('/blog-tags/:id', getTagByIdController);

// Update a tag by ID
router.put('/blog-tags/:id', updateTagByIdController);

// Delete a tag by ID
router.delete('/blog-tags/:id', deleteTagByIdController);

export default router;
