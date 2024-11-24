// src/models/itinerary/itineraries.model.ts

import mongoose, { Schema, Document } from 'mongoose';

interface IItinerary extends Document {
    explorePlace:any;
    title: string;
    exactPlace: string;
    description: string;
    image: string;
    createdAt: Date;
}

const ItinerarySchema: Schema = new Schema({
    explorePlace: { type: mongoose.Schema.Types.ObjectId, ref: 'Explore-Place', required: true },
    title: { type: String, required: true },
    exactPlace: { type: String, required: true },
    description: { type: String, required: true },
    promoted: { type: Boolean, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const ExploreItinerary = mongoose.model<IItinerary>('Itinerary', ItinerarySchema);

export { ExploreItinerary, IItinerary };
