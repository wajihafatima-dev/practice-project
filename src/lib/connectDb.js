import mongoose from "mongoose";

let isConnected = false; // Track the connection status

async function connectDb() {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw new Error("Could not connect to database");
  }
}

export default connectDb;
