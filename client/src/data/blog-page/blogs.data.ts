
// Define the interface for the blog data
import api from "../../utils/api.ts";
import {ICitySchema} from "../city.data.ts";


export interface ITagData {
    _id?:string,
    name:string
}
export interface IBlogData {
    _id?: string;
    city?: ICitySchema;
    title: string;
    subtitle: string;
    resume: string;
    principalImage: any;
    author: any;
    tags?: string[];
    images?:any[];
    promoted: boolean;
}
export interface IAddBlogData {
    _id?: string;
    city?: any;
    title: string;
    description: string;
    resume: string;
    defaultImage: string;
    smallImage: string;
    mediumImage: string;
    largeImage: string;
    image?:any
    author: string;
    tags?: string[];
    images?:any[];
    promoted: boolean;
}

const blogImageSizes :string[] = [
    "all",
    "large",
    "medium",
    "small",
    "default",
    "alt"
];

export interface IBlogCommentData{
    _id?: string;
    blog?: any;
    user?: any;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IBlogReviewData{
    blog?: any;
    user?: any;
    rating: number;
    review: string;
    createdAt?: Date;
    updatedAt?: Date;
}



const getBlogsData = async ()=>{
    return await api.get('/blogs')
}
const getCommentsByBlogData = async (id:string)=>{
    return await api.get(`/blog-comments/${id}`)
}
const getBlogTagsData = async ()=>{
    return await api.get('/blog-tags')
}

const showBlogData = async (id:string)=>{
    return await api.get(`/blogs/${id}`)
}

const showBlogTagData = async (id:string)=>{
    return await api.get(`/blog-tags/${id}`)
}

export {
    getBlogsData,
    showBlogData,
    getCommentsByBlogData,
    getBlogTagsData,
    showBlogTagData,
    blogImageSizes
};
