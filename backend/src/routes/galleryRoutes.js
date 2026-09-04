import express from "express";
import {
  getGalleryProjects,
  getAllGalleryProjectsAdmin,
  createGalleryProject,
  updateGalleryProject,
  deleteGalleryProject,
} from "../controllers/galleryController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public route
router.get("/", getGalleryProjects);

// Admin protected routes
router.get("/admin/all", authenticateAdmin, getAllGalleryProjectsAdmin);
router.post("/", authenticateAdmin, createGalleryProject);
router.put("/:id", authenticateAdmin, updateGalleryProject);
router.delete("/:id", authenticateAdmin, deleteGalleryProject);

export default router;
