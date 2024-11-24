// src/models/user/users.mongo.ts
import { User, IUser } from './users.model';
import {IUserSchema} from "./users.schema";

// Create a new user
export const createUser = async (userData: IUserSchema) => {
    const user = new User(userData);
    return await user.save();
};

// Find a user by email
export const findUserByEmail = async (email: string) => {
    return await User.findOne({ email });
};

// Find a user by email and provider
export const findUserByEmailAndProvider = async (email: string, provider:string) => {
    return await User.findOne({ email, provider });
};

// Find a user by email
export const findUserByEmailAndRole = async (email: string, role:string) => {
    return await User.findOne({ email, role });
};

// Get all users
export const getAllUsers = async () => {
    return await User.find();
};

// Find user by ID
export const findUserById = async (id: string) => {
    return await User.findById(id);
};

// Find user by ID and provider
export const findUserByIdAndProvider = async (id: string, provider:string) => {
    return await User.findOne({_id:id, provider});
};

// Update user by ID
export const updateUserById = async (id: string, updateData: Partial<IUser>) => {
    console.log(updateData)
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

// Update user by ID
export const updateUserByIdHasInterests = async (id: string) => {
    return await User.findByIdAndUpdate(id, {hasInterests:true}, { new: true });
};

// Delete user by ID
export const deleteUserById = async (id: string) => {
    return await User.findByIdAndDelete(id);
};

export const checkResetPassword = async(token: string) =>{
    return User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {$gt: Date.now()},
    });
}
