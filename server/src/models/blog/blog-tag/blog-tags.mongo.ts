// src/models/blog-tag/blog-tags.mongo.ts

import { BlogTag, ITag } from './blog-tags.model';

// Create a new tag
export const createTag = async (tagData: Partial<ITag>) => {
    const tag = new BlogTag(tagData);
    return await tag.save();
};

// Get all tags
export const getAllTags = async () => {
    return await BlogTag.find().sort({updatedAt: -1});
};

// Get a tag by ID
export const getTagById = async (id: string) => {
    return await BlogTag.findById(id);
};

// Update a tag by ID
export const updateTagById = async (id: string, updateData: Partial<ITag>) => {
    return await BlogTag.findByIdAndUpdate(id, {...updateData, updatedAt:Date.now()}, { new: true });
};

// Delete a tag by ID
export const deleteTagById = async (id: string) => {
    return await BlogTag.findByIdAndDelete(id);
};


// Create a new tag and associate it with a blog
// export const createTagAndAssociateWithBlog = async (tagData: Partial<ITag>) => {
//     const tag = new BlogTag({ ...tagData});
//     return await tag.save();
// };
