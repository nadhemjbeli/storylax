// src/routes/blog/blog-review/blog-reviews.controller.ts

import { Request, Response } from 'express';
import { createReview, getReviewsByBlogId, deleteReviewById } from '../../../models/blog/blog-review/blog-reviews.mongo';
import {handleError} from "../../../utils/types";
import {IUser} from "../../../models/user/users.model";

export const createReviewController = async (req: Request, res: Response) => {
    try {
        const review = await createReview({ ...req.body, user: (req.user as IUser)._id });
        res.status(201).json(review);
    } catch (error) {
        handleError(res, error)
    }
};

export const getReviewsByBlogIdController = async (req: Request, res: Response) => {
    try {
        const reviews = await getReviewsByBlogId(req.params.blogId);
        res.status(200).json(reviews);
    } catch (error) {
        handleError(res, error)
    }
};

export const deleteReviewByIdController = async (req: Request, res: Response) => {
    try {
        await deleteReviewById(req.params.id);
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        handleError(res, error)
    }
};
