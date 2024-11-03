import mongoose from "mongoose";

let isConnected = false;

async function connectDb() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5-second timeout for server selection
    });
    isConnected = true;
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Could not connect to the database");
  }
}

export default connectDb;
