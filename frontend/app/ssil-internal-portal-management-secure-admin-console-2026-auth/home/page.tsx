"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Save,
  Loader2,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Upload,
  Plus,
  Edit2,
  Trash2,
  Sun,
  Moon,
  Layers,
  Eye,
  AlertCircle,
  X,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchApi, uploadImageFile } from "@/lib/admin-api";
import { featuredProducts as defaultFeatured, FeaturedProduct } from "@/data/featured-products";

interface FeaturedProductAdminItem {
  _id?: string;
  id?: string;
  name: string;
  category?: string;
  tagline?: string;
  description?: string;
  dayImage: string;
  nightImage: string;
  dayCloudinaryId?: string;
  nightCloudinaryId?: string;
  slug?: string;
  order?: number;
  active?: boolean;
}

export default function AdminHomePage() {
  const [activeTab, setActiveTab] = useState<"featured" | "stats">("featured");
  const [loading, setLoading] = useState(true);
  const [savingStats, setSavingStats] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploadingDay, setUploadingDay] = useState(false);
  const [uploadingNight, setUploadingNight] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 6 Featured Products State
  const [featuredList, setFeaturedList] = useState<FeaturedProductAdminItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FeaturedProductAdminItem | null>(null);

  // Form State for Featured Product
  const [formState, setFormState] = useState<{
    name: string;
    category: string;
    tagline: string;
    description: string;
    dayImage: string;
    nightImage: string;
    slug: string;
    order: number;
    active: boolean;
  }>({
    name: "",
    category: "Commercial & Architectural",
    tagline: "",
    description: "",
    dayImage: "",
    nightImage: "",
    slug: "",
    order: 0,
    active: true,
  });

  // 4 Stats State
  const [stats, setStats] = useState({
    deployedFootprints: { value: 20000, suffix: "+", label: "Poles & Lighting Installations", sublabel: "DEPLOYED FOOTPRINT" },
    yearsExperience: { value: 12, suffix: "+", label: "Years of Experience", sublabel: "ENGINEERING HERITAGE" },
    statesServed: { value: 22, suffix: "+", label: "States & UTs Across India", sublabel: "PAN-INDIA PRESENCE" },
    projectsCompleted: { value: 500, suffix: "+", label: "Government & Private Projects", sublabel: "EXECUTED CONTRACTS" },
  });

  const loadData = async () => {
    try {
      // 1. Load Stats
      try {
        const statsRes = await fetchApi("/home/stats");
        if (statsRes.success && statsRes.stats) {
          setStats({
            deployedFootprints: statsRes.stats.deployedFootprints || stats.deployedFootprints,
            yearsExperience: statsRes.stats.yearsExperience || stats.yearsExperience,
            statesServed: statsRes.stats.statesServed || stats.statesServed,
            projectsCompleted: statsRes.stats.projectsCompleted || stats.projectsCompleted,
          });
        }
      } catch (err) {
        console.warn("Could not load stats from DB, using fallback");
      }

      // 2. Load Featured Products
      try {
        const featRes = await fetchApi("/home/featured/admin/all");
        if (featRes.success && Array.isArray(featRes.products) && featRes.products.length > 0) {
          setFeaturedList(featRes.products);
        } else {
          // Fallback to static defaults
          setFeaturedList(
            defaultFeatured.slice(0, 6).map((p, idx) => ({
              _id: p.id,
              name: p.name,
              dayImage: p.dayImage,
              nightImage: p.nightImage,
              category: "Commercial & Architectural",
              tagline: "High-efficiency lighting engineered for architectural and infrastructure spaces.",
              slug: p.name.toLowerCase().replace(/\s+/g, "-"),
              order: idx,
              active: true,
            }))
          );
        }
      } catch (err) {
        setFeaturedList(
          defaultFeatured.slice(0, 6).map((p, idx) => ({
            _id: p.id,
            name: p.name,
            dayImage: p.dayImage,
            nightImage: p.nightImage,
            category: "Commercial & Architectural",
            tagline: "High-efficiency lighting engineered for architectural and infrastructure spaces.",
            slug: p.name.toLowerCase().replace(/\s+/g, "-"),
            order: idx,
            active: true,
          }))
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- STATS HANDLER ---
  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingStats(true);
    setSuccessMessage(null);

    try {
      const res = await fetchApi("/home/stats", {
        method: "PUT",
        body: JSON.stringify(stats),
      });

      if (res.success) {
        setSuccessMessage("Home statistics updated successfully! Live website reflects changes.");
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } catch (err: any) {
      alert(err.message || "Failed to update statistics");
    } finally {
      setSavingStats(false);
    }
  };

  // --- FEATURED PRODUCTS HANDLERS ---
  const openAddFeaturedModal = () => {
    setSelectedProduct(null);
    setFormState({
      name: "",
      category: "Commercial & Architectural",
      tagline: "",
      description: "",
      dayImage: "",
      nightImage: "",
      slug: "",
      order: featuredList.length,
      active: true,
    });
    setErrorMessage(null);
    setModalOpen(true);
  };

  const openEditFeaturedModal = (prod: FeaturedProductAdminItem, idx: number) => {
    setSelectedProduct(prod);
    setFormState({
      name: prod.name,
      category: prod.category || "Commercial & Architectural",
      tagline: prod.tagline || "",
      description: prod.description || "",
      dayImage: prod.dayImage || "",
      nightImage: prod.nightImage || "",
      slug: prod.slug || prod.name.toLowerCase().replace(/\s+/g, "-"),
      order: prod.order ?? idx,
      active: prod.active ?? true,
    });
    setErrorMessage(null);
    setModalOpen(true);
  };

  const handleUploadDayImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDay(true);
    setErrorMessage(null);

    try {
      const uploaded = await uploadImageFile(file, "ssil_products_day");
      setFormState((prev) => ({ ...prev, dayImage: uploaded.url }));
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload Day image to Cloudinary.");
    } finally {
      setUploadingDay(false);
    }
  };

  const handleUploadNightImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingNight(true);
    setErrorMessage(null);

    try {
      const uploaded = await uploadImageFile(file, "ssil_products_night");
      setFormState((prev) => ({ ...prev, nightImage: uploaded.url }));
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to upload Night image to Cloudinary.");
    } finally {
      setUploadingNight(false);
    }
  };

  const handleSaveFeaturedProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.dayImage || !formState.nightImage) {
      setErrorMessage("Please provide both Day and Night images for the hover transition.");
      return;
    }

    setActionLoading(true);
    setErrorMessage(null);

    try {
      const slugVal = formState.slug.trim() || formState.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const payload = {
        ...formState,
        slug: slugVal,
      };

      if (selectedProduct?._id && selectedProduct._id.length > 10) {
        const res = await fetchApi(`/home/featured/${selectedProduct._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        if (res.success) {
          setSuccessMessage(`Featured Product "${formState.name}" updated successfully!`);
        }
      } else {
        const res = await fetchApi("/home/featured", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (res.success) {
          setSuccessMessage(`Featured Product "${formState.name}" added to Home page!`);
        }
      }

      setModalOpen(false);
      await loadData();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save featured product.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteFeaturedProduct = async () => {
    if (!selectedProduct?._id) return;
    setActionLoading(true);

    try {
      const res = await fetchApi(`/home/featured/${selectedProduct._id}`, {
        method: "DELETE",
      });

      if (res.success) {
        setSuccessMessage("Featured product deleted successfully.");
        setDeleteModalOpen(false);
        await loadData();
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete featured product.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-ssil-red animate-spin mb-3" />
        <span className="text-xs font-bold text-slate-500 uppercase">Loading Home Page CMS...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-ssil-red block mb-1">
            HOME PAGE CMS
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Home Page Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage the <strong>6 Featured Products</strong> with interactive Day/Night hover crossfades and the <strong>Company Scale Statistics</strong>.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-zinc-800 rounded-2xl self-start sm:self-auto border border-slate-200/80 dark:border-zinc-700">
          <button
            onClick={() => setActiveTab("featured")}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === "featured"
                ? "bg-white dark:bg-zinc-900 text-ssil-red shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Our Products (6 Items)
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === "stats"
                ? "bg-white dark:bg-zinc-900 text-ssil-red shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Scale &amp; Metrics
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 1: OUR PRODUCTS (6 FEATURED ITEMS WITH DAY/NIGHT HOVER) */}
      {/* ============================================================ */}
      {activeTab === "featured" && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">
                Featured Products Grid (Home Page)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The home page displays the 6 active products below with smooth Day &amp; Night crossfade hover effects.
              </p>
            </div>

            <Button
              onClick={openAddFeaturedModal}
              className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-sm flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="h-4 w-4" />
              Add Featured Product
            </Button>
          </div>

          {/* 6 Featured Products Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredList.map((prod, idx) => {
              const numStr = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={prod._id || prod.id || idx}
                  className="group relative rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xs hover:border-ssil-red/50 hover:shadow-md transition-all flex flex-col"
                >
                  {/* Top Bar with Number Badge & Active Status */}
                  <div className="p-4 pb-3 flex items-center justify-between border-b border-slate-100 dark:border-zinc-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-white bg-ssil-red px-2.5 py-0.5 rounded-md tracking-wider">
                        #{numStr}
                      </span>
                      <span className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-tight truncate max-w-[150px]">
                        {prod.name}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        prod.active !== false
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : "bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-slate-400"
                      }`}
                    >
                      {prod.active !== false ? "Live" : "Draft"}
                    </span>
                  </div>

                  {/* Interactive Live Hover Card Preview (Day/Night) */}
                  <div className="p-4 flex-1 flex flex-col items-center">
                    <div className="relative w-full aspect-[10/14] rounded-2xl overflow-hidden bg-slate-50 dark:bg-zinc-950/80 border border-slate-100 dark:border-zinc-800 group/image cursor-pointer">
                      {/* Day Image */}
                      {prod.dayImage && (
                        <Image
                          src={prod.dayImage}
                          alt={`${prod.name} Day`}
                          fill
                          sizes="300px"
                          className="object-contain p-3 opacity-100 group-hover/image:opacity-0 transition-opacity duration-500 ease-in-out"
                        />
                      )}

                      {/* Night Image */}
                      {prod.nightImage && (
                        <Image
                          src={prod.nightImage}
                          alt={`${prod.name} Night`}
                          fill
                          sizes="300px"
                          className="object-contain p-3 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 ease-in-out"
                        />
                      )}

                      {/* Hover Hint Pill */}
                      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-[10px] text-white font-bold pointer-events-none">
                        <Sun className="h-3 w-3 text-amber-400" />
                        <span>/</span>
                        <Moon className="h-3 w-3 text-blue-300" />
                        <span className="ml-1 text-[9px] text-slate-300">Hover</span>
                      </div>
                    </div>

                    <div className="mt-3 w-full text-center">
                      <p className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-tight truncate">
                        {prod.name}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                        {prod.category || "Commercial & Architectural"}
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <ArrowUpDown className="h-3.5 w-3.5 text-ssil-red" />
                      <span>Order: #{prod.order ?? idx}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditFeaturedModal(prod, idx)}
                        className="h-8 px-2.5 text-xs font-bold rounded-xl text-slate-700 dark:text-slate-200 border-slate-200 dark:border-zinc-700 hover:text-ssil-red"
                      >
                        <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedProduct(prod);
                          setDeleteModalOpen(true);
                        }}
                        className="h-8 px-2.5 text-xs font-bold rounded-xl bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:border-red-900"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: SCALE & CREDIBILITY METRICS (4 COUNTERS) */}
      {/* ============================================================ */}
      {activeTab === "stats" && (
        <form onSubmit={handleSaveStats} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* 1. Deployed Footprints */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-xs font-black uppercase text-ssil-red">Stat 1: Deployed Footprints</span>
                <span className="text-[10px] font-bold uppercase text-slate-400">COUNTER #01</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Target Counter Value</label>
                <input
                  type="number"
                  required
                  value={stats.deployedFootprints.value}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      deployedFootprints: { ...stats.deployedFootprints, value: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Suffix</label>
                  <input
                    type="text"
                    value={stats.deployedFootprints.suffix}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        deployedFootprints: { ...stats.deployedFootprints, suffix: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Sublabel (Badge)</label>
                  <input
                    type="text"
                    value={stats.deployedFootprints.sublabel}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        deployedFootprints: { ...stats.deployedFootprints, sublabel: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Main Label</label>
                <input
                  type="text"
                  value={stats.deployedFootprints.label}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      deployedFootprints: { ...stats.deployedFootprints, label: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium"
                />
              </div>
            </div>

            {/* 2. Years of Experience */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-xs font-black uppercase text-ssil-red">Stat 2: Experience</span>
                <span className="text-[10px] font-bold uppercase text-slate-400">COUNTER #02</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Years Value</label>
                <input
                  type="number"
                  required
                  value={stats.yearsExperience.value}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      yearsExperience: { ...stats.yearsExperience, value: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Suffix</label>
                  <input
                    type="text"
                    value={stats.yearsExperience.suffix}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        yearsExperience: { ...stats.yearsExperience, suffix: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Sublabel (Badge)</label>
                  <input
                    type="text"
                    value={stats.yearsExperience.sublabel}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        yearsExperience: { ...stats.yearsExperience, sublabel: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Main Label</label>
                <input
                  type="text"
                  value={stats.yearsExperience.label}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      yearsExperience: { ...stats.yearsExperience, label: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium"
                />
              </div>
            </div>

            {/* 3. States Served */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-xs font-black uppercase text-ssil-red">Stat 3: States &amp; UTs</span>
                <span className="text-[10px] font-bold uppercase text-slate-400">COUNTER #03</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">States Count</label>
                <input
                  type="number"
                  required
                  value={stats.statesServed.value}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      statesServed: { ...stats.statesServed, value: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Suffix</label>
                  <input
                    type="text"
                    value={stats.statesServed.suffix}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        statesServed: { ...stats.statesServed, suffix: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Sublabel (Badge)</label>
                  <input
                    type="text"
                    value={stats.statesServed.sublabel}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        statesServed: { ...stats.statesServed, sublabel: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Main Label</label>
                <input
                  type="text"
                  value={stats.statesServed.label}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      statesServed: { ...stats.statesServed, label: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium"
                />
              </div>
            </div>

            {/* 4. Projects Completed */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-xs font-black uppercase text-ssil-red">Stat 4: Projects Completed</span>
                <span className="text-[10px] font-bold uppercase text-slate-400">COUNTER #04</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Projects Count</label>
                <input
                  type="number"
                  required
                  value={stats.projectsCompleted.value}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      projectsCompleted: { ...stats.projectsCompleted, value: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Suffix</label>
                  <input
                    type="text"
                    value={stats.projectsCompleted.suffix}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        projectsCompleted: { ...stats.projectsCompleted, suffix: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Sublabel (Badge)</label>
                  <input
                    type="text"
                    value={stats.projectsCompleted.sublabel}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        projectsCompleted: { ...stats.projectsCompleted, sublabel: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Main Label</label>
                <input
                  type="text"
                  value={stats.projectsCompleted.label}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      projectsCompleted: { ...stats.projectsCompleted, label: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium"
                />
              </div>
            </div>

          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={savingStats}
              className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-7 py-2.5 rounded-xl text-xs sm:text-sm shadow-md"
            >
              {savingStats ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Statistics...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Statistics Changes
                </>
              )}
            </Button>
          </div>
        </form>
      )}

      {/* ============================================================ */}
      {/* ADD / EDIT FEATURED PRODUCT MODAL */}
      {/* ============================================================ */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-zinc-800 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800 mb-5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-ssil-red block mb-0.5">
                  FEATURED PRODUCT CONFIGURATION
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  {selectedProduct ? "Edit Featured Product" : "Add Featured Product"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSaveFeaturedProduct} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. LED Designer Pole"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Category Badge</label>
                  <input
                    type="text"
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    placeholder="e.g. Commercial & Architectural"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Slug / Product URL Path</label>
                  <input
                    type="text"
                    value={formState.slug}
                    onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
                    placeholder="e.g. designer-poles"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
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
                      <option value="active">Active (Visible)</option>
                      <option value="draft">Draft (Hidden)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Day & Night Cloudinary Image Uploader & Live Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-700 pb-2">
                  <span className="text-xs font-black uppercase text-ssil-red flex items-center gap-1.5">
                    <Sun className="h-4 w-4 text-amber-500" /> Day &amp; <Moon className="h-4 w-4 text-blue-400" /> Night Images (Cloudinary)
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">ASPECT RATIO 10:15</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Day Image */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold uppercase text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <Sun className="h-3.5 w-3.5 text-amber-500" /> 1. Day Image (Default)
                    </label>

                    {formState.dayImage && (
                      <div className="relative h-44 w-full bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700 flex items-center justify-center p-2">
                        <img src={formState.dayImage} alt="Day Preview" className="max-h-full max-w-full object-contain" />
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-zinc-600 hover:border-ssil-red bg-white dark:bg-zinc-900 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors">
                        {uploadingDay ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-ssil-red" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-3.5 w-3.5 text-ssil-red" />
                            <span>Upload Day Photo</span>
                          </>
                        )}
                        <input type="file" accept="image/*" onChange={handleUploadDayImage} className="hidden" />
                      </label>
                    </div>

                    <input
                      type="url"
                      placeholder="Or paste Cloudinary URL"
                      value={formState.dayImage}
                      onChange={(e) => setFormState({ ...formState, dayImage: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[11px] font-mono text-slate-500"
                    />
                  </div>

                  {/* Night Image */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold uppercase text-slate-600 dark:text-slate-300 flex items-center gap-1">
                      <Moon className="h-3.5 w-3.5 text-blue-400" /> 2. Night Image (On Hover)
                    </label>

                    {formState.nightImage && (
                      <div className="relative h-44 w-full bg-slate-950 rounded-xl overflow-hidden border border-zinc-700 flex items-center justify-center p-2">
                        <img src={formState.nightImage} alt="Night Preview" className="max-h-full max-w-full object-contain" />
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-zinc-600 hover:border-ssil-red bg-white dark:bg-zinc-900 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors">
                        {uploadingNight ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-ssil-red" />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-3.5 w-3.5 text-ssil-red" />
                            <span>Upload Night Photo</span>
                          </>
                        )}
                        <input type="file" accept="image/*" onChange={handleUploadNightImage} className="hidden" />
                      </label>
                    </div>

                    <input
                      type="url"
                      placeholder="Or paste Cloudinary URL"
                      value={formState.nightImage}
                      onChange={(e) => setFormState({ ...formState, nightImage: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[11px] font-mono text-slate-500"
                    />
                  </div>
                </div>

                {/* Live Hover Preview Demo if both present */}
                {formState.dayImage && formState.nightImage && (
                  <div className="pt-3 border-t border-slate-200 dark:border-zinc-700 flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                      Live Hover Crossfade Preview (Move cursor over image below):
                    </span>
                    <div className="relative w-36 aspect-[10/14] rounded-xl overflow-hidden bg-slate-900 border border-slate-300 dark:border-zinc-600 group/test cursor-pointer shadow-md">
                      <img
                        src={formState.dayImage}
                        alt="Day"
                        className="absolute inset-0 w-full h-full object-contain p-2 opacity-100 group-hover/test:opacity-0 transition-opacity duration-500"
                      />
                      <img
                        src={formState.nightImage}
                        alt="Night"
                        className="absolute inset-0 w-full h-full object-contain p-2 opacity-0 group-hover/test:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                  </div>
                )}
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
                  disabled={actionLoading || uploadingDay || uploadingNight}
                  className="bg-ssil-red hover:bg-ssil-red-600 text-white text-xs font-bold rounded-xl px-6"
                >
                  {actionLoading ? "Saving Product..." : "Save Product"}
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* DELETE FEATURED PRODUCT CONFIRMATION MODAL */}
      {/* ============================================================ */}
      {deleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-black uppercase text-slate-900 dark:text-white">Delete Featured Product?</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              Are you sure you want to remove <strong>{selectedProduct.name}</strong> from the home page featured list?
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
                onClick={handleDeleteFeaturedProduct}
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
