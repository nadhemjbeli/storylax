import express from 'express';
import {
    createReviewController,
    deleteReviewByIdController,
    getReviewsByBlogIdController
} from './blog-reviews.controller';
import { authenticateUserByRole } from '../../../middleware/auth';
import {adminRoles} from "../../../utils/roleVariables";

const blogReviewsRouter = express.Router();

blogReviewsRouter.post('/blog-reviews/:blogId', authenticateUserByRole(adminRoles), createReviewController);
blogReviewsRouter.get('/blog-reviews/:blogId', getReviewsByBlogIdController);
blogReviewsRouter.delete('/blog-reviews/:id', authenticateUserByRole(adminRoles), deleteReviewByIdController);

export default blogReviewsRouter;