import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import nationalProjectsRoutes from "./routes/nationalProjectsRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import productDesignsRoutes from "./routes/productDesignsRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import enquiriesRoutes from "./routes/enquiriesRoutes.js";

dotenv.config();

const app = express();

// Reflect any Origin (open CORS; works with credentials)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(cookieParser());

// Ensure database connection is established
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    // fallback gracefully
  }
  next();
});

// Health Checkpoint Handler (Cloud Run / load balancer probes)
const healthCheckHandler = (req, res) => {
  const conn = mongoose.connection;
  const dbStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  const dbReadyState = conn?.readyState ?? 0;
  const dbStatus = dbStates[dbReadyState] || "unknown";
  const memoryUsage =
    typeof process !== "undefined" && typeof process.memoryUsage === "function"
      ? process.memoryUsage()
      : { heapUsed: 0, heapTotal: 0, rss: 0 };
  const uptimeSeconds =
    typeof process !== "undefined" && typeof process.uptime === "function"
      ? Math.floor(process.uptime())
      : 0;

  res.status(200).json({
    status: "healthy",
    checkpoint: "OK",
    service: "SSIL CMS API Backend",
    uptime: `${uptimeSeconds}s`,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: {
      status: dbStatus,
      readyState: dbReadyState,
      host: conn?.host || null,
      name: conn?.name || null,
    },
    memory: {
      heapUsed: `${((memoryUsage.heapUsed || 0) / 1024 / 1024).toFixed(2)} MB`,
      heapTotal: `${((memoryUsage.heapTotal || 0) / 1024 / 1024).toFixed(2)} MB`,
      rss: `${((memoryUsage.rss || 0) / 1024 / 1024).toFixed(2)} MB`,
    },
  });
};

app.get("/healthcheckpoint", healthCheckHandler);
app.get("/api/healthcheckpoint", healthCheckHandler);
app.get("/health", healthCheckHandler);
app.get("/api/health", healthCheckHandler);

app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/national-projects", nationalProjectsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/products", productDesignsRoutes);
app.use("/api/product-designs", productDesignsRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/enquiries", enquiriesRoutes);

app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found.`,
  });
});

app.use((err, req, res, next) => {
  console.error("[Global Error]:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

export default app;
