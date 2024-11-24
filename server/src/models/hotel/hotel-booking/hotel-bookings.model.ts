// src/models/hotel/hotel-booking/hotel-bookings.model.ts

import { Schema, Document, model } from 'mongoose';
import {EStatus, IBookingHotelSchema} from "./hotel-bookings.schema";

export interface IBookingHotel extends Document, IBookingHotelSchema {}


const BookingSchema: Schema = new Schema({
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, required: true, default: EStatus.inProgress},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    travelers: { type: Number, required: true },
    rooms: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


export const BookingHotel = model<IBookingHotel>('Booking-Hotel', BookingSchema);
