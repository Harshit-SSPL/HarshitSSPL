import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ssil_cms";

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB] Warning: Database connection failed (${error.message}). Running with in-memory fallback where applicable.`);
  }
};

export default connectDB;
