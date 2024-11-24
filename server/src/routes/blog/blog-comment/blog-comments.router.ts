import express from 'express';
import { createCommentController, getCommentsByBlogIdController, deleteCommentByIdController } from './blog-comments.controller';
import {authenticateTraveler, authenticateUserByRole} from '../../../middleware/auth';

const blogCommentsRouter = express.Router();
const adminRoles = ['admin']

blogCommentsRouter.post('/blog-comments/:blogId', createCommentController);
blogCommentsRouter.get('/blog-comments/:blogId', getCommentsByBlogIdController);
blogCommentsRouter.delete('/blog-comments/:id', authenticateUserByRole(adminRoles), deleteCommentByIdController);

export default blogCommentsRouter;