// src/models/hotel/hotel-services/hotel-services.model.ts

import { Schema, Document, model } from 'mongoose';

export interface IHotelService extends Document {
    hotel: string;
    name: string;
}

const HotelServiceSchema: Schema = new Schema({
    name: { type: String, required: true },
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
});

export const HotelService = model<IHotelService>('Hotel-Service', HotelServiceSchema);
