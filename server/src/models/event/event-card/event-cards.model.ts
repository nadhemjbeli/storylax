// src/models/event/event-card/event-cards.model.ts

import mongoose, { Schema, Document } from 'mongoose';

interface ICard extends Document {
    event: mongoose.Schema.Types.ObjectId;
    name: string;
    image: string;
}

const CardSchema: Schema = new Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
});

export const Card = mongoose.model<ICard>('Event-Card', CardSchema);