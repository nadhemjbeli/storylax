// src/models/user-interest/user-interests.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUserInterest extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
    users: string[]; // Array of ObjectIds referencing User
}

const UserInterestSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Updated field
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const UserInterest = mongoose.model<IUserInterest>('User-Interest', UserInterestSchema);