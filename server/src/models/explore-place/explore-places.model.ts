// src/models/place/explore-places.model.ts

import { Schema, Document, model } from 'mongoose';
import {ICity} from "../city/cities.model";

export interface IExplorePlace extends Document {
    description: string;
    image: string;
    motivationalSentence: string;
    city: ICity['_id'];
    createdAt:Date;
}

const PlaceSchema: Schema = new Schema({
    description: { type: String, required: true },
    image: { type: String, required: true },
    motivationalSentence: { type: String, required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City' },
    createdAt: { type: Date, default: Date.now },
    // events: [{ type: Schema.Types.ObjectId, ref: 'Event' }] // Assuming a relation to an Event schema
});

export const ExplorePlace = model<IExplorePlace>('Explore-Place', PlaceSchema);
