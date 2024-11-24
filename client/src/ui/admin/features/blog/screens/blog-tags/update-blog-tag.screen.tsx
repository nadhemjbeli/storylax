import React, {useEffect, useState} from "react";
import {ITagData, showBlogTagData} from "../../../../../../data/blog-page/blogs.data.ts";
import api from "../../../../../../utils/api.ts";
import {useNavigate, useParams} from "react-router-dom";
import BlogTagForm from "../../components/blog-tag-form/blog-tag-form.component.tsx";

const AdminUpdateBlogTag: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blogTag, setBlogTag] = useState<ITagData>({
        name: ''
    })
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            showBlogTagData(id).then(data => {
                setBlogTag(data.data);
                console.log('data',data.data);
            })
        }
    }, [id]);
    const handleSubmit = async (values: ITagData) => {
        console.log('Submitted values:', values);

        // Send the FormData to the API
        try {
            await api.put(`/blog-tags/${values._id}`, values);

            // Handle success, e.g., redirect to another page
            navigate(`/admin/blog-tags`)
        } catch (error) {
            console.error('Error uploading blog:', error);
        }
    };


    return (
        <div className="update-blog">
            <BlogTagForm blogTag={blogTag}  title={"Update blog tag"} submitText={"Update"} onSubmit={handleSubmit} />
        </div>
    );
};

export default AdminUpdateBlogTag;
