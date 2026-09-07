import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { seedDatabase } from "./seed.js";

dotenv.config();

// Cloud Run / GCP inject PORT (default 8080). Local default 5000.
const PORT = Number(process.env.PORT) || 5000;
// Bind 0.0.0.0 so containers / Cloud Run can reach the process
const HOST = process.env.HOST || "0.0.0.0";

const server = app.listen(PORT, HOST, async () => {
  console.log(`=============================================`);
  console.log(`  SSIL CMS API Backend Server is running!`);
  console.log(`  Host: ${HOST}`);
  console.log(`  Port: ${PORT}`);
  console.log(`  Health: http://${HOST}:${PORT}/health`);
  console.log(`  API Health: http://${HOST}:${PORT}/api/health`);
  console.log(`=============================================`);

  try {
    await connectDB();
    await seedDatabase();
  } catch (err) {
    console.warn("[Server Init Warning]:", err.message);
  }
});

// Graceful shutdown for Cloud Run / container stop signals
const shutdown = (signal) => {
  console.log(`[Server] ${signal} received, shutting down...`);
  server.close(() => {
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

export default server;
