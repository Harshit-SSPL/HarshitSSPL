import GalleryProject from "../models/GalleryProject.js";
import { deleteFromCloudinary } from "../config/cloudinary.js";

// GET /api/gallery (Public - active projects)
export const getGalleryProjects = async (req, res) => {
  try {
    const projects = await GalleryProject.find({ active: true }).sort({ order: 1, createdAt: 1 });
    return res.status(200).json({
      success: true,
      projects: projects.length > 0 ? projects : [],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery projects.",
    });
  }
};

// GET /api/gallery/admin/all (Admin - includes inactive)
export const getAllGalleryProjectsAdmin = async (req, res) => {
  try {
    const projects = await GalleryProject.find().sort({ order: 1, createdAt: 1 });
    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery projects for admin.",
    });
  }
};

// POST /api/gallery (Admin protected)
export const createGalleryProject = async (req, res) => {
  try {
    const count = await GalleryProject.countDocuments();
    const formattedNumber = req.body.number || String(count + 1).padStart(2, "0");

    const project = await GalleryProject.create({
      ...req.body,
      number: formattedNumber,
      order: req.body.order ?? count,
    });

    return res.status(201).json({
      success: true,
      message: "Gallery project created successfully.",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create gallery project.",
    });
  }
};

// PUT /api/gallery/:id (Admin protected)
export const updateGalleryProject = async (req, res) => {
  try {
    const existing = await GalleryProject.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Gallery project not found.",
      });
    }

    if (req.body.image && existing.image !== req.body.image && existing.cloudinaryPublicId) {
      await deleteFromCloudinary(existing.cloudinaryPublicId);
    }

    const updated = await GalleryProject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Gallery project updated successfully.",
      project: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update gallery project.",
    });
  }
};

// DELETE /api/gallery/:id (Admin protected)
export const deleteGalleryProject = async (req, res) => {
  try {
    const existing = await GalleryProject.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Gallery project not found.",
      });
    }

    if (existing.cloudinaryPublicId) {
      await deleteFromCloudinary(existing.cloudinaryPublicId);
    }

    await GalleryProject.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Gallery project deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete gallery project.",
    });
  }
};
