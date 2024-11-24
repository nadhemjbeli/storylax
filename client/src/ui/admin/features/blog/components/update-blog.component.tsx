import React, {useEffect, useState} from "react";
import BlogForm from "./blog-form/blog-form.component.tsx";
import {IAddBlogData, showBlogData} from "../../../../../data/blog-page/blogs.data.ts";
import api from "../../../../../utils/api.ts";
import {useNavigate, useParams} from "react-router-dom";

const AdminUpdateBlog: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<IAddBlogData>({
        author: "",
        city: "",
        resume: "",
        tags: [],
        promoted: false,
        description: "",
        defaultImage: '',
        largeImage: "",
        mediumImage: "",
        smallImage: "",
        title: ""
    })
    const navigate = useNavigate()
    useEffect(() => {
        if (id) {
            showBlogData(id).then(data => {
                setBlog(data.data);
                console.log('data',data.data);
            })
        }
    }, [id]);
    const handleSubmit = async (values: any) => {

        if (values.city) {
            // console.log('Submitted values:', values);

            // Create a FormData object to handle file uploads
            const formData = new FormData();

            // Append file and other form data to FormData
            (values.defaultImage && formData.append('defaultImage', values.defaultImage)); // Assuming `values.smallImage` is a File object
            (values.smallImage && formData.append('smallImage', values.smallImage)); // Assuming `values.smallImage` is a File object
            (values.mediumImage && formData.append('mediumImage', values.mediumImage)); // Assuming `values.mediumImage` is a File object
            (values.largeImage && formData.append('largeImage', values.largeImage)); // Assuming `values.largeImage` is a File object
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('resume', values.resume);
            // formData.append('tags', values.tags);
            // Append tags as individual string items
            values.tags.forEach((tag: string) => {
                formData.append('tags[]', tag);
            });
            formData.append('city', values.city);
            formData.append('promoted', values.promoted);
            // Send the FormData to the API
            try {
                const response = await api.put(`/blogs/${blog._id}`, formData, {
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
        <div className="update-blog">
            <BlogForm blog={{...blog, smallImage:'', mediumImage:'', largeImage:''}}  title={"Update blog"} submitText={"Update"} onSubmit={handleSubmit} />
        </div>
    );
};

export default AdminUpdateBlog;
