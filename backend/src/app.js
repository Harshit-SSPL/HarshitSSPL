import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

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

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "SSIL CMS API Backend",
    timestamp: new Date().toISOString(),
  });
});

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
