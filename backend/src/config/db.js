import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const getMongooseInstance = () => {
  if (typeof mongoose?.connect === "function") return mongoose;
  if (typeof mongoose?.default?.connect === "function") return mongoose.default;
  if (typeof mongoose?.default?.default?.connect === "function") return mongoose.default.default;
  return mongoose?.default || mongoose;
};

let connectionPromise = null;

export const connectDB = async () => {
  const m = getMongooseInstance();
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ssil_cms";
  const connection = m.connection;

  // Already connected — reuse (safe for concurrent homepage fetches on Workers)
  if (connection?.readyState === 1) {
    return connection;
  }

  // Connect in-flight — wait for the same promise instead of disconnect/reconnect races
  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    try {
      m.set("bufferCommands", false);
      m.set("bufferTimeoutMS", 3000);
      m.set("autoIndex", false);
      m.set("autoCreate", false);

      const conn = await m.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 5000,
        maxPoolSize: 1,
        minPoolSize: 0,
        maxIdleTimeMS: 30000,
        family: 4,
      });

      console.log(`[MongoDB] Connected successfully to host: ${conn?.connection?.host || "Atlas"}`);
      return conn;
    } catch (error) {
      connectionPromise = null;
      console.warn(`[MongoDB] Warning: Database connection failed (${error.message}).`);
      return null;
    }
  })();

  return connectionPromise;
};

export default connectDB;
