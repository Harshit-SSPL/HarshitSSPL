import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let connectionPromise = null;

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ssil_cms";

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    try {
      mongoose.set("bufferCommands", false);
      mongoose.set("autoIndex", false);
      mongoose.set("autoCreate", false);

      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        maxPoolSize: 10,
        minPoolSize: 1,
        maxIdleTimeMS: 30000,
      });

      console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
      return conn.connection;
    } catch (error) {
      connectionPromise = null;
      console.warn(`[MongoDB] Warning: Database connection failed (${error.message}).`);
      return null;
    }
  })();

  return connectionPromise;
};

export default connectDB;
