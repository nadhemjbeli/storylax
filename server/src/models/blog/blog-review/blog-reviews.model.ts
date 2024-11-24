// src/models/blog/blog-review/blog-reviews.model.ts

import { Schema, Document, model } from 'mongoose';
import { IUser } from '../../user/users.model';
import { IBlog } from '../blogs.model';

export interface IBlogReview extends Document {
    blog: IBlog['_id'];
    user: IUser['_id'];
    rating: number;
    review: string;
    createdAt: Date;
    updatedAt: Date;
}

const BlogReviewSchema: Schema = new Schema({
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const BlogReview = model<IBlogReview>('Blog-Review', BlogReviewSchema);
