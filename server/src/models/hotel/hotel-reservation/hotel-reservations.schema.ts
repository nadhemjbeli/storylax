// src/models/hotel/reservation/reservation.schema.ts
import { IUser } from "../../user/users.model";
import { IHotel } from "../hotels.model";

export enum ETravelerKeyState {
    nonGiven = 'non given',
    given = 'given',
    taken = 'taken',
    pending = 'pending',
    completed = 'completed',
}

export enum EHostKeyState {
    nonGiven = 'non given',
    given = 'given',
    taken = 'taken',
    pending = 'pending',
    completed = 'completed',
}

export interface IReservationSchema {
    hotel: any;
    customer: any;
    checkIn: Date;
    checkOut: Date;
    travelers: number;
    rooms: number;
    totalPrice: number;
    commented: boolean;
    createdAt: Date;
    updatedAt: Date;
    travelerKeyState: ETravelerKeyState;
    hostKeyState: EHostKeyState;
}
