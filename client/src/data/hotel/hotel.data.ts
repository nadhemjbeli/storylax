// src/data/hotel/hotel.data.ts
import api from "../../utils/api.ts";
import {ICitySchema} from "../city.data.ts";
import {IUserData} from "../authenticate/user.data.ts";

export interface IHotel {
    _id?: string;
    title: string;
    resume: string;
    host?: IUserData;
    principalImage?: any;
    images?: [any];
    services?: any[];
    reviews?: any[];
    reviewCount?: number;
    avgRating?: number;
    // comments?: [any];
    minDays: number;
    maxDays: number;
    price: number;
    capacity: number;
    rooms: number;
    city?: ICitySchema;
}
export interface IRecommendedHotel {
    hotel:IHotel;
    score: number;
}

export interface IAddHotel {
    id?: string;
    title: string;
    resume: string;
    host?: string;
    // principalImage?: any;
    defaultImage: string;
    smallImage: string;
    mediumImage: string;
    largeImage: string;
    // images?: [any];
    // services?: [any];
    // comments?: [any];
    minDays: number;
    maxDays: number;
    price: number;
    capacity: number;
    city?: string;
}

export interface IHotelService {
    _id?: string;
    name: string;
    hotel: IHotel;
}

export interface IAddHotelService {
    name: string;
    hotel: string;
}
const getHotels = async ()=>{
    return await api.get(`/hotels`)
}
const getHotelsByService = async (query:string)=>{
    return await api.get(`/hotels-by-service${query}`)
}
const getHotelServicesByHotel = async (id:string)=>{
    return await api.get(`/hotel-services-by-hotel/${id}`)
}
const getHotelsByHost = async ()=>{
    return await api.get(`/hotels/host`)
}
const getQueriedHotels = async (query:string)=>{
    console.log(`/hotels${query}`)
    return await api.get(`/hotels${query}`)
}
const getRecommandedHotels = async ()=>{
    return await api.get(`/hotels/recommended`)
}
const showHotel = async (id:string)=>{
    return await api.get(`/hotels/${id}`)
}

export {
    getHotels,
    getHotelServicesByHotel,
    getHotelsByHost,
    showHotel,
    getQueriedHotels,
    getRecommandedHotels,
    getHotelsByService
}