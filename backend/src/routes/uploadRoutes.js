import express from "express";
import upload from "../middleware/upload.js";
import { uploadSingleImage } from "../controllers/uploadController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// Admin protected upload endpoint
router.post("/single", authenticateAdmin, upload.single("image"), uploadSingleImage);

export default router;
