// src/models/blog/blogs.schema.ts
import {Types} from "mongoose";
import {ImageSize} from "./blog-images.model";
export interface IBlogImageSchema  {
    blog: any; // Reference to the blog
    image: string; // Path to the image
    size?: ImageSize; // Enum for the image size
    createdAt?: Date;
}