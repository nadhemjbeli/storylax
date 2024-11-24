import React, {useState} from 'react';
import './all-blogs.style.scss';
import {IBlogData} from "../../../../../data/blog-page/blogs.data.ts";
import BlogCard from "./blog/blog.component.tsx";

// Define the number of posts per page
const POSTS_PER_PAGE = 6;


interface BlogProps {
    blogs: IBlogData[]
}
const AllBlogs: React.FC <BlogProps> = ({blogs}) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(blogs.length / POSTS_PER_PAGE);

    // Get the blogs for the current page
    const currentBlogs = blogs.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );
    console.log(currentBlogs)

    // Function to change the page
    const changePage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="all-blogs container">
            <h2 className="title">All Blog Posts</h2>
            <div className="blog-list">
                {currentBlogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => changePage(currentPage - 1)}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={currentPage === index + 1 ? 'active' : ''}
                        onClick={() => changePage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => changePage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllBlogs;
