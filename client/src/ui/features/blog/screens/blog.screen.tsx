import React, {useEffect, useState} from 'react';
import "./blog.style.scss"
import Hero from "../components/hero/hero.component.tsx";
import Blog from "../../../components/Blog/blog.component.tsx";
import {getBlogsData, IBlogData} from "../../../../data/blog-page/blogs.data.ts";
import AllBlogs from "../components/all/all-blogs.components.tsx";
import {strings} from "../../../../i18n/strings.ts";

const BlogPage:React.FC = () => {
    const [allBlogs, setAllBlogs] = useState<IBlogData[]>([]);

    useEffect(() => {
        getBlogsData().then(response=>{
            console.log(response.data)
            setAllBlogs(response.data)
        })
    }, []);
    return (
        <div className="blog-page">
            <Hero />
            <Blog title={strings.blogPage.latestBlogs} blogs={allBlogs.slice(-4)} />
            <AllBlogs blogs={allBlogs} />
        </div>
    );
};

export default BlogPage;