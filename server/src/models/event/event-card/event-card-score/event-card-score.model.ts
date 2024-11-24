import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Score model
export interface IScore extends Document {
    score: number;
    player: string; // Reference to player (assuming a Player model exists)
    event: string;  // Reference to event (assuming an Event model exists)
    createdAt: Date;
}

// Define the schema for Score
const ScoreSchema: Schema = new Schema({
    score: { type: Number, required: true },
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming a Player model
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },   // Assuming an Event model
    createdAt: { type: Date, default: Date.now }
});

// Export the Score model
export const Score = mongoose.model<IScore>('Event-Card-Score', ScoreSchema);
