import express from "express";
import rateLimit from "express-rate-limit";
import { login, logout, getMe } from "../controllers/authController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// Rate limiter on login to prevent brute-force attacks
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // 15 attempts per window
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", loginLimiter, login);
router.post("/logout", logout);
router.get("/me", authenticateAdmin, getMe);

export default router;
