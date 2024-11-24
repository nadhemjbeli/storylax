import api from "../../utils/api.ts";
import {IHotel} from "./hotel.data.ts";
import {IUserData} from "../authenticate/user.data.ts";

export interface IBookingHotel  {
    _id?: string;
    hotel: IHotel;
    user: IUserData;
    startDate: Date;
    endDate: Date;
    travelers: number;
    rooms: number;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    status: string;
}
export interface IStatusBookingHotel  {
    status: string;
}

const getPublishableKey=async ()=>{
    return await api.get(`/publishable-key`)
}
const createPaymentIntent=async (price:number)=>{
    // const totalPrice = price!=0?price*100:10*100
    const totalPrice = price*100
    return await api.post(`/create-payment-intent`,{totalPrice})
}

const getBookingsByHotel = async (hotelId:string)=>{
    return await api.get(`/hotel-bookings/hotel/${hotelId}`)
}
const getAllBookings = async ()=>{
    return await api.get(`/hotel-bookings`)
}

export{
    getPublishableKey,
    createPaymentIntent,
    getBookingsByHotel,
    getAllBookings
}

