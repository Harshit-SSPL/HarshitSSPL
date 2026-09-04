"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Layers,
  X,
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

export default function AdminProductDesignsPage() {
  const params = useParams();
  const productId = params?.id as string;
  const router = useRouter();

  const [productName, setProductName] = useState<string>("Product");
  const [productData, setProductData] = useState<{
    _id?: string;
    name: string;
    slug: string;
    dayImage: string;
    nightImage?: string;
    heroImage?: string;
  } | null>(null);
  const [designs, setDesigns] = useState<DesignItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savingShowcase, setSavingShowcase] = useState(false);
  const [uploadingShowcaseDay, setUploadingShowcaseDay] = useState(false);
  const [uploadingShowcaseNight, setUploadingShowcaseNight] = useState(false);
  const [uploadingShowcaseHero, setUploadingShowcaseHero] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formState, setFormState] = useState<{
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

  const loadDesigns = async () => {
    try {
      const res = await fetchApi(`/products/${productId}/designs/admin`);
      if (res.success && res.product) {
        setProductName(res.product.name);
        setProductData(res.product);
        setDesigns(res.designs || []);
        return;
      }

      const fallbackProd = catalogProducts.find((p) => p.slug === productId || p.id === productId);
      if (fallbackProd) {
        setProductName(fallbackProd.name);
        setProductData({
          _id: fallbackProd.id,
          name: fallbackProd.name,
          slug: fallbackProd.slug,
          dayImage: fallbackProd.dayImage,
          nightImage: fallbackProd.nightImage,
          heroImage: fallbackProd.heroImage,
        });
        setDesigns(fallbackProd.galleryImages.map((g, i) => ({ ...g, _id: g.id, order: i, active: true })));
      }
    } catch (e) {
      console.warn("Using fallback product designs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      loadDesigns();
    }
  }, [productId]);

  const handleShowcaseDayUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingShowcaseDay(true);
    setErrorMsg(null);
    try {
      const uploaded = await uploadImageFile(file, "ssil_products_day");
      setProductData((prev) => (prev ? { ...prev, dayImage: uploaded.url } : null));
      setSuccessMsg("Daytime showcase photo uploaded! Click 'Save Showcase Changes' to apply.");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload daytime image.");
    } finally {
      setUploadingShowcaseDay(false);
    }
  };

  const handleShowcaseNightUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingShowcaseNight(true);
    setErrorMsg(null);
    try {
      const uploaded = await uploadImageFile(file, "ssil_products_night");
      setProductData((prev) => (prev ? { ...prev, nightImage: uploaded.url } : null));
      setSuccessMsg("Nighttime showcase photo uploaded! Click 'Save Showcase Changes' to apply.");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload nighttime image.");
    } finally {
      setUploadingShowcaseNight(false);
    }
  };

  const handleShowcaseHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingShowcaseHero(true);
    setErrorMsg(null);
    try {
      const uploaded = await uploadImageFile(file, "ssil_banners");
      setProductData((prev) => (prev ? { ...prev, heroImage: uploaded.url } : null));
      setSuccessMsg("Top banner photo uploaded! Click 'Save Showcase Changes' to apply.");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload banner image.");
    } finally {
      setUploadingShowcaseHero(false);
    }
  };

  const handleSaveShowcasePhotos = async () => {
    if (!productData) return;
    setSavingShowcase(true);
    setErrorMsg(null);

    try {
      const prodId = productData._id || productId;
      const res = await fetchApi(`/products/${prodId}`, {
        method: "PUT",
        body: JSON.stringify({
          dayImage: productData.dayImage,
          nightImage: productData.nightImage,
          heroImage: productData.heroImage,
        }),
      });

      if (res.success) {
        setSuccessMsg("Product Showcase photos & Hero Banner updated successfully!");
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save showcase photos.");
    } finally {
      setSavingShowcase(false);
    }
  };

  const openAddModal = () => {
    setSelectedDesign(null);
    setFormState({
      name: `${productName} Model ${String(designs.length + 1).padStart(2, "0")}`,
      dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510375/ssil_products_day/day.png",
      specs: "IP66 Weatherproof • Custom Engineering • ISO Standards",
      active: true,
    });
    setErrorMsg(null);
    setModalOpen(true);
  };

  const openEditModal = (design: DesignItem) => {
    setSelectedDesign(design);
    setFormState({
      name: design.name,
      dayImage: design.dayImage || "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510375/ssil_products_day/day.png",
      specs: design.specs || "IP66 Weatherproof • Custom Engineering • ISO Standards",
      active: design.active ?? true,
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
      const uploaded = await uploadImageFile(file, "ssil_product_designs");
      setFormState((prev) => ({ ...prev, dayImage: uploaded.url }));
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveDesign = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg(null);

    try {
      if (selectedDesign?._id && selectedDesign._id.length > 10) {
        // Edit existing
        const res = await fetchApi(`/products/${productId}/designs/${selectedDesign._id}`, {
          method: "PUT",
          body: JSON.stringify(formState),
        });
        if (res.success) {
          setSuccessMsg(`Design "${formState.name}" updated successfully!`);
        }
      } else {
        // Create new
        const res = await fetchApi(`/products/${productId}/designs`, {
          method: "POST",
          body: JSON.stringify({ ...formState, productId }),
        });
        if (res.success) {
          setSuccessMsg(`Design "${formState.name}" created successfully!`);
        }
      }

      setModalOpen(false);
      await loadDesigns();
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save design.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDesign?._id) return;
    setActionLoading(true);

    try {
      const res = await fetchApi(`/products/${productId}/designs/${selectedDesign._id}`, {
        method: "DELETE",
      });

      if (res.success) {
        setSuccessMsg("Design model deleted successfully.");
        setDeleteModalOpen(false);
        await loadDesigns();
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete design");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-ssil-red animate-spin mb-3" />
        <span className="text-xs font-bold text-slate-500 uppercase">Loading Product Designs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href={`${ADMIN_BASE_PATH}/products`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-ssil-red transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Products Master
          </Link>
          <span className="text-[11px] font-black uppercase tracking-widest text-ssil-red block mb-0.5">
            DESIGNS &amp; MODELS CMS
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            {productName} — Available Models ({designs.length})
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage individual design variations, custom images, and specifications for this category.
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add New Design
        </Button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Internal Page Hero Showcase & Top Banner Photos Editor */}
      {productData && (
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-ssil-red block">
                INTERNAL PRODUCT PAGE PHOTOS
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Day/Night Showcase &amp; Top Hero Banner Photos
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                These photos render at the top of the live product page (<code className="text-ssil-red font-mono font-bold">/products/{productData.slug}</code>).
              </p>
            </div>

            <Button
              onClick={handleSaveShowcasePhotos}
              disabled={savingShowcase}
              className="bg-slate-900 hover:bg-ssil-red text-white font-black px-5 py-2.5 rounded-xl text-xs shadow-md flex items-center gap-2 self-start sm:self-auto cursor-pointer"
            >
              {savingShowcase ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
              <span>Save Showcase &amp; Banner Photos</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Daytime Showcase */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black uppercase text-slate-800 dark:text-slate-200">
                    Daytime Showcase Photo
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Default</span>
                </div>
                <div className="h-36 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 mb-3 flex items-center justify-center">
                  <img src={productData.dayImage} alt="Daytime Showcase" className="w-full h-full object-cover" />
                </div>
              </div>

              <label className="cursor-pointer flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-zinc-600 hover:border-ssil-red bg-white dark:bg-zinc-900 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors shadow-xs">
                {uploadingShowcaseDay ? <Loader2 className="h-3.5 w-3.5 animate-spin text-ssil-red" /> : <Upload className="h-3.5 w-3.5 text-ssil-red" />}
                <span>Upload Day Photo</span>
                <input type="file" accept="image/*" onChange={handleShowcaseDayUpload} className="hidden" />
              </label>
            </div>

            {/* Nighttime Showcase */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black uppercase text-slate-800 dark:text-slate-200">
                    Nighttime Showcase Photo
                  </span>
                  <span className="text-[9px] font-bold text-amber-500 uppercase">Hover Glow</span>
                </div>
                <div className="h-36 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-3 flex items-center justify-center">
                  <img src={productData.nightImage || productData.dayImage} alt="Nighttime Showcase" className="w-full h-full object-cover" />
                </div>
              </div>

              <label className="cursor-pointer flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-zinc-600 hover:border-ssil-red bg-white dark:bg-zinc-900 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors shadow-xs">
                {uploadingShowcaseNight ? <Loader2 className="h-3.5 w-3.5 animate-spin text-ssil-red" /> : <Upload className="h-3.5 w-3.5 text-ssil-red" />}
                <span>Upload Night Photo</span>
                <input type="file" accept="image/*" onChange={handleShowcaseNightUpload} className="hidden" />
              </label>
            </div>

            {/* Top Full-Bleed Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-black uppercase text-slate-800 dark:text-slate-200">
                    Top Hero Banner Photo
                  </span>
                  <span className="text-[9px] font-bold text-ssil-red uppercase">Full-Bleed</span>
                </div>
                <div className="h-36 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-3 flex items-center justify-center">
                  <img src={productData.heroImage || "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510355/ssil_banners/products-hero.png"} alt="Top Banner" className="w-full h-full object-cover" />
                </div>
              </div>

              <label className="cursor-pointer flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-zinc-600 hover:border-ssil-red bg-white dark:bg-zinc-900 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors shadow-xs">
                {uploadingShowcaseHero ? <Loader2 className="h-3.5 w-3.5 animate-spin text-ssil-red" /> : <Upload className="h-3.5 w-3.5 text-ssil-red" />}
                <span>Upload Banner Photo</span>
                <input type="file" accept="image/*" onChange={handleShowcaseHeroUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Designs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {designs.map((design, idx) => {
          const desId = design._id || design.id || String(idx);
          return (
            <div
              key={desId}
              className="group p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between hover:border-ssil-red/50 transition-all"
            >
              {/* Image Preview */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-800 mb-3 relative border border-slate-200/80 dark:border-zinc-700">
                <img
                  src={design.dayImage}
                  alt={design.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <span className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-tight line-clamp-1">
                  {design.name}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {design.specs || "Custom Engineering Standard"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-zinc-800">
                <span className="text-[10px] font-mono text-slate-400">#{idx + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(design)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-ssil-red hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Edit Design"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDesign(design);
                      setDeleteModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Delete Design"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Design Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-zinc-800">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800 mb-4">
              <h3 className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white">
                {selectedDesign ? "Edit Design Variant" : "Add Design Variant"}
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

            <form onSubmit={handleSaveDesign} className="space-y-4">
              
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Model / Variant Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Model 01 / Type-A"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Technical Specs &amp; Highlights</label>
                <input
                  type="text"
                  value={formState.specs}
                  onChange={(e) => setFormState({ ...formState, specs: e.target.value })}
                  placeholder="e.g. IP66 Weatherproof • 60W-250W • ISO Certified"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Design Image (Cloudinary)</label>
                
                <div className="h-28 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-2 flex items-center justify-center mb-2 overflow-hidden">
                  <img src={formState.dayImage} alt="Design" className="max-h-full max-w-full object-cover" />
                </div>

                <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700 hover:border-ssil-red bg-slate-50 dark:bg-zinc-800 text-xs font-bold text-slate-600 dark:text-slate-300">
                  {uploadingImage ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-ssil-red" />
                      <span>Uploading to Cloudinary...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-3.5 w-3.5 text-ssil-red" />
                      <span>Upload Design Image</span>
                    </>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
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
                  className="bg-ssil-red hover:bg-ssil-red-600 text-white text-xs font-bold rounded-xl"
                >
                  {actionLoading ? "Saving..." : "Save Design"}
                </Button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && selectedDesign && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-black uppercase text-slate-900 dark:text-white">Delete Design?</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              Are you sure you want to remove <strong>{selectedDesign.name}</strong> from {productName}?
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
