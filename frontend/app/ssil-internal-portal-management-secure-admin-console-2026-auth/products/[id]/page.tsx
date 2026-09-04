"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Layers,
  Sparkles,
  Eye,
  ImageIcon,
  X,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchApi, uploadImageFile, ADMIN_BASE_PATH } from "@/lib/admin-api";
import { catalogProducts } from "@/data/products-catalog";

interface DesignItem {
  _id?: string;
  id?: string;
  name: string;
  dayImage: string;
  nightImage?: string;
  specs?: string;
  order?: number;
  active?: boolean;
}

interface ProductDetail {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  tagline?: string;
  description?: string;
  designCount?: number;
  dayImage: string;
  nightImage?: string;
  heroImage?: string;
  order?: number;
  active?: boolean;
}

export default function ProductStudioPage() {
  const params = useParams();
  const productId = params?.id as string;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Upload States
  const [uploadingCatalogDay, setUploadingCatalogDay] = useState(false);
  const [uploadingCatalogNight, setUploadingCatalogNight] = useState(false);
  const [uploadingHeroBanner, setUploadingHeroBanner] = useState(false);
  const [uploadingDesignPhoto, setUploadingDesignPhoto] = useState(false);

  // Product Form State
  const [product, setProduct] = useState<ProductDetail>({
    name: "",
    slug: "",
    tagline: "",
    description: "",
    dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510375/ssil_products_day/day.png",
    nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510376/ssil_products_night/night.png",
    heroImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510355/ssil_banners/products-hero.png",
    active: true,
  });

  // Designs State
  const [designs, setDesigns] = useState<DesignItem[]>([]);
  const [designModalOpen, setDesignModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const [designForm, setDesignForm] = useState<{
    name: string;
    dayImage: string;
    specs: string;
    active: boolean;
  }>({
    name: "",
    dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510375/ssil_products_day/day.png",
    specs: "IP66 Weatherproof • Custom Engineering • ISO Standards",
    active: true,
  });
  const [designActionLoading, setDesignActionLoading] = useState(false);

  // Load Data
  const loadProductStudio = async () => {
    try {
      // 1. Fetch Product
      const prodRes = await fetchApi(`/products/${productId}/designs/admin`);
      if (prodRes.success && prodRes.product) {
        setProduct(prodRes.product);
        setDesigns(prodRes.designs || []);
        return;
      }

      // Fallback
      const fallback = catalogProducts.find((p) => p.slug === productId || p.id === productId);
      if (fallback) {
        setProduct({
          _id: fallback.id,
          name: fallback.name,
          slug: fallback.slug,
          tagline: fallback.tagline,
          description: fallback.description,
          dayImage: fallback.dayImage,
          nightImage: fallback.nightImage,
          heroImage: fallback.heroImage,
          active: true,
        });
        setDesigns(fallback.galleryImages.map((g, i) => ({ ...g, _id: g.id, order: i, active: true })));
      }
    } catch (err: any) {
      console.warn("Using fallback data for product studio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      loadProductStudio();
    }
  }, [productId]);

  // Upload Handlers
  const handleCatalogDayUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCatalogDay(true);
    setErrorMsg(null);
    try {
      const uploaded = await uploadImageFile(file, "ssil_products_day");
      setProduct((prev) => ({ ...prev, dayImage: uploaded.url }));
      setSuccessMsg("Daytime photo uploaded! Click 'Save All Changes' to apply.");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload daytime image.");
    } finally {
      setUploadingCatalogDay(false);
    }
  };

  const handleCatalogNightUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCatalogNight(true);
    setErrorMsg(null);
    try {
      const uploaded = await uploadImageFile(file, "ssil_products_night");
      setProduct((prev) => ({ ...prev, nightImage: uploaded.url }));
      setSuccessMsg("Nighttime photo uploaded! Click 'Save All Changes' to apply.");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload nighttime image.");
    } finally {
      setUploadingCatalogNight(false);
    }
  };

  const handleHeroBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHeroBanner(true);
    setErrorMsg(null);
    try {
      const uploaded = await uploadImageFile(file, "ssil_banners");
      setProduct((prev) => ({ ...prev, heroImage: uploaded.url }));
      setSuccessMsg("Hero banner photo uploaded! Click 'Save All Changes' to apply.");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload banner image.");
    } finally {
      setUploadingHeroBanner(false);
    }
  };

  const handleDesignPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingDesignPhoto(true);
    setErrorMsg(null);
    try {
      const uploaded = await uploadImageFile(file, "ssil_product_designs");
      setDesignForm((prev) => ({ ...prev, dayImage: uploaded.url }));
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload design model photo.");
    } finally {
      setUploadingDesignPhoto(false);
    }
  };

  // Save All Product Details
  const handleSaveAll = async () => {
    setSaving(true);
    setErrorMsg(null);
    try {
      const prodId = product._id || productId;
      const res = await fetchApi(`/products/${prodId}`, {
        method: "PUT",
        body: JSON.stringify(product),
      });

      if (res.success) {
        setSuccessMsg(`"${product.name}" details and showcase photos saved successfully!`);
        setTimeout(() => setSuccessMsg(null), 4000);
      } else {
        throw new Error(res.message || "Failed to save product.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save product changes.");
    } finally {
      setSaving(false);
    }
  };

  // Design Model Actions
  const openAddDesign = () => {
    setSelectedDesign(null);
    setDesignForm({
      name: `${product.name} Model ${String(designs.length + 1).padStart(2, "0")}`,
      dayImage: product.dayImage || "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510375/ssil_products_day/day.png",
      specs: "IP66 Weatherproof • Custom Engineering • ISO Standards",
      active: true,
    });
    setDesignModalOpen(true);
  };

  const openEditDesign = (item: DesignItem) => {
    setSelectedDesign(item);
    setDesignForm({
      name: item.name,
      dayImage: item.dayImage,
      specs: item.specs || "IP66 Weatherproof • Custom Engineering • ISO Standards",
      active: item.active ?? true,
    });
    setDesignModalOpen(true);
  };

  const handleSaveDesign = async (e: React.FormEvent) => {
    e.preventDefault();
    setDesignActionLoading(true);
    try {
      const prodId = product._id || productId;
      if (selectedDesign?._id && selectedDesign._id.length > 10) {
        const res = await fetchApi(`/products/${prodId}/designs/${selectedDesign._id}`, {
          method: "PUT",
          body: JSON.stringify(designForm),
        });
        if (res.success) {
          setSuccessMsg(`Model "${designForm.name}" updated!`);
        }
      } else {
        const res = await fetchApi(`/products/${prodId}/designs`, {
          method: "POST",
          body: JSON.stringify({ ...designForm, productId: prodId }),
        });
        if (res.success) {
          setSuccessMsg(`Model "${designForm.name}" created!`);
        }
      }

      setDesignModalOpen(false);
      await loadProductStudio();
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save design model.");
    } finally {
      setDesignActionLoading(false);
    }
  };

  const handleDeleteDesign = async (designId?: string) => {
    if (!designId || !confirm("Are you sure you want to delete this model design?")) return;
    const prodId = product._id || productId;
    try {
      const res = await fetchApi(`/products/${prodId}/designs/${designId}`, {
        method: "DELETE",
      });
      if (res.success) {
        setSuccessMsg("Design model removed.");
        await loadProductStudio();
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete design");
    }
  };

  const isSpecializedShowcase = [
    "octagonal-poles",
    "flag-mast-poles",
    "stadium-high-mast",
    "high-mast",
    "camera-poles",
    "solar-power-plants",
  ].includes(product.slug);

  if (loading) {
    return (
      <div className="p-16 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-ssil-red animate-spin mb-4" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Loading Product Studio...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      
      {/* Top Breadcrumb & Main Header */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href={`${ADMIN_BASE_PATH}/products`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-ssil-red transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Products Master List
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-ssil-red block">
              DEDICATED PRODUCT STUDIO
            </span>
            {isSpecializedShowcase && (
              <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-[10px] font-black uppercase tracking-wider">
                ✨ Interactive Showcase Product
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase font-serif">
            {product.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
            /products/{product.slug}
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-xs transition-colors"
          >
            <Eye className="h-3.5 w-3.5 text-slate-400" />
            <span>View Live Page</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </Link>

          <Button
            onClick={handleSaveAll}
            disabled={saving}
            className="bg-ssil-red hover:bg-ssil-red-600 text-white font-black px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>Save All Changes</span>
          </Button>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION 1: BASIC INFORMATION & ROUTE SLUG */}
      {/* ============================================================ */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
              SECTION 1
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase">
              Product Overview &amp; Route Slug
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-400">Meta &amp; SEO</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Product Title</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-black text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Route Slug (/products/[slug])</label>
            <input
              type="text"
              value={product.slug}
              onChange={(e) => setProduct({ ...product, slug: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-mono font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Tagline (High-Level Summary)</label>
            <input
              type="text"
              value={product.tagline || ""}
              onChange={(e) => setProduct({ ...product, tagline: e.target.value })}
              placeholder="e.g. Precision-engineered outdoor lighting infrastructure..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium text-slate-900 dark:text-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Detailed Engineering Description</label>
            <textarea
              rows={3}
              value={product.description || ""}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              placeholder="Full architectural and engineering specifications summary..."
              className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium leading-relaxed text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 2: TOP FULL-BLEED HERO BANNER PHOTO */}
      {/* ============================================================ */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
              SECTION 2
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase">
              Product Page Top Hero Banner Photo
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              The full-bleed background banner displayed across the top of <code className="text-ssil-red font-mono font-bold">/products/{product.slug}</code>.
            </p>
          </div>
          <span className="text-xs font-bold text-ssil-red uppercase">Top Banner</span>
        </div>

        {product.heroImage && (
          <div className="relative h-44 sm:h-52 w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-700 p-1 flex items-center justify-center shadow-inner">
            <img src={product.heroImage} alt="Hero Banner" className="w-full h-full object-cover rounded-xl" />
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <label className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-dashed border-slate-300 dark:border-zinc-600 hover:border-ssil-red bg-slate-50 dark:bg-zinc-800 text-xs font-black text-slate-800 dark:text-slate-100 transition-colors shadow-xs">
            {uploadingHeroBanner ? <Loader2 className="h-4 w-4 animate-spin text-ssil-red" /> : <Upload className="h-4 w-4 text-ssil-red" />}
            <span>Upload New Banner Photo to Cloudinary</span>
            <input type="file" accept="image/*" onChange={handleHeroBannerUpload} className="hidden" />
          </label>

          <input
            type="url"
            value={product.heroImage || ""}
            onChange={(e) => setProduct({ ...product, heroImage: e.target.value })}
            placeholder="Or paste Cloudinary image URL directly"
            className="flex-1 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-mono text-slate-500"
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 3: CATALOG & INTERNAL DAY/NIGHT SHOWCASE PHOTOS */}
      {/* ============================================================ */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800 gap-2">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
              SECTION 3
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase">
              Day &amp; Night Visuals {isSpecializedShowcase && "— (Catalog + Internal Showcase)"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {isSpecializedShowcase
                ? `Controls both the card on /products and the interactive Day/Night crossfade showcase on /products/${product.slug}.`
                : `Controls the daytime and night hover glow image on the main /products catalogue card.`}
            </p>
          </div>
          <span className="text-xs font-bold text-amber-500 uppercase">Day / Night Hover</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Day Visual */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-slate-900 dark:text-white">
                  Daytime Visual (Default View)
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-white dark:bg-zinc-900 px-2 py-0.5 rounded-md border border-slate-200 dark:border-zinc-700">
                  Day
                </span>
              </div>
              <div className="h-44 sm:h-52 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 mb-3 flex items-center justify-center">
                <img src={product.dayImage} alt="Daytime" className="w-full h-full object-cover" />
              </div>
            </div>

            <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-zinc-600 hover:border-ssil-red bg-white dark:bg-zinc-900 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors shadow-xs">
              {uploadingCatalogDay ? <Loader2 className="h-4 w-4 animate-spin text-ssil-red" /> : <Upload className="h-4 w-4 text-ssil-red" />}
              <span>Upload Day Photo (Cloudinary)</span>
              <input type="file" accept="image/*" onChange={handleCatalogDayUpload} className="hidden" />
            </label>
          </div>

          {/* Night Visual */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-slate-900 dark:text-white">
                  Nighttime Visual (Hover Crossfade Glow)
                </span>
                <span className="text-[10px] font-bold text-amber-400 bg-black px-2 py-0.5 rounded-md">
                  Night Hover
                </span>
              </div>
              <div className="h-44 sm:h-52 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-3 flex items-center justify-center">
                <img src={product.nightImage || product.dayImage} alt="Nighttime" className="w-full h-full object-cover" />
              </div>
            </div>

            <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-300 dark:border-zinc-600 hover:border-ssil-red bg-white dark:bg-zinc-900 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors shadow-xs">
              {uploadingCatalogNight ? <Loader2 className="h-4 w-4 animate-spin text-ssil-red" /> : <Upload className="h-4 w-4 text-ssil-red" />}
              <span>Upload Night Photo (Cloudinary)</span>
              <input type="file" accept="image/*" onChange={handleCatalogNightUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 4: INTERNAL MODEL DESIGNS (ALL 12+ / 24+ / 41+ DESIGNS) */}
      {/* ============================================================ */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800 gap-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
              SECTION 4
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white uppercase">
              Internal Model Designs &amp; Variations ({designs.length})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Manage all individual model variants, engineering drawings, and specifications for this category.
            </p>
          </div>

          <Button
            onClick={openAddDesign}
            className="bg-slate-900 hover:bg-ssil-red text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add New Model Variant</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {designs.map((design, idx) => {
            const desId = design._id || design.id || String(idx);
            return (
              <div
                key={desId}
                className="group p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 shadow-xs flex flex-col justify-between hover:border-ssil-red/50 transition-all"
              >
                <div>
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-900 mb-3 relative border border-slate-200/80 dark:border-zinc-700">
                    <img
                      src={design.dayImage}
                      alt={design.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <span className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-tight line-clamp-1">
                    {design.name}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {design.specs || "Custom Engineering Standard"}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-1 pt-3 mt-3 border-t border-slate-200/60 dark:border-zinc-700">
                  <button
                    onClick={() => openEditDesign(design)}
                    className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-ssil-red hover:bg-white dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="Edit Model"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteDesign(design._id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                    title="Delete Model"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Save Action Bar */}
      <div className="sticky bottom-6 z-40 p-4 rounded-2xl bg-slate-900/90 dark:bg-zinc-900/90 backdrop-blur-md border border-slate-700 dark:border-zinc-700 shadow-2xl flex items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold">
            Editing: <span className="text-ssil-red uppercase">{product.name}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`${ADMIN_BASE_PATH}/products`}
            className="text-xs font-bold text-slate-300 hover:text-white transition-colors"
          >
            Cancel
          </Link>

          <Button
            onClick={handleSaveAll}
            disabled={saving}
            className="bg-ssil-red hover:bg-ssil-red-600 text-white font-black px-6 py-2 rounded-xl text-xs shadow-md flex items-center gap-2 cursor-pointer"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>Save All Product Changes</span>
          </Button>
        </div>
      </div>

      {/* Add / Edit Design Modal */}
      {designModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-zinc-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-zinc-800 mb-4">
              <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white">
                {selectedDesign ? "Edit Design Model" : "Add New Design Model"}
              </h3>
              <button
                onClick={() => setDesignModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDesign} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Model Name / Code</label>
                <input
                  type="text"
                  required
                  value={designForm.name}
                  onChange={(e) => setDesignForm({ ...designForm, name: e.target.value })}
                  placeholder="e.g. SSILDP-01"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Specifications</label>
                <input
                  type="text"
                  value={designForm.specs}
                  onChange={(e) => setDesignForm({ ...designForm, specs: e.target.value })}
                  placeholder="e.g. 6M to 12M • Octagonal HDG Steel"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Model Image Preview</label>
                <div className="h-36 w-full rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-2 flex items-center justify-center mb-2 overflow-hidden">
                  <img src={designForm.dayImage} alt="Model" className="max-h-full max-w-full object-cover rounded-lg" />
                </div>

                <label className="cursor-pointer flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700 hover:border-ssil-red bg-slate-50 dark:bg-zinc-800 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-xs">
                  {uploadingDesignPhoto ? <Loader2 className="h-3.5 w-3.5 animate-spin text-ssil-red" /> : <Upload className="h-3.5 w-3.5 text-ssil-red" />}
                  <span>Upload Model Photo to Cloudinary</span>
                  <input type="file" accept="image/*" onChange={handleDesignPhotoUpload} className="hidden" />
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDesignModalOpen(false)}
                  className="text-xs font-bold rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={designActionLoading}
                  className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  {designActionLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Save Design Model"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
