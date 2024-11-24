// src/models/hotel/hotel-review/hotel-reviews.model.ts

import { Schema, Document, model } from 'mongoose';
import { IUser } from "../../user/users.model";
import { IHotel } from "../hotels.model";
import {IReservation} from "../hotel-reservation/hotel-reservations.model";

export interface IHotelRating extends Document {
    hotel: IHotel['_id'];
    user: IUser['_id'];
    reservation: IReservation['_id'];
    rating: number; // from 1 to 5
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

const HotelRatingSchema: Schema = new Schema({
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reservation: { type: Schema.Types.ObjectId, ref: 'Reservation', required: true}, // Ensures one rating per reservation
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Compound unique index to ensure a unique rating per user and reservation
HotelRatingSchema.index({ user: 1, reservation: 1 }, { unique: true });

export const HotelRating = model<IHotelRating>('Hotel-Review', HotelRatingSchema);
