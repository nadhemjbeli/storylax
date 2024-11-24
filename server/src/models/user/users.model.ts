// src/models/user/users.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IUserSchema } from "./users.schema";

export interface IUser extends Document, IUserSchema {
    interests: string[]; // Array of ObjectIds referencing UserInterest
    hasInterests: boolean; // Updated field
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    provider: { type: String, enum: ['google', 'facebook', 'email'], default: 'email' },
    role: { type: String, enum: ['admin', 'traveler', 'host'], default: 'traveler' },
    hostSpecificField: { type: String },
    phoneNumber: { type: String },
    bio: { type: String },
    createdAt: { type: Date, default: Date.now },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Number },
    image: { type: String },
    city: { type: String },
    address: { type: String },
    postalCode: { type: String },
    updatedAt: { type: Date, default: Date.now },
    hasInterests: { type: Boolean, default: false},
    interests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User-Interest' }], // Updated field
});

export const User = mongoose.model<IUser>('User', UserSchema);