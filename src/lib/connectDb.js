// import mongoose from "mongoose";

// import mongoose from "mongoose";

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

import mongoose from 'mongoose';

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('Using existing database connection');
    return mongoose.connection.asPromise();
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
    return db;
  } catch (error) {
    console.error('Database connection error:', error.message);
    throw new Error('Database connection failed');
  }
};

export default connectDb;



