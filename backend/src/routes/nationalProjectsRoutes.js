import express from "express";
import {
  getNationalProjects,
  getAllNationalProjectsAdmin,
  createNationalProject,
  updateNationalProject,
  deleteNationalProject,
  reorderNationalProjects,
} from "../controllers/nationalProjectsController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public: shared by Home and About Us
router.get("/", getNationalProjects);

// Admin endpoints
router.get("/admin/all", authenticateAdmin, getAllNationalProjectsAdmin);
router.post("/", authenticateAdmin, createNationalProject);
router.put("/reorder", authenticateAdmin, reorderNationalProjects);
router.put("/:id", authenticateAdmin, updateNationalProject);
router.delete("/:id", authenticateAdmin, deleteNationalProject);

export default router;
