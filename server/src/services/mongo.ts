import mongoose from "mongoose";

const connectToDatabase = () => {
    try {
        const url = process.env.URL;
        if (!url) {
            throw new Error("Database URL is not defined in environment variables.");
        }
        mongoose.connect(url);
        console.log("Connected to database successfully");
    } catch (error) {
        console.log(error);
        console.log("Could not connect to the database");
    }
};

export default connectToDatabase;
