import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import './blog-tag-form.style.scss';
import {ITagData} from '../../../../../../data/blog-page/blogs.data.ts';
import {BlogTagFormSchema} from "../../../../../../schemas/blog/blog-tag.schema.ts";

interface BlogFormProps {
    onSubmit: (values: ITagData) => void;
    submitText: string;
    title: string;
    blogTag: ITagData;
}

const BlogTagForm: React.FC<BlogFormProps> = ({ blogTag, title, submitText, onSubmit }) => {
    // const [cities, setCities] = useState<ICitySchema[]>([]);
    // const [blogTags, setBlogTags] = useState<ITagData[]>([]);
    // const [filteredCities, setFilteredCities] = useState<ICitySchema[]>([]);
    // const [searchQuery, setSearchQuery] = useState<string>(blogTag.city ? blogTag.city?.name : '');


    // const { userId } = useAuth();

    // useEffect(() => {
    //     getCitiesData().then((data) => {
    //         setCities(data.data);
    //         setFilteredCities(data.data.filter((city: ICitySchema) => city.name === searchQuery));
    //     });
    //     getBlogTagsData().then((data)=>{
    //         setBlogTags(data.data);
    //     })
    // }, []);
    //
    // useEffect(() => {
    //     // setSelectedTags(blog.tags as string[])
    //     // setSearchQuery(blog.city ? blog.city?.name : '');
    // }, [blogTag]);

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        // setFieldValue,
        setValues
    } = useFormik({
        initialValues: {
            name: blogTag.name || '',
        },
        validationSchema: BlogTagFormSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    useEffect(() => {
        console.log(blogTag)
        setValues(blogTag);
    }, [blogTag]);


    return (
        <div className="admin-form">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className="blog-tag-form">
                <label htmlFor="name">Tag Name:</label>
                <input
                    id="name"
                    name="name"
                    placeholder="Tag Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.name && touched.name && (
                    <div className="error-message">{errors.name}</div>
                )}



                <button type="submit" className="submit-button">
                    {submitText}
                </button>
            </form>
        </div>
    );
};

export default BlogTagForm;

