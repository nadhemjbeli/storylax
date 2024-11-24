import React, { useEffect, useState } from 'react';
import {Link, useParams} from "react-router-dom";
import "./blog-images.style.scss";
import { IBlogData, showBlogData } from "../../../../../../data/blog-page/blogs.data.ts";
import BlogImages from "../../components/blog-image/blog-images/blog.images.component.tsx";


const AdminBlogImagesPage: React.FC = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState<IBlogData>();

    useEffect(() => {
        if (blogId) {
            showBlogData(blogId).then((response) => {
                if (response) {
                    setBlog(response.data);
                    console.log(response.data.images);
                }
            });
        }
    }, [blogId]);

    return (
        <div className="blog-images-page">
            <Link to={'/admin/blogs'} className='link'>
                back
            </Link>
            {blog?
                <BlogImages title={blog && blog.title} images={blog && blog.images as any[]}/>
            :
                <h2>
                    No blog found.
                </h2>
            }
        </div>
    );
};

export default AdminBlogImagesPage;
