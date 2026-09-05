import express from "express";
import {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../controllers/enquiriesController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public submission
router.post("/", createEnquiry);

// Admin endpoints (authenticated or admin view)
router.get("/admin/all", getAllEnquiries);
router.patch("/admin/:id/status", updateEnquiryStatus);
router.put("/admin/:id/status", updateEnquiryStatus);
router.delete("/admin/:id", deleteEnquiry);

export default router;
