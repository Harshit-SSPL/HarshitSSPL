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

// Middlewares
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl/Postman) or allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive for local pair-programming dev
      }
    },
    credentials: true,
  })
);

// Drain / skip body parsing on non-body methods BEFORE express.json().
// On Cloudflare Workers, GET with Content-Type: application/json (no body)
// can throw Worker error 1101 when body-parser tries to read the stream.
app.use((req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    req.resume();
    return next();
  }
  return next();
});

const skipBodyMethods = (req) => ["GET", "HEAD", "OPTIONS"].includes(req.method);
app.use((req, res, next) => {
  if (skipBodyMethods(req)) return next();
  return express.json({ limit: "15mb" })(req, res, next);
});
app.use((req, res, next) => {
  if (skipBodyMethods(req)) return next();
  return express.urlencoded({ extended: true, limit: "15mb" })(req, res, next);
});
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

// Health Checkpoint Handler
const healthCheckHandler = (req, res) => {
  const conn = mongoose.default?.connection || mongoose.connection;
  const dbStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  const dbReadyState = conn?.readyState ?? 0;
  const dbStatus = dbStates[dbReadyState] || "unknown";
  const memoryUsage = (typeof process !== "undefined" && typeof process.memoryUsage === "function")
    ? process.memoryUsage()
    : { heapUsed: 0, heapTotal: 0, rss: 0 };
  const uptimeSeconds = (typeof process !== "undefined" && typeof process.uptime === "function")
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

// Health Check & Checkpoint Routes
app.get("/healthcheckpoint", healthCheckHandler);
app.get("/api/healthcheckpoint", healthCheckHandler);
app.get("/health", healthCheckHandler);
app.get("/api/health", healthCheckHandler);

// API Routes
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

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found.`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("[Global Error]:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

export default app;
