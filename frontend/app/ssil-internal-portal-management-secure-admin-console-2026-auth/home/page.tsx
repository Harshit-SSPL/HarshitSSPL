"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
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
  Eye,
  AlertCircle,
  X,
  ExternalLink,
  Camera,
  ArrowRight,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchApi, uploadImageFile, ADMIN_BASE_PATH } from "@/lib/admin-api";
import { featuredProducts as defaultFeatured, FeaturedProduct } from "@/data/featured-products";
import { NEUTRAL_BANNER_PLACEHOLDER } from "@/lib/placeholders";

interface FeaturedProductAdminItem {
  _id?: string;
  id?: string;
  name: string;
  category?: string;
  tagline?: string;
  description?: string;
  dayImage: string;
  nightImage: string;
  slug?: string;
  order?: number;
  active?: boolean;
}

export default function VisualHomePageEditor() {
  const [loading, setLoading] = useState(true);
  const [savingStats, setSavingStats] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 6 Featured Products State
  const [featuredList, setFeaturedList] = useState<FeaturedProductAdminItem[]>([]);
  const [uploadingIdx, setUploadingIdx] = useState<{ idx: number; type: "day" | "night" } | null>(null);

  // Modals State
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FeaturedProductAdminItem | null>(null);
  const [productForm, setProductForm] = useState<{
    name: string;
    tagline: string;
    description: string;
    dayImage: string;
    nightImage: string;
    slug: string;
  }>({
    name: "",
    tagline: "",
    description: "",
    dayImage: "",
    nightImage: "",
    slug: "",
  });

  const [statsModalOpen, setStatsModalOpen] = useState(false);

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
      } catch (e) {
        // Fallback
      }

      // 2. Load 6 Featured Products
      try {
        const featRes = await fetchApi("/home/featured");
        const list = Array.isArray(featRes.products)
          ? featRes.products
          : Array.isArray(featRes.featuredProducts)
          ? featRes.featuredProducts
          : [];

        if (featRes.success && list.length > 0) {
          setFeaturedList(list.slice(0, 6));
        } else {
          setFeaturedList(
            defaultFeatured.slice(0, 6).map((p, idx) => ({
              ...p,
              _id: p.id,
              order: idx,
              active: true,
            }))
          );
        }
      } catch (e) {
        setFeaturedList(
          defaultFeatured.slice(0, 6).map((p, idx) => ({
            ...p,
            _id: p.id,
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

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  // Quick Direct Upload on Featured Product Card
  const handleDirectUpload = async (index: number, type: "day" | "night", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIdx({ idx: index, type });
    setErrorMessage(null);

    try {
      const folder = type === "day" ? "ssil_products_day" : "ssil_products_night";
      const uploaded = await uploadImageFile(file, folder);

      const target = featuredList[index];
      const updatedProduct = {
        ...target,
        [type === "day" ? "dayImage" : "nightImage"]: uploaded.url,
      };

      const nextList = [...featuredList];
      nextList[index] = updatedProduct;
      setFeaturedList(nextList);

      // Save to MongoDB
      const prodId = target._id || target.id;
      if (prodId && prodId.length === 24) {
        await fetchApi(`/home/featured/${prodId}`, {
          method: "PUT",
          body: JSON.stringify(updatedProduct),
        });
      }

      showSuccess(`${type === "day" ? "Daytime" : "Nighttime"} photo for "${target.name}" updated!`);
    } catch (err: any) {
      setErrorMessage(err.message || `Failed to upload ${type} photo.`);
    } finally {
      setUploadingIdx(null);
    }
  };

  // Open Edit Product Modal
  const openEditModal = (p: FeaturedProductAdminItem) => {
    setSelectedProduct(p);
    setProductForm({
      name: p.name,
      tagline: p.tagline || "",
      description: p.description || "",
      dayImage: p.dayImage,
      nightImage: p.nightImage,
      slug: p.slug || "",
    });
    setEditProductModalOpen(true);
  };

  // Save Product Modal Form
  const handleSaveProductModal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const prodId = selectedProduct?._id || selectedProduct?.id;
      if (selectedProduct && prodId && prodId.length === 24) {
        await fetchApi(`/home/featured/${prodId}`, {
          method: "PUT",
          body: JSON.stringify(productForm),
        });
      }

      setFeaturedList((prev) =>
        prev.map((item) => (item.id === selectedProduct?.id || item._id === selectedProduct?._id ? { ...item, ...productForm } : item))
      );

      setEditProductModalOpen(false);
      showSuccess(`Featured product "${productForm.name}" updated!`);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to update featured product.");
    }
  };

  // Save Stats Form
  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingStats(true);
    try {
      await fetchApi("/home/stats", {
        method: "PUT",
        body: JSON.stringify(stats),
      });
      setStatsModalOpen(false);
      showSuccess("Homepage 4 Stats updated and saved!");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save stats.");
    } finally {
      setSavingStats(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-ssil-red animate-spin mb-4" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Loading Home Page Visual Editor...
        </span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-100 dark:bg-black text-slate-900 dark:text-white pb-24">
      
      {/* ============================================================ */}
      {/* TOP FLOATING VISUAL CMS ADMIN BAR */}
      {/* ============================================================ */}
      <div className="sticky top-0 z-50 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white px-4 sm:px-6 py-3 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <Link
              href={ADMIN_BASE_PATH}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-ssil-red" />
              <span>Dashboard</span>
            </Link>

            <div className="h-4 w-[1px] bg-slate-700 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                Visual Home Page CMS:
              </span>
              <span className="text-xs font-extrabold text-ssil-red uppercase">
                6 Featured Products &amp; 4 Stats
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {successMessage && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-lg flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                {successMessage}
              </span>
            )}

            {errorMessage && (
              <span className="text-xs font-bold text-rose-400 bg-rose-950/80 border border-rose-800 px-3 py-1 rounded-lg flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-rose-400" />
                {errorMessage}
              </span>
            )}

            <button
              onClick={() => setStatsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-colors shadow-xs"
            >
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <span>Edit 4 Stats</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-ssil-red hover:bg-ssil-red-600 text-white text-xs font-black transition-colors shadow-md shadow-ssil-red/20"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>View Live Home Page</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. VISUAL HOME HERO SECTION */}
      {/* ============================================================ */}
      <div className="relative w-full h-[54vh] sm:h-[62vh] max-h-[540px] bg-slate-950 overflow-hidden group/hero border-b-4 border-ssil-red">
        <Image
          src={NEUTRAL_BANNER_PLACEHOLDER}
          alt="Home Hero"
          fill
          priority
          className="object-cover object-center brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/30" />

        <div className="absolute bottom-12 left-6 sm:left-12 z-20 max-w-2xl text-left">
          <span className="text-[11px] font-mono font-black uppercase tracking-widest text-ssil-red block mb-2">
            SHREE SANT KRIPA APPLIANCES PVT. LTD.
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-serif drop-shadow-md">
            Illuminating India's National Infrastructure
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 line-clamp-2 max-w-xl font-medium">
            India's foremost manufacturer of smart lighting, octagonal poles, monumental high masts, and clean energy infrastructure.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. VISUAL 4 STATS COUNTER BAR */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30">
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                {stats.deployedFootprints.sublabel}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif text-ssil-red">
                {stats.deployedFootprints.value.toLocaleString()}{stats.deployedFootprints.suffix}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{stats.deployedFootprints.label}</p>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                {stats.yearsExperience.sublabel}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif text-ssil-red">
                {stats.yearsExperience.value}{stats.yearsExperience.suffix}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{stats.yearsExperience.label}</p>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                {stats.statesServed.sublabel}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif text-ssil-red">
                {stats.statesServed.value}{stats.statesServed.suffix}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{stats.statesServed.label}</p>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                {stats.projectsCompleted.sublabel}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-serif text-ssil-red">
                {stats.projectsCompleted.value.toLocaleString()}{stats.projectsCompleted.suffix}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{stats.projectsCompleted.label}</p>
            </div>
          </div>

          <button
            onClick={() => setStatsModalOpen(true)}
            className="shrink-0 px-4 py-2.5 rounded-2xl bg-slate-900 dark:bg-zinc-800 hover:bg-ssil-red text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Edit2 className="h-3.5 w-3.5 text-amber-400" />
            <span>Edit Stats</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. VISUAL 6 FEATURED PRODUCTS WITH DAY/NIGHT HOVER */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-md space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-ssil-red">
                  HOMEPAGE PRODUCT SHOWCASE
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-[10px] font-black">
                  6 Interactive Cards Active
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase font-serif mt-0.5">
                Featured Products (Day &amp; Night Interactive Cards)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Hover over the cards below to preview Day/Night transitions. Click "Day Photo" or "Night Photo" to directly upload and auto-save.
              </p>
            </div>

            <Link
              href={`${ADMIN_BASE_PATH}/products`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-ssil-red text-white text-xs font-bold transition-colors self-start sm:self-auto shadow-xs"
            >
              <span>Manage All 18 Products</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 6 Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredList.map((item, idx) => {
              const isUploadingDay = uploadingIdx?.idx === idx && uploadingIdx?.type === "day";
              const isUploadingNight = uploadingIdx?.idx === idx && uploadingIdx?.type === "night";

              return (
                <div
                  key={item._id || item.id || `featured-${idx}`}
                  className="group relative rounded-3xl bg-slate-50 dark:bg-zinc-800/70 border border-slate-200 dark:border-zinc-700/80 p-4 shadow-xs hover:shadow-xl hover:border-ssil-red transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Number Badge */}
                    <div className="flex items-center justify-between text-xs font-black mb-3">
                      <span className="font-mono text-ssil-red font-black">#{String(idx + 1).padStart(2, "0")}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {item.category || "Infrastructure"}
                      </span>
                    </div>

                    {/* Day / Night Previews */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 relative">
                        <img
                          src={item.dayImage}
                          alt="Day"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-white/90 text-[9px] font-black uppercase text-slate-900">
                          Day
                        </span>
                      </div>

                      <div className="h-32 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                        <img
                          src={item.nightImage || item.dayImage}
                          alt="Night"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/80 text-[9px] font-black uppercase text-amber-400">
                          Night
                        </span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-black uppercase text-slate-900 dark:text-white group-hover:text-ssil-red transition-colors line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {item.tagline || item.description}
                        </p>
                      </div>

                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-ssil-red hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                        title="Edit Info"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Direct Card Upload Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-200 dark:border-zinc-700 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <label className="cursor-pointer py-2 px-2.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-slate-200 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-slate-200 text-xs font-black flex items-center justify-center gap-1.5 transition-colors shadow-2xs">
                        {isUploadingDay ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sun className="h-3.5 w-3.5 text-amber-500" />}
                        <span>{isUploadingDay ? "..." : "Day Photo"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleDirectUpload(idx, "day", e)}
                          className="hidden"
                        />
                      </label>

                      <label className="cursor-pointer py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-black border border-slate-800 text-white text-xs font-black flex items-center justify-center gap-1.5 transition-colors shadow-2xs">
                        {isUploadingNight ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Moon className="h-3.5 w-3.5 text-amber-400" />}
                        <span>{isUploadingNight ? "..." : "Night Photo"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleDirectUpload(idx, "night", e)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <Link
                      href={`${ADMIN_BASE_PATH}/products/${item.slug || "decorative-poles"}`}
                      className="w-full py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Open Product Studio</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. VISUAL LINKS TO PARTNER LOGOS & GALLERY */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          <Link
            href={`${ADMIN_BASE_PATH}/national-projects`}
            className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs hover:shadow-lg hover:border-ssil-red transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-ssil-red transition-colors">
                  Powering National Projects (Client Logos)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage government &amp; private client partner logos on the homepage
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-ssil-red group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href={`${ADMIN_BASE_PATH}/gallery`}
            className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs hover:shadow-lg hover:border-ssil-red transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-ssil-red transition-colors">
                  Projects &amp; Gallery Showcase
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage executed case studies, locations &amp; photo gallery
                </p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-ssil-red group-hover:translate-x-1 transition-all" />
          </Link>

        </div>
      </div>

      {/* ============================================================ */}
      {/* MODAL: EDIT FEATURED PRODUCT */}
      {/* ============================================================ */}
      {editProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="text-lg font-black uppercase text-slate-900 dark:text-white">
                Edit {selectedProduct?.name}
              </h3>
              <button onClick={() => setEditProductModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProductModal} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Product Title</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Tagline</label>
                <input
                  type="text"
                  value={productForm.tagline}
                  onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Route Slug</label>
                <input
                  type="text"
                  value={productForm.slug}
                  onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  className="bg-ssil-red hover:bg-ssil-red-600 text-white font-black px-5 py-2 rounded-xl text-xs"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: EDIT 4 STATS */}
      {/* ============================================================ */}
      {statsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="text-lg font-black uppercase text-slate-900 dark:text-white">
                Edit 4 Core Performance Stats
              </h3>
              <button onClick={() => setStatsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStats} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Deployed Footprint Value</label>
                  <input
                    type="number"
                    value={stats.deployedFootprints.value}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        deployedFootprints: { ...stats.deployedFootprints, value: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Years of Experience</label>
                  <input
                    type="number"
                    value={stats.yearsExperience.value}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        yearsExperience: { ...stats.yearsExperience, value: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">States &amp; UTs Served</label>
                  <input
                    type="number"
                    value={stats.statesServed.value}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        statesServed: { ...stats.statesServed, value: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Completed Projects</label>
                  <input
                    type="number"
                    value={stats.projectsCompleted.value}
                    onChange={(e) =>
                      setStats({
                        ...stats,
                        projectsCompleted: { ...stats.projectsCompleted, value: Number(e.target.value) },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setStatsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={savingStats}
                  className="bg-ssil-red hover:bg-ssil-red-600 text-white font-black px-5 py-2 rounded-xl text-xs"
                >
                  {savingStats ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Stats"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
