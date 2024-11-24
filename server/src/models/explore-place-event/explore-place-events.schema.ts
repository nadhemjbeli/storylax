// src/models/explore-place-event/explore-place-events.schema.ts
import {Types} from "mongoose";
export interface IBlogSchema  {
    title: string;
    subtitle: string;
    excerpt: string;
    image: any;
    tags?: Types.ObjectId[];
    city?: Types.ObjectId;
    promoted: Boolean;
}
export interface IAddBlogSchema {
    city: string; // Assuming city is a reference to a City document
    title: string;
    subtitle: string;
    excerpt: string;
    image: string; // Updated to match the blog data
    tags: string[]; // Assuming tags are just strings or an array of IDs
    promoted: boolean; // Corrected to boolean
}