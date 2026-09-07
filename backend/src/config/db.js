import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const getMongooseInstance = () => {
  if (typeof mongoose?.connect === "function") return mongoose;
  if (typeof mongoose?.default?.connect === "function") return mongoose.default;
  if (typeof mongoose?.default?.default?.connect === "function") return mongoose.default.default;
  return mongoose?.default || mongoose;
};

const isWorker =
  typeof WebSocketPair !== "undefined" ||
  (typeof navigator !== "undefined" && navigator.userAgent?.includes("Cloudflare-Workers"));

let connectionPromise = null;

export const connectDB = async () => {
  const m = getMongooseInstance();
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ssil_cms";

  // 1. Cloudflare Workers: Reconnect cleanly per request context to prevent cross-request socket freeze
  if (isWorker) {
    try {
      if (m.connection && m.connection.readyState !== 0) {
        await m.disconnect();
      }
    } catch (_) {}

    m.set("bufferCommands", false);
    m.set("bufferTimeoutMS", 3000);
    m.set("autoIndex", false);
    m.set("autoCreate", false);

    try {
      const conn = await m.connect(mongoUri, {
        serverSelectionTimeoutMS: 3500,
        connectTimeoutMS: 3500,
        maxPoolSize: 1,
        minPoolSize: 0,
        family: 4,
      });
      return conn;
    } catch (error) {
      console.warn(`[MongoDB Worker] Connection failed (${error.message}).`);
      return null;
    }
  }

  // 2. Node.js (Render / local dev server): Persistent connection pool singleton
  const connection = m.connection;
  if (connection?.readyState === 1) {
    return connection;
  }
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
        maxPoolSize: 10,
        minPoolSize: 1,
        maxIdleTimeMS: 30000,
        heartbeatFrequencyMS: 10000,
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

