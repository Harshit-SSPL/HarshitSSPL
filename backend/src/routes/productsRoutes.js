import express from "express";
import {
  getProducts,
  getAllProductsAdmin,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  reorderProducts,
} from "../controllers/productsController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public endpoints
router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

// Admin endpoints
router.get("/admin/all", authenticateAdmin, getAllProductsAdmin);
router.post("/", authenticateAdmin, createProduct);
router.put("/reorder", authenticateAdmin, reorderProducts);
router.put("/:id", authenticateAdmin, updateProduct);
router.delete("/:id", authenticateAdmin, deleteProduct);

export default router;
