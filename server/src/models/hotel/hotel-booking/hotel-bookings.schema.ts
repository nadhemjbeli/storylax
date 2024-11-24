// src/models/hotel/hotel-booking/hotel-bookings.schema.ts
import {IUser} from "../../user/users.model";
import {IHotel} from "../hotels.model";

export enum EStatus{
    accepted= 'accepted',
    inProgress= 'in progress',
    rejected= 'rejected',
}

export interface IBookingHotelSchema  {
    hotel: IHotel['_id'];
    user: IUser['_id'];
    startDate: Date;
    endDate: Date;
    travelers: number;
    rooms: number;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    status: EStatus;
}