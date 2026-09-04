"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Edit2,
  Trash2,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Building2,
  X,
  Eye,
  MapPin,
  CheckCircle,
  Layers,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchApi, uploadImageFile } from "@/lib/admin-api";
import { galleryProjects as defaultGallery, GalleryProject } from "@/data/gallery-projects";

interface GalleryProjectAdminItem {
  _id?: string;
  id?: string;
  number: string;
  title: string;
  subtitle?: string;
  location: string;
  categoryTag: string;
  provided: string;
  description?: string;
  image: string;
  cloudinaryPublicId?: string;
  stats?: { label: string; value: string }[];
  order?: number;
  active?: boolean;
}

export default function AdminGalleryProjectsPage() {
  const [projects, setProjects] = useState<GalleryProjectAdminItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<GalleryProjectAdminItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formState, setFormState] = useState<{
    number: string;
    title: string;
    subtitle: string;
    location: string;
    categoryTag: string;
    provided: string;
    description: string;
    image: string;
    stats: { label: string; value: string }[];
    order: number;
    active: boolean;
  }>({
    number: "01",
    title: "",
    subtitle: "",
    location: "India",
    categoryTag: "INFRASTRUCTURE",
    provided: "",
    description: "",
    image: "",
    stats: [
      { label: "Mast Height", value: "" },
      { label: "Protection", value: "IP66 / IK10" },
      { label: "Lifespan", value: "25+ Years" },
    ],
    order: 0,
    active: true,
  });

  const loadProjects = async () => {
    try {
      const res = await fetchApi("/gallery/admin/all");
      if (res.success && Array.isArray(res.projects) && res.projects.length > 0) {
        setProjects(res.projects);
      } else {
        setProjects(
          defaultGallery.map((g, idx) => ({
            ...g,
            _id: g.id,
            order: idx,
            active: true,
          }))
        );
      }
    } catch (e) {
      setProjects(
        defaultGallery.map((g, idx) => ({
          ...g,
          _id: g.id,
          order: idx,
          active: true,
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddModal = () => {
    setSelectedProject(null);
    const nextNum = String(projects.length + 1).padStart(2, "0");
    setFormState({
      number: nextNum,
      title: "",
      subtitle: "",
      location: "India",
      categoryTag: "INFRASTRUCTURE",
      provided: "",
      description: "",
      image: "",
      stats: [
        { label: "Deployment Span", value: "" },
        { label: "Protection", value: "IP66 / IK10" },
        { label: "Finish", value: "Hot-Dip Galvanized" },
      ],
      order: projects.length,
      active: true,
    });
    setErrorMsg(null);
    setModalOpen(true);
  };

  const openEditModal = (project: GalleryProjectAdminItem, idx: number) => {
    setSelectedProject(project);
    setFormState({
      number: project.number || String(idx + 1).padStart(2, "0"),
      title: project.title,
      subtitle: project.subtitle || "",
      location: project.location || "India",
      categoryTag: project.categoryTag || "INFRASTRUCTURE",
      provided: project.provided || "",
      description: project.description || "",
      image: project.image || "",
      stats: project.stats && project.stats.length > 0 ? project.stats : [
        { label: "Deployment Span", value: "" },
        { label: "Protection", value: "IP66 / IK10" },
        { label: "Finish", value: "Hot-Dip Galvanized" },
      ],
      order: project.order ?? idx,
      active: project.active ?? true,
    });
    setErrorMsg(null);
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMsg(null);

    try {
      const uploaded = await uploadImageFile(file, "ssil_gallery_projects");
      setFormState((prev) => ({ ...prev, image: uploaded.url }));
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload image to Cloudinary.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleStatChange = (index: number, field: "label" | "value", value: string) => {
    const updated = [...formState.stats];
    updated[index][field] = value;
    setFormState({ ...formState, stats: updated });
  };

  const addStatRow = () => {
    setFormState({
      ...formState,
      stats: [...formState.stats, { label: "Specification", value: "" }],
    });
  };

  const removeStatRow = (index: number) => {
    const updated = formState.stats.filter((_, i) => i !== index);
    setFormState({ ...formState, stats: updated });
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.image) {
      setErrorMsg("Please upload or provide a project showcase image.");
      return;
    }
    if (!formState.provided) {
      setErrorMsg("Please provide the 'What SSIL Provided' summary description.");
      return;
    }

    setActionLoading(true);
    setErrorMsg(null);

    try {
      if (selectedProject?._id && selectedProject._id.length > 10) {
        const res = await fetchApi(`/gallery/${selectedProject._id}`, {
          method: "PUT",
          body: JSON.stringify(formState),
        });
        if (res.success) {
          setSuccessMsg(`Project "${formState.title}" updated successfully in the Gallery!`);
        }
      } else {
        const res = await fetchApi("/gallery", {
          method: "POST",
          body: JSON.stringify(formState),
        });
        if (res.success) {
          setSuccessMsg(`Project "${formState.title}" added successfully to the Gallery!`);
        }
      }

      setModalOpen(false);
      await loadProjects();
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save project.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProject?._id) return;
    setActionLoading(true);

    try {
      const res = await fetchApi(`/gallery/${selectedProject._id}`, {
        method: "DELETE",
      });

      if (res.success) {
        setSuccessMsg("Gallery project deleted successfully.");
        setDeleteModalOpen(false);
        await loadProjects();
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete project");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-ssil-red animate-spin mb-3" />
        <span className="text-xs font-bold text-slate-500 uppercase">Loading Gallery Projects CMS...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-ssil-red block mb-1">
            PROJECTS &amp; GALLERY CMS
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Real-World Project Showcase
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage all executed case studies, monumental flag masts, highway corridors, and civic installations shown on <strong>/projects</strong>.
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Gallery Project
        </Button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Projects Showcase Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => {
          const displayNum = project.number || String(idx + 1).padStart(2, "0");

          return (
            <div
              key={project._id || project.id || idx}
              className="group rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xs hover:border-ssil-red/50 hover:shadow-md transition-all flex flex-col"
            >
              {/* Image Preview with Number Overlay */}
              <div className="relative w-full aspect-[16/10] bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Building2 className="h-8 w-8" />
                  </div>
                )}

                {/* Big Number Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-xl font-black text-white bg-ssil-red px-3 py-1 rounded-xl shadow-md">
                    {displayNum}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-slate-950/70 text-white backdrop-blur-md border border-white/20">
                    {project.categoryTag || "INFRASTRUCTURE"}
                  </span>
                </div>

                {/* Location Overlay */}
                <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center gap-1.5 text-xs text-white font-semibold drop-shadow-md">
                  <MapPin className="h-3.5 w-3.5 text-ssil-red shrink-0" />
                  <span className="truncate">{project.location || "India"}</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-tight line-clamp-2">
                    {project.title}
                  </h3>

                  {/* What SSIL Provided Box */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-100 dark:border-zinc-800 text-[11px] text-slate-600 dark:text-slate-300 font-medium line-clamp-3">
                    <span className="font-extrabold text-ssil-red uppercase block text-[10px] mb-0.5">
                      WHAT SSIL PROVIDED:
                    </span>
                    {project.provided}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold">
                    <ArrowUpDown className="h-3.5 w-3.5 text-ssil-red" />
                    <span>Order: #{project.order ?? idx}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditModal(project, idx)}
                      className="h-8 px-2.5 text-xs font-bold rounded-xl text-slate-700 dark:text-slate-200 border-slate-200 dark:border-zinc-700 hover:text-ssil-red"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setSelectedProject(project);
                        setDeleteModalOpen(true);
                      }}
                      className="h-8 px-2.5 text-xs font-bold rounded-xl bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:border-red-900"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* ADD / EDIT GALLERY PROJECT MODAL */}
      {/* ============================================================ */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-zinc-800 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800 mb-5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-ssil-red block mb-0.5">
                  PROJECT SHOWCASE CMS
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  {selectedProject ? "Edit Gallery Project" : "Add Gallery Project"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveProject} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Number (e.g. 01)</label>
                  <input
                    type="text"
                    required
                    value={formState.number}
                    onChange={(e) => setFormState({ ...formState, number: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-black text-ssil-red"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Project Main Title</label>
                  <input
                    type="text"
                    required
                    value={formState.title}
                    onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                    placeholder="e.g. Monumental High-Tensile National Flag Mast Installation"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Category Tag</label>
                  <input
                    type="text"
                    value={formState.categoryTag}
                    onChange={(e) => setFormState({ ...formState, categoryTag: e.target.value })}
                    placeholder="e.g. MONUMENTAL FLAG MAST, HIGHWAY INFRASTRUCTURE"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Location</label>
                  <input
                    type="text"
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    placeholder="e.g. Civic Plaza & National Monument Complex, India"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              {/* What SSIL Provided */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-ssil-red mb-1">
                  What SSIL Provided (Detailed Execution Description) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formState.provided}
                  onChange={(e) => setFormState({ ...formState, provided: e.target.value })}
                  placeholder="e.g. SSIL supplied and installed a 100-foot monumental high-tensile Indian National Flag mast system..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-medium leading-relaxed"
                />
              </div>

              {/* Cloudinary Showcase Image */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700 space-y-3">
                <label className="block text-[11px] font-bold uppercase text-slate-700 dark:text-slate-300">
                  Project Showcase Image (Cloudinary)
                </label>

                {formState.image && (
                  <div className="relative h-44 w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700 flex items-center justify-center p-2">
                    <img src={formState.image} alt="Showcase Preview" className="max-h-full max-w-full object-cover" />
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-zinc-600 hover:border-ssil-red bg-white dark:bg-zinc-900 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors">
                    {uploadingImage ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-ssil-red" />
                        <span>Uploading to Cloudinary...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 text-ssil-red" />
                        <span>Upload Project Photo</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>

                <input
                  type="url"
                  placeholder="Or paste Cloudinary URL"
                  value={formState.image}
                  onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[11px] font-mono text-slate-500"
                />
              </div>

              {/* Ordering and Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={formState.order}
                    onChange={(e) => setFormState({ ...formState, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Status</label>
                  <select
                    value={formState.active ? "active" : "draft"}
                    onChange={(e) => setFormState({ ...formState, active: e.target.value === "active" })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                  >
                    <option value="active">Active (Published)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                  className="text-xs font-bold rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={actionLoading || uploadingImage}
                  className="bg-ssil-red hover:bg-ssil-red-600 text-white text-xs font-bold rounded-xl px-6"
                >
                  {actionLoading ? "Saving Project..." : "Save Project"}
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* DELETE GALLERY PROJECT CONFIRMATION MODAL */}
      {/* ============================================================ */}
      {deleteModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-black uppercase text-slate-900 dark:text-white">Delete Gallery Project?</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              Are you sure you want to remove <strong>{selectedProject.title}</strong> from the Gallery?
            </p>
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteModalOpen(false)}
                className="text-xs font-bold rounded-xl"
              >
                Cancel
              </Button>
              <Button
                disabled={actionLoading}
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl"
              >
                {actionLoading ? "Deleting..." : "Confirm Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
