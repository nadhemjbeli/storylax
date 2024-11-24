// src/models/blog/blog-comment/blog-tags.model.ts

import { Schema, Document, model } from 'mongoose';
import { IUser } from '../../user/users.model';
import { IBlog } from '../blogs.model';

export interface IBlogComment extends Document {
    blog: IBlog['_id'];
    user: IUser['_id'];
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

const BlogCommentSchema: Schema = new Schema({
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const BlogComment = model<IBlogComment>('Blog-Comment', BlogCommentSchema);
