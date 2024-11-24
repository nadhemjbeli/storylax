// src/routes/blog/blog-comment/blog-comments.controller.ts

import { Request, Response } from 'express';
import { createComment, getCommentsByBlogId, deleteCommentById } from '../../../models/blog/blog-comment/blog-comments.mongo';
import {IUser} from "../../../models/user/users.model";
import {handleError} from "../../../utils/types";

export const createCommentController = async (req: Request, res: Response) => {
    try {
        const comment = await createComment({ ...req.body, blog:req.params.blogId});
        console.log(req.user)
        res.status(201).json(comment);
    } catch (error) {
        handleError(res, error);
    }
};

export const getCommentsByBlogIdController = async (req: Request, res: Response) => {
    try {
        const comments = await getCommentsByBlogId(req.params.blogId);
        res.status(200).json(comments);
    } catch (error) {
        handleError(res, error);
    }
};

export const deleteCommentByIdController = async (req: Request, res: Response) => {
    try {
        await deleteCommentById(req.params.id);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        handleError(res, error);
    }
};
