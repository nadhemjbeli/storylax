// src/models/hotel/hotels.model.ts

import { Schema, Document, model } from 'mongoose';
import {IHotelSchema} from "./hotels.schema";

export interface IHotel extends Document, IHotelSchema {}

const HotelSchema: Schema = new Schema({
    title: { type: String, required: true },
    resume: { type: String, required: true },
    host: { type: Schema.Types.ObjectId, ref: 'User' },
    capacity: { type: Number, required:true},
    rooms: { type: Number, required:true},
    price: { type: Number, required:true},
    minDays: { type: Number, required:true},
    maxDays: { type: Number, required:true},
    // tags: [{ type: Schema.Types.ObjectId, ref: 'Hotel-Tag' }],
    // services: [{type: Schema.Types.ObjectId, ref: 'Hotel-Service' }],
    // comments: [{type: Schema.Types.ObjectId, ref: 'Hotel-Comment' }],
    // images: [{ type: Schema.Types.ObjectId, ref: 'Hotel-Image' }],
    city: { type: Schema.Types.ObjectId, ref: 'City' },
    principalImage: {
        default: { type: String },
        small: { type: String },
        medium: { type: String },
        large: { type: String }
    },
    // promoted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Hotel = model<IHotel>('Hotel', HotelSchema);
