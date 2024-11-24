// src/models/place-place-event/explore-place-events.model.ts

import mongoose, { Schema, Document } from 'mongoose';

interface IExploreEvent extends Document {
    title: string;
    exactPlace: string;
    explorePlace: string;
    price: string;
    rate: number;
    image: string;
    createdAt:Date;
}

const EventSchema: Schema = new Schema({
    explorePlace: { type: mongoose.Schema.Types.ObjectId, ref: 'Explore-Place', required: true },
    title: { type: String, required: true },
    exactPlace: { type: String, required: true },
    price: { type: String, required: true },
    rate: { type: Number, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const ExplorePlaceEvent = mongoose.model<IExploreEvent>('Explore-Place-Event', EventSchema);

export { ExplorePlaceEvent, IExploreEvent };
