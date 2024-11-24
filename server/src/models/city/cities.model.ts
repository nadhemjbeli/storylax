// src/models/city/users.cities.ts
import mongoose, { Schema, Document } from 'mongoose';
import { ICitySchema } from './cities.schema';

export interface ICity extends Document, ICitySchema {}

const CitySchema: Schema = new Schema({
    name: { type: String, required: true , unique:true },
    location: {
        long: { type: Number, required: true },
        lat: { type: Number, required: true },
    },
    createdAt: { type: Date, default: Date.now },
});

export const City = mongoose.model<ICity>('City', CitySchema);