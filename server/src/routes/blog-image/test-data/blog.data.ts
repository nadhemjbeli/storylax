// src/models/blog/test-data/blog.data.ts


// Example list of Tunisian blogs
import {IBlogImageSchema} from "../../../models/blog-image/blog-images.schema";

const tunisianBlogs: any[] = [
    {
        image: './test-data/images/blogs/carthage/carthage-ruins.jpg',
    },
    {
        image: './test-data/images/blogs/carthage/carthage-ruins.jpg',
        size: 'large'
    },
    {
        image: './test-data/images/blogs/carthage/carthage-ruins.jpg',
        size:'medium'
    },
];

export { tunisianBlogs };
