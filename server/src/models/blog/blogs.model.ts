// src/models/blog/blogs.model.ts

import { Schema, Document, model } from 'mongoose';
import { IBlogSchema } from "./blogs.schema";

export interface IBlog extends Document, IBlogSchema {}

const BlogSchema: Schema = new Schema({
    title: { type: String, required: true },
    resume: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String, required: true },
    // tags: [{ type: Schema.Types.ObjectId, ref: 'Blog-Tag' }],
    tags: [{ type: String }],
    images: [{ type: Schema.Types.ObjectId, ref: 'Blog-Image' }],
    city: { type: Schema.Types.ObjectId, ref: 'City' },
    principalImage: {
        default: { type: String },
        small: { type: String },
        medium: { type: String },
        large: { type: String }
    },
    promoted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Blog = model<IBlog>('Blog', BlogSchema);
