// src/models/hotel/hotel-reservation/hotel-reservations.model.ts
import { Schema, Document, model } from 'mongoose';
import {
    EHostKeyState,
    ETravelerKeyState,
    IReservationSchema
} from "./hotel-reservations.schema";

export interface IReservation extends Document, IReservationSchema {}

const ReservationSchema: Schema = new Schema({
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    travelers: { type: Number, required: true },
    rooms: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    commented: { type: Boolean, required: false, default: false },
    travelerKeyState: { type: String, required: true, default: ETravelerKeyState.pending },
    hostKeyState: { type: String, required: true, default: EHostKeyState.pending },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Reservation = model<IReservation>('Hotel-Reservation', ReservationSchema);
