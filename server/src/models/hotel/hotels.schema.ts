// src/models/hotel/hotels.schema.ts
export interface IHotelSchema  {
    title: string;
    resume: string;
    host: string;
    principalImage?: any;
    images?: [any];
    services?: [string];
    comments?: [string];
    capacity:number;
    price:number;
    minDays:number;
    maxDays: number;
    city?: string;
}
export interface PrincipalHotelImage{
    default:string;
    small:string;
    medium:string;
    large:string;
}
export interface IAddHotelSchema {
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