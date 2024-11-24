// src/models/blog-image/blogImages.mongo.ts

import { BlogImage, ImageSize } from './blog-images.model';
import {IBlogImageSchema} from "./blog-images.schema";

// Create a new blog image
export const createBlogImage = async (blogImageData:IBlogImageSchema) => {
    const blogImage = new BlogImage(blogImageData);
    return await blogImage.save();
};

// Get all images
export const getAllImages = async () => {
    return await BlogImage.find();
};

// Get images by blog ID
export const getImagesByBlogId = async (blogId: string) => {
    return await BlogImage.find({ blog: blogId });
};

// Get images by blog ID and size
export const getImagesByBlogIdAndSize = async (blogId: string, size: ImageSize) => {
    return await BlogImage.find({ blog: blogId, size });
};

// Delete an image by ID
export const deleteBlogImageById = async (id: string) => {
    return await BlogImage.findByIdAndDelete(id);
};
