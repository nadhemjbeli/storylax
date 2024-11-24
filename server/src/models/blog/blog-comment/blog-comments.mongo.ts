// src/models/blog/blog-comment/blog-comments.mongo.ts

import { BlogComment, IBlogComment } from './blog-comments.model';

export const createComment = async (commentData: Partial<IBlogComment>) => {
    const comment = new BlogComment(commentData);
    return await comment.save();
};

export const getCommentsByBlogId = async (blogId: string) => {
    return await BlogComment.find({ blog: blogId }).populate('user').sort({ createdAt: -1 });
};

export const deleteCommentById = async (id: string) => {
    return await BlogComment.findByIdAndDelete(id);
};
