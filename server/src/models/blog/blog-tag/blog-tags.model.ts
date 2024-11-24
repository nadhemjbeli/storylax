// src/models/blog-tag/blog-tags.model.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface ITag extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
    // blog?: mongoose.Types.ObjectId; // Reference to blog
}

const TagSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
    // blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' } // Adding a reference to the blogs
});

export const BlogTag = mongoose.model<ITag>('Blog-Tag', TagSchema);
