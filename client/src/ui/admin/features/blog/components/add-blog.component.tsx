import React from "react";
import BlogForm from "./blog-form/blog-form.component.tsx";
import {IAddBlogData} from "../../../../../data/blog-page/blogs.data.ts";
import api from "../../../../../utils/api.ts";
import {useNavigate} from "react-router-dom";

const AdminAddBlog: React.FC = () => {
    const blog: IAddBlogData = {
        author: "",
        city: "",
        resume: "",
        defaultImage: "",
        smallImage: "",
        mediumImage: "",
        largeImage: "",
        promoted: false,
        description: "",
        title: ""
    }
    const navigate = useNavigate()
    const handleSubmit = async (values: any) => {
        if (values.city) {
            console.log('Submitted values:', values);

            // Create a FormData object to handle file uploads
            const formData = new FormData();

            // Append file and other form data to FormData
            formData.append('defaultImage', values.defaultImage); // Assuming `values.smallImage` is a File object
            formData.append('smallImage', values.smallImage); // Assuming `values.smallImage` is a File object
            formData.append('mediumImage', values.mediumImage); // Assuming `values.mediumImage` is a File object
            formData.append('largeImage', values.largeImage); // Assuming `values.largeImage` is a File object
            formData.append('title', values.title);
            formData.append('description', values.description);
            // formData.append('tags', values.tags);
            // Append tags as individual string items
            values.tags.forEach((tag: string) => {
                formData.append('tags[]', tag);
            });
            formData.append('resume', values.resume);
            formData.append('city', values.city);
            formData.append('promoted', values.promoted);

            // Send the FormData to the API
            try {
                const response = await api.post('/blogs', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Server response:', response.data);

                // Handle success, e.g., redirect to another page
                navigate(`/admin/blogs`)
            } catch (error) {
                console.error('Error uploading blog:', error);
            }
        } else {
            console.log("No city selected");
        }
    };


    return (
        <div className="add-blog">
            <BlogForm blog={blog}  title={"Add blog"} submitText={"Submit"} onSubmit={handleSubmit} />
        </div>
    );
};

export default AdminAddBlog;
