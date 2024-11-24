// src/models/blog/blog-review/blog-reviewss.mongo.ts

import { BlogReview, IBlogReview } from './blog-reviews.model';

export const createReview = async (reviewData: Partial<IBlogReview>) => {
    const review = new BlogReview(reviewData);
    return await review.save();
};

export const getReviewsByBlogId = async (blogId: string) => {
    return await BlogReview.find({ blog: blogId }).populate('user').sort({ createdAt: -1 });
};

export const deleteReviewById = async (id: string) => {
    return await BlogReview.findByIdAndDelete(id);
};
