import express from "express";
import { login, logout, getMe } from "../controllers/authController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// Edge-compatible rate limiter on login to prevent brute-force attacks
const loginAttempts = new Map();
const loginLimiter = (req, res, next) => {
  const clientIp =
    req.headers["cf-connecting-ip"] ||
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.ip ||
    "client";
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 15;

  const record = loginAttempts.get(clientIp);
  if (!record || now - record.startTime > windowMs) {
    loginAttempts.set(clientIp, { count: 1, startTime: now });
    return next();
  }

  if (record.count < maxAttempts) {
    record.count += 1;
    return next();
  }

  return res.status(429).json({
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  });
};

router.post("/login", loginLimiter, login);
router.post("/logout", logout);
router.get("/me", authenticateAdmin, getMe);

export default router;
