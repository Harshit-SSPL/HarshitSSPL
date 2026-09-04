import express from "express";
import {
  getProductDesigns,
  getAllProductDesignsAdmin,
  createProductDesign,
  updateProductDesign,
  deleteProductDesign,
} from "../controllers/productDesignsController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

// Public designs for a product category
router.get("/:productId/designs", getProductDesigns);

// Admin endpoints
router.get("/:productId/designs/admin", authenticateAdmin, getAllProductDesignsAdmin);
router.post("/:productId/designs", authenticateAdmin, createProductDesign);
router.put("/:productId/designs/:id", authenticateAdmin, updateProductDesign);
router.delete("/:productId/designs/:id", authenticateAdmin, deleteProductDesign);
router.put("/designs/:id", authenticateAdmin, updateProductDesign);
router.delete("/designs/:id", authenticateAdmin, deleteProductDesign);
router.put("/:id", authenticateAdmin, updateProductDesign);
router.delete("/:id", authenticateAdmin, deleteProductDesign);

export default router;
