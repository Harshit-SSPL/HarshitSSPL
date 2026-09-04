import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { seedDatabase } from "./seed.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Start Express server immediately
const server = app.listen(PORT, async () => {
  console.log(`=============================================`);
  console.log(`  SSIL CMS API Backend Server is running!   `);
  console.log(`  Port: http://localhost:${PORT}             `);
  console.log(`  Health Checkpoint: http://localhost:${PORT}/healthcheckpoint`);
  console.log(`  API Health: http://localhost:${PORT}/api/health`);
  console.log(`=============================================`);

  // Connect to DB and seed in background
  try {
    await connectDB();
    await seedDatabase();
  } catch (err) {
    console.warn("[Server Init Warning]:", err.message);
  }
});

export default server;
