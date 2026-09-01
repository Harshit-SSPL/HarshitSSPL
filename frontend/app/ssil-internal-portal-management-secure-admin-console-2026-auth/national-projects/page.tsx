"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchApi, uploadImageFile } from "@/lib/admin-api";
import { clientCompanies } from "@/data/clients";

interface NationalProjectItem {
  _id?: string;
  id?: string;
  name: string;
  logoUrl?: string;
  category?: string;
  order?: number;
  active?: boolean;
}

export default function AdminNationalProjectsPage() {
  const [projects, setProjects] = useState<NationalProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<NationalProjectItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formState, setFormState] = useState<{
    name: string;
    logoUrl: string;
    category: string;
    active: boolean;
  }>({
    name: "",
    logoUrl: "",
    category: "Infrastructure",
    active: true,
  });

  const loadProjects = async () => {
    try {
      const res = await fetchApi("/national-projects/admin/all");
      if (res.success && Array.isArray(res.projects) && res.projects.length > 0) {
        setProjects(res.projects);
      } else {
        setProjects(clientCompanies.map((c, i) => ({ ...c, logoUrl: c.logoUrl || "", _id: c.id, order: i, active: true })));
      }
    } catch (e) {
      setProjects(clientCompanies.map((c, i) => ({ ...c, logoUrl: c.logoUrl || "", _id: c.id, order: i, active: true })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddModal = () => {
    setSelectedProject(null);
    setFormState({
      name: "",
      logoUrl: "",
      category: "Infrastructure",
      active: true,
    });
    setErrorMsg(null);
    setModalOpen(true);
  };

  const openEditModal = (project: NationalProjectItem) => {
    setSelectedProject(project);
    setFormState({
      name: project.name,
      logoUrl: project.logoUrl || "",
      category: project.category || "Infrastructure",
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
      const uploaded = await uploadImageFile(file, "ssil_national_projects");
      setFormState((prev) => ({ ...prev, logoUrl: uploaded.url }));
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.logoUrl) {
      setErrorMsg("Please upload or provide a project/client logo image.");
      return;
    }

    setActionLoading(true);
    setErrorMsg(null);

    try {
      if (selectedProject?._id && selectedProject._id.length > 10) {
        const res = await fetchApi(`/national-projects/${selectedProject._id}`, {
          method: "PUT",
          body: JSON.stringify(formState),
        });
        if (res.success) {
          setSuccessMsg(`Project "${formState.name}" updated successfully across Home & About Us!`);
        }
      } else {
        const res = await fetchApi("/national-projects", {
          method: "POST",
          body: JSON.stringify(formState),
        });
        if (res.success) {
          setSuccessMsg(`Project "${formState.name}" added successfully to Home & About Us!`);
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
      const res = await fetchApi(`/national-projects/${selectedProject._id}`, {
        method: "DELETE",
      });

      if (res.success) {
        setSuccessMsg("Project deleted successfully from both Home and About Us.");
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
        <span className="text-xs font-bold text-slate-500 uppercase">Loading Shared Projects...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-ssil-red block mb-1">
            SHARED COMPONENT CMS
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Powering National Projects
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            One single shared dataset synchronized across both <strong>Home Page</strong> and <strong>About Us</strong>.
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add National Project
        </Button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {projects.map((project, idx) => (
          <div
            key={project._id || project.id || idx}
            className="group p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col items-center justify-between text-center relative hover:border-ssil-red/50 transition-all"
          >
            {/* Logo Preview */}
            <div className="h-16 w-full flex items-center justify-center p-2 mb-2 bg-slate-50 dark:bg-zinc-800/60 rounded-xl">
              <img
                src={project.logoUrl}
                alt={project.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>

            <span className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-tight line-clamp-1">
              {project.name}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
              {project.category || "Infrastructure"}
            </span>

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 dark:border-zinc-800 w-full justify-center">
              <button
                onClick={() => openEditModal(project)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-ssil-red hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                title="Edit Project"
              >
                <Edit2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => {
                  setSelectedProject(project);
                  setDeleteModalOpen(true);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                title="Delete Project"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-zinc-800">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800 mb-4">
              <h3 className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white">
                {selectedProject ? "Edit National Project" : "Add National Project"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800">
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
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Project / Client Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. NHAI / L&T / INDIAN OIL"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Category Tag</label>
                <input
                  type="text"
                  value={formState.category}
                  onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                  placeholder="e.g. Government, Transit, Infrastructure"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Logo Image (Cloudinary)</label>
                
                {formState.logoUrl && (
                  <div className="mb-2 p-3 bg-slate-50 dark:bg-zinc-800 rounded-xl flex items-center justify-between">
                    <div className="h-10 w-24 flex items-center justify-center">
                      <img src={formState.logoUrl} alt="Logo" className="max-h-full max-w-full object-contain" />
                    </div>
                    <span className="text-[10px] text-slate-400 truncate max-w-[180px]">{formState.logoUrl}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700 hover:border-ssil-red bg-slate-50 dark:bg-zinc-800 text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors">
                    {uploadingImage ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-ssil-red" />
                        <span>Uploading to Cloudinary...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 text-ssil-red" />
                        <span>Upload Logo File</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
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
                  className="bg-ssil-red hover:bg-ssil-red-600 text-white text-xs font-bold rounded-xl"
                >
                  {actionLoading ? "Saving..." : "Save Project"}
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-black uppercase text-slate-900 dark:text-white">Delete Project?</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              Are you sure you want to remove <strong>{selectedProject.name}</strong> from the shared National Projects list?
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
