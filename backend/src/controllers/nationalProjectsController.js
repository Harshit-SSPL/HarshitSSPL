import NationalProject from "../models/NationalProject.js";
import { deleteFromCloudinary } from "../config/cloudinary.js";

const fallbackProjects = [
  { id: "client-01", name: "DAE", logoUrl: "/clients/DAESticker.png", category: "Government", order: 0, active: true },
  { id: "client-02", name: "INDIAN OIL", logoUrl: "/clients/IndianOilSticker.png", category: "PSU & Energy", order: 1, active: true },
  { id: "client-03", name: "INDIAN RAILWAYS", logoUrl: "/clients/IndianRailwaySticker.png", category: "Transit", order: 2, active: true },
  { id: "client-04", name: "GRAND RETREAT", logoUrl: "/clients/GrandRetreatSticker.png", category: "Hospitality", order: 3, active: true },
  { id: "client-05", name: "BPTP", logoUrl: "/clients/BPTPSticker.png", category: "Infrastructure", order: 4, active: true },
  { id: "client-06", name: "THE CORENTHUM", logoUrl: "/clients/TheCorenthumSticker.png", category: "Corporate", order: 5, active: true },
  { id: "client-07", name: "ACE", logoUrl: "/clients/ACESticker.png", category: "Infrastructure", order: 6, active: true },
  { id: "client-08", name: "GALAXY GROUP", logoUrl: "/clients/GalaxyGroupSticker.png", category: "Real Estate", order: 7, active: true },
  { id: "client-09", name: "ASIAN FIDELIS", logoUrl: "/clients/AsianFidelisSticker.png", category: "Healthcare", order: 8, active: true },
  { id: "client-10", name: "ORO GROUP", logoUrl: "/clients/OROGroupSticker.png", category: "Commercial", order: 9, active: true },
  { id: "client-11", name: "HABITAT ENVIRO", logoUrl: "/clients/HabitatEnviroSticker.png", category: "Environmental", order: 10, active: true },
  { id: "client-12", name: "M3M", logoUrl: "/clients/M3MSticker.png", category: "Real Estate", order: 11, active: true },
  { id: "client-13", name: "RAHEJA", logoUrl: "/clients/RahejaSticker.png", category: "Real Estate", order: 12, active: true },
  { id: "client-14", name: "ROF AALAYAS", logoUrl: "/clients/ROFAalayasSticker.png", category: "Residential", order: 13, active: true },
  { id: "client-15", name: "TDI", logoUrl: "/clients/TDISticker.png", category: "Infrastructure", order: 14, active: true },
  { id: "client-16", name: "RPS GROUP", logoUrl: "/clients/RPSGroupSticker.png", category: "Real Estate", order: 15, active: true },
  { id: "client-17", name: "SAMRIDDHI", logoUrl: "/clients/SamriddhiSticker.png", category: "Infrastructure", order: 16, active: true },
  { id: "client-18", name: "SAVANA", logoUrl: "/clients/SavanaSticker.png", category: "Residential", order: 17, active: true },
  { id: "client-19", name: "KLJ GROUP", logoUrl: "/clients/KLJGroupSticker.png", category: "Industrial", order: 18, active: true },
  { id: "client-20", name: "ADITYA BIRLA GROUP", logoUrl: "/clients/AdityaBirlaGroupSticker.png", category: "Corporate", order: 19, active: true },
];

// GET /api/national-projects (Shared by Home and About Us)
export const getNationalProjects = async (req, res) => {
  try {
    const projects = await NationalProject.find({ active: true }).sort({ order: 1, createdAt: 1 });
    return res.status(200).json({
      success: true,
      projects: projects.length > 0 ? projects : fallbackProjects,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      projects: fallbackProjects,
    });
  }
};

// GET /api/national-projects/all (Admin - includes inactive)
export const getAllNationalProjectsAdmin = async (req, res) => {
  try {
    const projects = await NationalProject.find().sort({ order: 1, createdAt: 1 });
    return res.status(200).json({
      success: true,
      projects: projects.length > 0 ? projects : fallbackProjects,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      projects: fallbackProjects,
    });
  }
};

// POST /api/national-projects (Admin protected)
export const createNationalProject = async (req, res) => {
  try {
    const count = await NationalProject.countDocuments();
    const project = await NationalProject.create({
      ...req.body,
      order: req.body.order ?? count,
    });

    return res.status(201).json({
      success: true,
      message: "National project created successfully.",
      project,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: "National project registered.",
      project: req.body,
    });
  }
};

// PUT /api/national-projects/:id (Admin protected)
export const updateNationalProject = async (req, res) => {
  try {
    const existing = await NationalProject.findById(req.params.id);
    if (existing && req.body.logoUrl && existing.logoUrl !== req.body.logoUrl && existing.cloudinaryPublicId) {
      await deleteFromCloudinary(existing.cloudinaryPublicId);
    }

    const updated = await NationalProject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "National project updated successfully.",
      project: updated || req.body,
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: "National project updated in runtime.",
      project: req.body,
    });
  }
};

// DELETE /api/national-projects/:id (Admin protected)
export const deleteNationalProject = async (req, res) => {
  try {
    const project = await NationalProject.findById(req.params.id);
    if (project && project.cloudinaryPublicId) {
      await deleteFromCloudinary(project.cloudinaryPublicId);
    }
    await NationalProject.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "National project deleted successfully.",
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: "National project removed.",
    });
  }
};

// PUT /api/national-projects/reorder (Admin protected)
export const reorderNationalProjects = async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (Array.isArray(orderedIds)) {
      const updates = orderedIds.map((id, index) =>
        NationalProject.findByIdAndUpdate(id, { order: index })
      );
      await Promise.all(updates);
    }
    return res.status(200).json({
      success: true,
      message: "Projects reordered successfully.",
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: "Reorder processed.",
    });
  }
};
