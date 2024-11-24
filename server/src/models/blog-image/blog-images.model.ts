// src/models/blog-image/blogImages.model.ts

import { Schema, Document, model, Types } from 'mongoose';
import {IBlogImageSchema} from "./blog-images.schema";

export enum ImageSize {
    LARGE = 'large',
    MEDIUM = 'medium',
    SMALL = 'small',
    DEFAULT = 'default',
    ALT = 'alt'
}

export interface IBlogImage extends Document, IBlogImageSchema {
}

const BlogImageSchema: Schema = new Schema({
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    image: { type: String, required: true },
    size: { type: String, enum: Object.values(ImageSize), required: true , default:ImageSize.DEFAULT },
    createdAt: { type: Date, default: Date.now }
});

export const BlogImage = model<IBlogImage>('Blog-Image', BlogImageSchema);
