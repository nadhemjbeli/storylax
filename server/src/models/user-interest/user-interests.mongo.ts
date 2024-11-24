// src/models/user-interest/user-interests.mongo.ts

import {IUserInterest, UserInterest} from './user-interests.model';
import {User} from "../user/users.model";

// Create a new tag
export const createUserInterest = async (tagData: Partial<IUserInterest>) => {
    const tag = new UserInterest(tagData);
    return await tag.save();
};

// Get all tags
export const getAllUserInterests = async () => {
    return await UserInterest.find().sort({updatedAt: -1});
};

// Get a tag by ID
export const getUserInterestById = async (id: string) => {
    return await UserInterest.findById(id);
};

// Update a tag by ID
export const updateUserInterestById = async (id: string, updateData: Partial<IUserInterest>) => {
    return await UserInterest.findByIdAndUpdate(id, {...updateData, updatedAt:Date.now()}, { new: true });
};

// Delete a tag by ID
export const deleteUserInterestById = async (id: string) => {
    return await UserInterest.findByIdAndDelete(id);
};

// Add multiple interests to user
export const addUserInterests = async (userId: string, interestIds: string[]) => {
    console.log(interestIds)
    let user = await User.findById(userId);
    const interests = await UserInterest.find({ _id: { $in: interestIds } });

    if (user && interests.length > 0) {
        // Add each interest if not already present in the user
        interestIds.forEach(interestId => {
            if (!user.interests.includes(interestId)) {
                user.interests.push(interestId);
            }
            else {
                user.interests = user.interests.filter(id => id.toString() !== interestId)
            }
        });

        user.hasInterests = true

        await user.save();

        // Add user to each interest's users list
        await Promise.all(interests.map(async interest => {
            if (!interest.users.includes(userId)) {
                interest.users.push(userId);
            }
            else {
                interest.users = interest.users.filter(id => id.toString()!== userId)
            }
            await interest.save();
        }));
        return { user, interests };
    }

    throw new Error('User or Interests not found');
};

// Get interests by User ID
export const getUserInterestsByUserId = async (userId: string) => {
    const user = await User.findById(userId).populate('interests');
    if (user) {
        return user.interests;
    }
    throw new Error('User not found');
}



