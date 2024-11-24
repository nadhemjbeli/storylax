// src/models/event/events.model.ts

import mongoose, { Schema, Document } from 'mongoose';


interface IEvent extends Document {
    // explorePlace: string;
    title: string;
    description: string;
    resume: string;
    author:any;
    principalImage: any;
    city?: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    // promoted: boolean;
    // image:string
}

const EventSchema: Schema = new Schema({
    // explorePlace: { type: mongoose.Schema.Types.ObjectId, ref: 'Explore-Place', required: true },
    title: { type: String, required: true },
    resume: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { type: String, required: true },
    city: { type: Schema.Types.ObjectId, ref: 'City' },
    principalImage: {
        default: { type: String },
        small: { type: String },
        medium: { type: String },
        large: { type: String }
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    // promoted: { type: Boolean, required: true },
    // image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const ExploreEvent = mongoose.model<IEvent>('Event', EventSchema);

export { ExploreEvent, IEvent };
