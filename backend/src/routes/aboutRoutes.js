import express from "express";
import { getAboutContent, updateAboutContent } from "../controllers/aboutController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAboutContent);
router.put("/", authenticateAdmin, updateAboutContent);

export default router;
