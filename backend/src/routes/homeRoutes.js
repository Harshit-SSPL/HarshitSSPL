import express from "express";
import {
  getHomeStats,
  updateHomeStats,
  getFeaturedProducts,
  createFeaturedProduct,
  updateFeaturedProduct,
  deleteFeaturedProduct,
} from "../controllers/homeController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// Home statistics
router.get("/stats", getHomeStats);
router.put("/stats", authenticateAdmin, updateHomeStats);

// Featured Products
router.get("/featured", getFeaturedProducts);
router.get("/featured/admin/all", authenticateAdmin, getFeaturedProducts);
router.post("/featured", authenticateAdmin, createFeaturedProduct);
router.put("/featured/:id", authenticateAdmin, updateFeaturedProduct);
router.delete("/featured/:id", authenticateAdmin, deleteFeaturedProduct);

export default router;
