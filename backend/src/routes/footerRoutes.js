import express from "express";
import { getFooterSettings, updateFooterSettings } from "../controllers/footerController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getFooterSettings);
router.put("/", authenticateAdmin, updateFooterSettings);

export default router;
