import { Score, IScore } from './event-card-score.model';
import mongoose from "mongoose";

// Create a new score entry
export const createScore = async (scoreData: Partial<IScore>) => {
    const score = new Score(scoreData);
    return await score.save();
};

// Get all scores
export const getAllScores = async () => {
    return await Score.find().populate('player').populate('event').sort({ createdAt: -1 });
};

// Get scores by Player ID
export const getScoresByPlayer = async (playerId: string) => {
    return await Score.find({ player: playerId }).populate('player').populate('event');
};

// Get scores by Event ID
// export const getScoresByEvent = async (eventId: string) => {
//     return await Score.find({ event: eventId }).populate('player').populate('event');
// };

// Update a score by ID
export const updateScoreById = async (id: string, updateData: Partial<IScore>) => {
    return await Score.findByIdAndUpdate(id, { ...updateData, updatedAt: Date.now() }, { new: true });
};

// Delete a score by ID
export const deleteScoreById = async (id: string) => {
    return await Score.findByIdAndDelete(id);
};

export const getScoresByEvent = async (eventId: string) => {
    return Score.aggregate([
        {
            $match: { event: new mongoose.Types.ObjectId(eventId) } // Ensure eventId is matched as ObjectId
        },
        {
            $group: {
                _id: '$player', // Group by player
                maxScore: {$max: '$score'}, // Get the maximum score for each player
                scoreId: {$first: '$_id'}, // Optionally, get the score ID (if needed)
                event: {$first: '$event'}, // Include the event (or any other fields needed)
                createdAt: {$first: '$createdAt'} // Keep the createdAt field for the max score
            }
        },
        {
            $lookup: {
                from: 'users', // Collection name for the user model
                localField: '_id', // Field to join on (_id is the player in the group)
                foreignField: '_id', // Field from the User model
                as: 'player' // The resulting field to store the player info
            }
        },
        {
            $unwind: '$player' // Unwind the player array to turn it into a single object
        },
        {
            $project: {
                _id: 0, // Do not show the default _id field
                scoreId: 1,
                maxScore: 1,
                event: 1,
                createdAt: 1,
                player: {firstName: 1, lastName: 1, email: 1} // Choose the fields you want from the player
            }
        }
    ]);
};
