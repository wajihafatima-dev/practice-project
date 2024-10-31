// /lib/connectDb.js
import mongoose from "mongoose";

const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log("Database is already connected.");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI || ""); // Ensure you have your Mongo URI in .env
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw new Error("Database connection error");
    }
};

export default connectDb;
