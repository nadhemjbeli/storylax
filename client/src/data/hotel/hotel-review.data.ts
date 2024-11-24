// src/data/hotel/hotel-review.data.ts
import api from "../../utils/api.ts";

export interface IHotelReview {
    _id?: string;
    hotel: any;
    user:any;
    reservation: any;
    rating: number; // from 1 to 5
    comment: string;
}
export interface IAddHotelReview {
    hotelId?: string;
    reservationId?: string;
    hotel?: string;
    reservation?: string;
    rating: number; // from 1 to 5
    comment: string;
}


const getHotelReviews = async ()=>{
    return await api.get(`hotel-reviews`)
}
const getHotelReviewsByHotel = async (hotelId:string)=>{
    return await api.get(`hotel-reviews/hotel/${hotelId}`)
}

export {
    getHotelReviews,
    getHotelReviewsByHotel
}