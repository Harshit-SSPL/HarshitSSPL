import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import nationalProjectsRoutes from "./routes/nationalProjectsRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import productDesignsRoutes from "./routes/productDesignsRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

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

app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));
app.use(cookieParser());

// Health Checkpoint Handler
const healthCheckHandler = (req, res) => {
  const dbStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  const dbReadyState = mongoose.connection?.readyState ?? 0;
  const dbStatus = dbStates[dbReadyState] || "unknown";
  const memoryUsage = process.memoryUsage();

  res.status(200).json({
    status: "healthy",
    checkpoint: "OK",
    service: "SSIL CMS API Backend",
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: {
      status: dbStatus,
      readyState: dbReadyState,
      host: mongoose.connection?.host || null,
      name: mongoose.connection?.name || null,
    },
    memory: {
      heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
      rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
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
