// src/ui/admin/features/blog/screens/blog-comments/blog-comments.screen.tsx

import React, { useEffect, useState } from 'react';
// import './blog-comments.style.scss';
import { getCommentsByBlogData, IBlogCommentData } from "../../../../../../data/blog-page/blogs.data.ts";
import BlogCommentsTable from "../../components/blog-comments-table/blog-comments-table.component.tsx";
import api from "../../../../../../utils/api.ts";
import {useParams} from "react-router-dom";

const AdminBlogComments: React.FC = () => {
    const [comments, setComments] = useState<IBlogCommentData[]>([]);
    const {blogId} = useParams()

    useEffect(() => {
        if (blogId) {
            getCommentsByBlogData(blogId).then((data) => {
                setComments(data.data);
            });
        }
    }, [blogId]);

    const handleDelete = (id: string) => {
        // Assuming API call is similar to blog tags deletion
        api.delete(`blog-comments/${id}`).then(() => {
            setComments(comments.filter(comment => comment._id !== id));
        });
    };

    return (
        <div className="admin-comments-page">
            <div className={"title-wrapper"}>
                <h2>Manage Blog Comments</h2>
            </div>
            {comments.length>0 ? <BlogCommentsTable comments={comments} onDelete={handleDelete}/>
            :
            <h2 style={{textAlign:'center'}}>No comments yet</h2>}
        </div>
    );
};

export default AdminBlogComments;
