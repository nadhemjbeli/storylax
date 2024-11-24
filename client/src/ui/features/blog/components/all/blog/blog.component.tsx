
// Component for rendering a single blog card
import React from "react";
import {IBlogData} from "../../../../../../data/blog-page/blogs.data.ts";
import {Link} from "react-router-dom";
import "./blog-card.style.scss"
import {api_url} from "../../../../../../utils/domain/back.ts";

const BlogCard: React.FC<{ blog: IBlogData }> = ({ blog }) => (
    <Link to="#" className="blog-card">
        <img src={`${api_url}/${blog.principalImage?.default}`} alt={blog.title} className="blog-image" />
        <div className="blog-content">
            <h3 className="blog-title">{blog.title}</h3>
            {/*<p className="blog-subtitle">{blog.subtitle}</p>*/}
            <p className="blog-excerpt">{blog.resume}</p>
            <div className="blog-tags">
                {blog.tags && blog.tags.map((tag) => (
                    <span key={tag.name} className="blog-tag">
                       {tag}
                    </span>
                ))}
            </div>
        </div>
    </Link>
);

export default BlogCard;