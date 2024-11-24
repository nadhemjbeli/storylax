// src/models/blog/blogs.schema.ts
export interface IBlogSchema  {
    title: string;
    description: string;
    resume: string;
    author:any;
    principalImage: any;
    tags?: [string];
    city?: string;
    promoted: Boolean;
}
export interface PrincipalBlogImage{
    default:string;
    small:string;
    medium:string;
    large:string;
}
export interface IAddBlogSchema {
    city: string; // Assuming city is a reference to a City document
    title: string;
    description: string;
    author: string;
    resume: string;
    principalImage: any; // Updated to match the blog data
    tags: [string]; // Assuming tags are just strings or an array of IDs
    promoted: boolean; // Corrected to boolean
    images?:any[];
}