// src/data/hotel/hotel-reservations.data.ts
import api from "../../utils/api.ts";
import {IUserData} from "../authenticate/user.data.ts";
import {IHotel} from "./hotel.data.ts";

export interface IHotelReservation {
    _id?: string;
    hotel: IHotel;
    customer: IUserData;
    checkIn: Date;
    checkOut: Date;
    travelers: number;
    rooms: number;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    travelerKeyState: string;
    hostKeyState: string;
    commented?: boolean;
}
export interface IAddHotel {
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
const getHotelReservations = async ()=>{
    return await api.get(`/hotel-reservations`)
}
const getHotelReservationsByHost = async ()=>{
    return await api.get(`/hotel-reservations/hotel/`)
}
const getQueriedHotelReservations = async ()=>{
    return await api.get(`/hotel-reservations/user`)
}
const showHotelReservation = async (id:string)=>{
    return await api.get(`/hotel-reservations/${id}`)
}
const getReservedUsersByHost = async ()=>{
    return await api.get(`/hotel-reservations/users-by-host`)
}
const getCustomerReservationsByHotelHost = async (customerId:string)=>{
    return await api.get(`/hotel-reservations/by-customer-and-hotel-host/${customerId}`)
}

export {
    getHotelReservations,
    getHotelReservationsByHost,
    showHotelReservation,
    getQueriedHotelReservations,
    getCustomerReservationsByHotelHost,
    getReservedUsersByHost
}