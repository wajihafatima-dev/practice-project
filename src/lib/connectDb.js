// /lib/connectDb.js
import mongoose from "mongoose";
let isConnected;
async function connectDb() {
    if (isConnected) {
        console.log("Database is already connected.");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI || "", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = mongoose.connection.readyState;
        console.log("Database is connected");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw new Error("Database connection failed");
    }
}
export default connectDb;
