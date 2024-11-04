// import mongoose from "mongoose";

import mongoose from "mongoose";

// let isConnected = false;

// function connectDb() {
//   if (isConnected) {
//     console.log("Using existing database connection");
//     return;
//   }

//   if (!process.env.MONGO_URI) {
//     console.error("MONGO_URI is not defined");
//     throw new Error("Database URI is missing");
//   }

//   try {
//     console.log("Attempting to connect to MongoDB...");
//      mongoose.connect(process.env.MONGO_URI, {
//       serverSelectionTimeoutMS: 5000,
//     });
//     isConnected = true;
//     console.log("Connected to database");
//   } catch (error) {
//     console.error("Database connection error:", error);
//     throw new Error("Could not connect to the database");
//   }
// }
// export default connectDb;
// lib/connectDb.ts

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached:any = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDb;

