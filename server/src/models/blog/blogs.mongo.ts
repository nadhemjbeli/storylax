// src/models/blog/blogs.mongo.ts

import {Blog, IBlog} from './blogs.model';
import {BlogTag} from "./blog-tag/blog-tags.model";
import {BlogImage} from "../blog-image/blog-images.model";
import {getImagesByBlogId} from "../blog-image/blog-images.mongo";

// Create a new blog
export const createBlog = async (blogData: Partial<IBlog>) => {
    console.log(blogData);
    const blog = new Blog(blogData);
    return await blog.save();
};

// Get all blogs
// Get all blogs and manually populate tags
export const getAllBlogs = async () => {
    // Fetch all blogs
    const blogs:IBlog[] = await Blog.find().populate('city').populate('author').sort({updatedAt:-1});

    // Fetch tags for each blog and attach them
    const blogsWithTagsAndImages = await Promise.all(
        blogs.map(async (blog) => {
            // Fetch tags associated with the current blog
            // const tags = await BlogTag.find({ blog: blog._id });
            // Fetch images associated with the current blog
            const images = await getImagesByBlogId(blog._id as string);
            return { ...blog.toObject(), images }; // Attach tags and images to the blog object
        })
    );

    return blogsWithTagsAndImages;
};

// Get all blogs
// Get all blogs and manually populate tags
export const getAllBlogsByCity = async (city:string) => {
    // Fetch all blogs
    const blogs = await Blog.find({city}).populate('city');

    // Fetch tags for each blog and attach them
    const blogsWithTags = await Promise.all(
        blogs.map(async (blog) => {
            // Fetch tags associated with the current blog
            const tags = await BlogTag.find({ blog: blog._id });
            return { ...blog.toObject(), tags }; // Attach tags to the blog object
        })
    );

    return blogs;
};

// Get a blog by ID with manually populated tags
export const getBlogById = async (id: string) => {
    // Fetch a single blog
    const blog = await Blog.findById(id).populate('city');

    if (!blog) {
        return null;
    }
    console.log(blog)

    // Fetch tags associated with the blog
    // const tags = await BlogTag.find({ blog: blog._id });;
    // Fetch images associated with the current blog
    const images = await getImagesByBlogId(blog._id as string);
    return { ...blog.toObject(), images }; // Attach tags and images to the blog object
};

// Update a blog by ID
export const updateBlogById = async (id: string, updateData: Partial<IBlog>) => {
    return await Blog.findByIdAndUpdate(id, {...updateData, updatedAt:Date.now()}, { new: true });
};

// Delete a blog by ID
export const deleteBlogById = async (id: string) => {
    return await Blog.findByIdAndDelete(id);
};
