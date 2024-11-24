import React from "react";
import BlogTagForm from "../../components/blog-tag-form/blog-tag-form.component.tsx";
import {ITagData} from "../../../../../../data/blog-page/blogs.data.ts";
import api from "../../../../../../utils/api.ts";
import {useNavigate} from "react-router-dom";

const AdminAddBlogTag: React.FC = () => {
    const blogTag: ITagData = {
        name: "",
    }
    const navigate = useNavigate()
    const handleSubmit = async (values: ITagData) => {
        console.log('Submitted values:', values);

        // Send the FormData to the API
        try {
            await api.post('/blog-tags', values);

            // Handle success, e.g., redirect to another page
            navigate(`/admin/blog-tags`)
        } catch (error) {
            console.error('Error uploading blog:', error);
        }
    };


    return (
        <div className="add-blog">
            <BlogTagForm blogTag={blogTag}  title={"Add blog tag"} submitText={"Submit"} onSubmit={handleSubmit} />
        </div>
    );
};

export default AdminAddBlogTag;
