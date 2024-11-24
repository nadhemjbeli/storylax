// src/ui/admin/features/blog/screens/AdminBlogs.tsx

import React, {useEffect, useState} from 'react';
import BlogTable from '../../components/blogs-table/blogs-table.component.tsx';
import './blogs.style.scss';
import {getBlogsData, IBlogData} from "../../../../../../data/blog-page/blogs.data.ts";
import {ReactComponent as TagsIcon} from "../../../../../../assets/svg/admin/tags.icon.svg";
import {Link} from "react-router-dom";
import api from "../../../../../../utils/api.ts";

const AdminBlogs: React.FC = () => {
    const [blogs, setBlogs] = useState<IBlogData[]>([]);

    useEffect(() => {
        getBlogsData().then((data) => {
            setBlogs(data.data);
        })
    }, []);

    const handleDelete = (id: string) => {
        api.delete(`blogs/${id}`).then((_) => {
            setBlogs(blogs.filter(blog => blog._id !== id));
        })
    };

    return (
        <div className="admin-blogs-page">
            <div className={"title-wrapper"}>
                <h2>Manage Blogs</h2>
                <div className="buttons-wrapper">
                    <Link to={"/admin/blog-tags"}>
                        <button className="primary-button button-icon">
                            <TagsIcon className={"svg-icon"} />
                        </button>
                    </Link>
                    <Link to={"/admin/add-blog"}>
                        <button className="primary-button">add a blog</button>
                    </Link>
                </div>
            </div>
            <BlogTable blogs={blogs} onDelete={handleDelete} />
        </div>
    );
};

export default AdminBlogs;
