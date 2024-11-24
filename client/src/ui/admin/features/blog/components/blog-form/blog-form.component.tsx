import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import './blog-form.style.scss';
import {getBlogTagsData, IAddBlogData, ITagData} from '../../../../../../data/blog-page/blogs.data.ts';
import { getCitiesData, ICitySchema } from '../../../../../../data/city.data.ts';
import { useOutsideClick } from '../../../../../../hooks/useOutsideClick.tsx';
import ReactQuillComponent from "../../../../components/react-quill/react-quill.component.tsx";
import {BlogUpdateFormSchema} from "../../../../../../schemas/blog/blog.schema.ts";

interface BlogFormProps {
    onSubmit: (values: IAddBlogData) => void;
    submitText: string;
    title: string;
    blog: IAddBlogData;
}

const BlogForm: React.FC<BlogFormProps> = ({ blog, title, submitText, onSubmit }) => {
    const [cities, setCities] = useState<ICitySchema[]>([]);
    const [blogTags, setBlogTags] = useState<ITagData[]>([]);
    const [filteredCities, setFilteredCities] = useState<ICitySchema[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(blog.city ? blog.city?.name : '');
    const [selectedTags, setSelectedTags] = useState<string[]>(blog.tags||[]);

    const ref = useOutsideClick(() => {
        setFilteredCities([]);
        if (!values.city) {
            setFieldValue('city', '');
            setSearchQuery('');
        }
    });
    // const { userId } = useAuth();

    useEffect(() => {
        getCitiesData().then((data) => {
            setCities(data.data);
            setFilteredCities(data.data.filter((city: ICitySchema) => city.name === searchQuery));
        });
        getBlogTagsData().then((data)=>{
            setBlogTags(data.data);
        })
    }, []);

    useEffect(() => {
        setSelectedTags(blog.tags as string[])
        setSearchQuery(blog.city ? blog.city?.name : '');
    }, [blog]);

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        setValues
    } = useFormik({
        initialValues: {
            title: blog.title || '',
            description: blog.description || '',
            resume: blog.resume || '',
            author: blog.author || '',
            city: blog.city || '',
            defaultImage: '',
            smallImage: '',
            mediumImage: '',
            largeImage: '',
            promoted: blog.promoted || false,
            tags: blog.tags || []
        },
        validationSchema: BlogUpdateFormSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    useEffect(() => {
        setValues({ ...blog, tags:selectedTags, city: blog.city._id });
    }, [blog]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        const filtered = cities.filter(city => city.name.toLowerCase().includes(query));

        setSearchQuery(query);
        setFilteredCities(filtered);

        if (!filtered.some(city => city.name.toLowerCase() === query)) {
            setFieldValue('city', '');
        }
    };

    const handleSearchClick = () => {
        const filtered = cities.filter(city => city.name.toLowerCase().includes(searchQuery));

        setFilteredCities(filtered);

        if (!filtered.some(city => city.name.toLowerCase() === searchQuery)) {
            setFieldValue('city', '');
        }
    };

    const handleCitySelect = (cityId: string, cityName: string) => {
        setSearchQuery(cityName);
        setFilteredCities([]);
        setFieldValue('city', cityId);
    };

    const handleTagChange = (tagId: string) => {
        let updatedTags = selectedTags?[...selectedTags]:[];
        if (updatedTags.includes(tagId)) {
            updatedTags = updatedTags.filter(tag => tag !== tagId);
        }
        else if (updatedTags.includes(tagId) && updatedTags.length === 1) {
            updatedTags = [];
        } else {
            updatedTags.push(tagId);
        }

        // Set tags field touched
        setFieldTouched('tags', true);
        setSelectedTags(updatedTags);
        setFieldValue('tags', updatedTags);
    };

    return (
        <div className="add-blog">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit} className="blog-form">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    placeholder="Blog Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.title && touched.title && (
                    <div className="error-message">{errors.title}</div>
                )}

                <label htmlFor="subtitle">Description</label>
                <ReactQuillComponent
                    value={values.description}
                    onChange={(content) => setFieldValue('description', content)}
                />
                {errors.description && touched.description && (
                    <div className="error-message">{errors.description}</div>
                )}

                <label htmlFor="defaultImage">Default Image</label>
                <input
                    id="defaultImage"
                    name="defaultImage"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        if (event.currentTarget.files) {
                            setFieldValue('defaultImage', event.currentTarget.files[0]);
                        }
                    }}
                />
                {errors.defaultImage && touched.defaultImage && (
                    <div className="error-message">{errors.defaultImage}</div>
                )}

                <label htmlFor="smallImage">Small Image</label>
                <input
                    id="smallImage"
                    name="smallImage"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        if (event.currentTarget.files) {
                            setFieldValue('smallImage', event.currentTarget.files[0]);
                        }
                    }}
                />
                {errors.smallImage && touched.smallImage && (
                    <div className="error-message">{errors.smallImage}</div>
                )}

                <label htmlFor="mediumImage">Medium Image</label>
                <input
                    id="mediumImage"
                    name="mediumImage"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        if (event.currentTarget.files) {
                            setFieldValue('mediumImage', event.currentTarget.files[0]);
                        }
                    }}
                />
                {errors.mediumImage && touched.mediumImage && (
                    <div className="error-message">{errors.mediumImage}</div>
                )}

                <label htmlFor="largeImage">Large Image</label>
                <input
                    id="largeImage"
                    name="largeImage"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        if (event.currentTarget.files) {
                            setFieldValue('largeImage', event.currentTarget.files[0]);
                        }
                    }}
                />
                {errors.largeImage && touched.largeImage && (
                    <div className="error-message">{errors.largeImage}</div>
                )}

                <label htmlFor="resume">Resume</label>
                <textarea
                    id="resume"
                    name="resume"
                    placeholder="Blog Resume"
                    value={values.resume}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.resume && touched.resume && (
                    <div className="error-message">{errors.resume}</div>
                )}

                <label htmlFor="city">City</label>
                <div className="city-search-wrapper">
                    <input
                        id="citySearch"
                        name="citySearch"
                        type="text"
                        placeholder="Search City"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onClick={handleSearchClick}
                    />
                    <div className="citiesList" ref={ref}>
                        {filteredCities.length > 0 && (
                            <ul className="city-dropdown">
                                {filteredCities.map((city) => (
                                    <li
                                        key={city._id}
                                        onClick={() => handleCitySelect(city._id as string, city.name)}
                                    >
                                        {city.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                {
                    errors.city && touched.city && (
                    <div className="error-message">{errors.city as string}</div>
                )}
                <label htmlFor="label-switch">Promoted</label>
                <div className="switch-aside">
                    <label className="switch">
                        <input
                            id="label-switch"
                            name="promoted"
                            type="checkbox"
                            checked={values.promoted}
                            onChange={() => {
                                setFieldValue('promoted', !values.promoted);
                            }}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <label style={{marginTop:"2rem"}}>Tags</label>
                <div className="tags-wrapper">
                    {blogTags.map(tag => (
                        <div key={tag._id} className="switch-aside">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    id={tag._id}
                                    name="tags"
                                    value={tag._id}
                                    checked={selectedTags && selectedTags.includes(tag.name)}
                                    onChange={() => handleTagChange(tag.name)}
                                />
                                <span className="slider"></span>
                            </label>
                            <label htmlFor={tag._id}>{tag.name}</label>
                        </div>
                    ))}
                </div>
                {errors.tags && touched.tags && (
                    <div className="error-message">{errors.tags}</div>
                )}

                <button type="submit" className="submit-button">
                    {submitText}
                </button>
            </form>
        </div>
    );
};

export default BlogForm;

