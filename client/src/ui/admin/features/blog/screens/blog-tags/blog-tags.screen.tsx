// src/ui/admin/features/blog/screens/AdminBlogs.tsx

import React, {useEffect, useState} from 'react';
import './blog-tags.style.scss';
import {getBlogTagsData, ITagData} from "../../../../../../data/blog-page/blogs.data.ts";
import {Link} from "react-router-dom";
import api from "../../../../../../utils/api.ts";
import BlogTagTable from "../../components/blog-tags-table/blog-tags-table.component.tsx";

const AdminBlogTags: React.FC = () => {
    const [tags, setTags] = useState<ITagData[]>([]);

    useEffect(() => {
        getBlogTagsData().then((data) => {
            setTags(data.data);
        })
    }, []);

    const handleDelete = (id: string) => {
        api.delete(`blog-tags/${id}`).then((_) => {
            setTags(tags.filter(tag => tag._id !== id));
        })
    };

    return (
        <div className="admin-blogs-page">
            <div className={"title-wrapper"}>
                <h2>Manage Blog Tags</h2>
                <Link to={"/admin/add-blog-tag"}>
                    <button className="primary-button">add a blog tag</button>
                </Link>
            </div>
            <BlogTagTable tags={tags} onDelete={handleDelete} />
        </div>
    );
};

export default AdminBlogTags;
