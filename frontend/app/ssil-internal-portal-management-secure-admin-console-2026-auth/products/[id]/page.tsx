"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Camera,
  X,
  Check,
  RefreshCw,
  Sun,
  Moon,
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

export default function VisualProductPageEditor() {
  const params = useParams();
  const productId = (params?.id as string) || "decorative-poles";
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Upload Indicators per Card
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingDayShowcase, setUploadingDayShowcase] = useState(false);
  const [uploadingNightShowcase, setUploadingNightShowcase] = useState(false);
  const [uploadingDesignIdx, setUploadingDesignIdx] = useState<number | null>(null);

  // Edit Modals
  const [metaModalOpen, setMetaModalOpen] = useState(false);
  const [designModalOpen, setDesignModalOpen] = useState(false);
  const [selectedDesignIdx, setSelectedDesignIdx] = useState<number | null>(null);
  const [designActionLoading, setDesignActionLoading] = useState(false);

  // Active Product & Designs State
  const [product, setProduct] = useState<ProductDetail>({
    name: "Product Page",
    slug: productId,
    tagline: "",
    description: "",
    dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614330/ssil_hp_prod01_day.png",
    nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614332/ssil_hp_prod01_night.png",
    heroImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614300/ssil_banner_products_hero.png",
    active: true,
  });

  const [designs, setDesigns] = useState<DesignItem[]>([]);

  // Design Edit Form
  const [designForm, setDesignForm] = useState<{
    name: string;
    dayImage: string;
    specs: string;
  }>({
    name: "",
    dayImage: "",
    specs: "IP66 Weatherproof • Custom Engineering • ISO Standards",
  });

  // Meta Edit Form
  const [metaForm, setMetaForm] = useState<{
    name: string;
    tagline: string;
    description: string;
  }>({
    name: "",
    tagline: "",
    description: "",
  });

  // Load Product & Designs
  const loadProductData = async () => {
    try {
      const res = await fetchApi(`/products/${productId}/designs/admin`);
      if (res.success && res.product) {
        setProduct(res.product);
        setMetaForm({
          name: res.product.name,
          tagline: res.product.tagline || "",
          description: res.product.description || "",
        });

        if (Array.isArray(res.designs) && res.designs.length > 0) {
          setDesigns(res.designs);
          return;
        }
      }

      // Fallback from catalog
      const fallback = catalogProducts.find(
        (p) => p.slug === productId || p.id === productId || p.name.toLowerCase().includes(productId.toLowerCase())
      ) || catalogProducts[0];

      if (fallback) {
        setProduct((prev) => ({
          ...prev,
          _id: fallback.id,
          name: fallback.name,
          slug: fallback.slug,
          tagline: fallback.tagline,
          description: fallback.description,
          dayImage: fallback.dayImage,
          nightImage: fallback.nightImage,
          heroImage: fallback.heroImage,
          active: true,
        }));
        setMetaForm({
          name: fallback.name,
          tagline: fallback.tagline || "",
          description: fallback.description || "",
        });
        setDesigns(fallback.galleryImages.map((g, idx) => ({ ...g, order: idx, active: true })));
      }
    } catch (err) {
      console.warn("Using fallback catalog data for product editor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      loadProductData();
    }
  }, [productId]);

  // Flash Message Helper
  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // 1. AUTO-SAVE HERO BANNER UPLOAD
  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingBanner(true);
    setErrorMsg(null);
    try {
      const uploaded = await uploadImageFile(file, "ssil_banners");
      const updatedProduct = { ...product, heroImage: uploaded.url };
      setProduct(updatedProduct);

      // Auto-save to MongoDB
      const prodId = product._id || productId;
      await fetchApi(`/products/${prodId}`, {
        method: "PUT",
        body: JSON.stringify(updatedProduct),
      });

      showSuccess("Top Hero Banner updated and saved to live website!");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload banner photo.");
    } finally {
      setUploadingBanner(false);
    }
  };

  // 2. AUTO-SAVE DAY SHOWCASE PHOTO
  const handleDayShowcaseUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDayShowcase(true);
    setErrorMsg(null);
    try {
      const uploaded = await uploadImageFile(file, "ssil_products_day");
      const updatedProduct = { ...product, dayImage: uploaded.url };
      setProduct(updatedProduct);

      const prodId = product._id || productId;
      await fetchApi(`/products/${prodId}`, {
        method: "PUT",
        body: JSON.stringify(updatedProduct),
      });

      showSuccess("Daytime showcase photo updated and saved!");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload daytime image.");
    } finally {
      setUploadingDayShowcase(false);
    }
  };

  // 3. AUTO-SAVE NIGHT SHOWCASE PHOTO
  const handleNightShowcaseUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingNightShowcase(true);
    setErrorMsg(null);
    try {
      const uploaded = await uploadImageFile(file, "ssil_products_night");
      const updatedProduct = { ...product, nightImage: uploaded.url };
      setProduct(updatedProduct);

      const prodId = product._id || productId;
      await fetchApi(`/products/${prodId}`, {
        method: "PUT",
        body: JSON.stringify(updatedProduct),
      });

      showSuccess("Nighttime showcase photo updated and saved!");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload nighttime image.");
    } finally {
      setUploadingNightShowcase(false);
    }
  };

  // 4. AUTO-SAVE DESIGN MODEL PHOTO UPLOAD (DIRECTLY ON CARD)
  const handleDirectDesignPhotoUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDesignIdx(index);
    setErrorMsg(null);

    try {
      const uploaded = await uploadImageFile(file, "ssil_product_designs");
      const currentItem = designs[index];
      const prodId = product._id || productId;

      // Update local state instantly
      const updatedDesigns = [...designs];
      updatedDesigns[index] = { ...currentItem, dayImage: uploaded.url };
      setDesigns(updatedDesigns);

      // Save to database
      if (currentItem._id && currentItem._id.length === 24) {
        // Update existing in DB
        await fetchApi(`/products/${prodId}/designs/${currentItem._id}`, {
          method: "PUT",
          body: JSON.stringify({ dayImage: uploaded.url }),
        });
      } else {
        // Create new in DB
        const res = await fetchApi(`/products/${prodId}/designs`, {
          method: "POST",
          body: JSON.stringify({
            name: currentItem.name,
            dayImage: uploaded.url,
            specs: currentItem.specs || "IP66 Weatherproof • Custom Engineering • ISO Standards",
            order: index,
            active: true,
          }),
        });
        if (res.success && res.design) {
          updatedDesigns[index] = res.design;
          setDesigns([...updatedDesigns]);
        }
      }

      showSuccess(`Photo for ${currentItem.name} updated and saved!`);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload design model image.");
    } finally {
      setUploadingDesignIdx(null);
    }
  };

  // 5. SAVE META DETAILS (TITLE & TAGLINE)
  const handleSaveMeta = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const prodId = product._id || productId;
      const updatedProduct = {
        ...product,
        name: metaForm.name,
        tagline: metaForm.tagline,
        description: metaForm.description,
      };

      const res = await fetchApi(`/products/${prodId}`, {
        method: "PUT",
        body: JSON.stringify(updatedProduct),
      });

      if (res.success) {
        setProduct(updatedProduct);
        setMetaModalOpen(false);
        showSuccess("Product details updated and saved!");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save product details.");
    } finally {
      setSaving(false);
    }
  };

  // 6. OPEN ADD DESIGN MODAL
  const openAddDesignModal = () => {
    setSelectedDesignIdx(null);
    setDesignForm({
      name: `${product.name} Model ${String(designs.length + 1).padStart(2, "0")}`,
      dayImage: product.dayImage || "https://res.cloudinary.com/wlgmz8gr/image/upload/f_auto,q_auto/v1788614330/ssil_hp_prod01_day.png",
      specs: "IP66 Weatherproof • Custom Engineering • ISO Standards",
    });
    setDesignModalOpen(true);
  };

  // 7. OPEN EDIT DESIGN MODAL
  const openEditDesignModal = (index: number) => {
    setSelectedDesignIdx(index);
    const item = designs[index];
    setDesignForm({
      name: item.name,
      dayImage: item.dayImage,
      specs: item.specs || "IP66 Weatherproof • Custom Engineering • ISO Standards",
    });
    setDesignModalOpen(true);
  };

  // 8. SAVE DESIGN MODAL FORM
  const handleSaveDesignForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setDesignActionLoading(true);
    try {
      const prodId = product._id || productId;

      if (selectedDesignIdx !== null) {
        // Edit existing
        const currentItem = designs[selectedDesignIdx];
        const updatedDesigns = [...designs];
        updatedDesigns[selectedDesignIdx] = {
          ...currentItem,
          name: designForm.name,
          dayImage: designForm.dayImage,
          specs: designForm.specs,
        };
        setDesigns(updatedDesigns);

        if (currentItem._id && currentItem._id.length === 24) {
          await fetchApi(`/products/${prodId}/designs/${currentItem._id}`, {
            method: "PUT",
            body: JSON.stringify(designForm),
          });
        } else {
          const res = await fetchApi(`/products/${prodId}/designs`, {
            method: "POST",
            body: JSON.stringify({ ...designForm, order: selectedDesignIdx, active: true }),
          });
          if (res.success && res.design) {
            updatedDesigns[selectedDesignIdx] = res.design;
            setDesigns([...updatedDesigns]);
          }
        }
        showSuccess(`Model "${designForm.name}" saved!`);
      } else {
        // Add new
        const res = await fetchApi(`/products/${prodId}/designs`, {
          method: "POST",
          body: JSON.stringify({ ...designForm, order: designs.length, active: true }),
        });

        if (res.success && res.design) {
          setDesigns([...designs, res.design]);
        } else {
          setDesigns([...designs, { ...designForm, order: designs.length, active: true }]);
        }
        showSuccess(`New model "${designForm.name}" created!`);
      }

      setDesignModalOpen(false);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save design model.");
    } finally {
      setDesignActionLoading(false);
    }
  };

  // 9. DELETE DESIGN
  const handleDeleteDesign = async (index: number) => {
    const item = designs[index];
    if (!confirm(`Are you sure you want to delete ${item.name}?`)) return;

    const prodId = product._id || productId;
    try {
      if (item._id && item._id.length === 24) {
        await fetchApi(`/products/${prodId}/designs/${item._id}`, {
          method: "DELETE",
        });
      }
      setDesigns(designs.filter((_, i) => i !== index));
      showSuccess(`Model ${item.name} deleted.`);
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
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-ssil-red animate-spin mb-4" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Loading Visual Product Studio...
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
              href={`${ADMIN_BASE_PATH}/products`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-ssil-red" />
              <span>All Products</span>
            </Link>

            <div className="h-4 w-[1px] bg-slate-700 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                Visual In-Page Editor:
              </span>
              <span className="text-xs font-extrabold text-ssil-red uppercase">
                {product.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {successMsg && (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-lg flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                {successMsg}
              </span>
            )}

            {errorMsg && (
              <span className="text-xs font-bold text-rose-400 bg-rose-950/80 border border-rose-800 px-3 py-1 rounded-lg flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-rose-400" />
                {errorMsg}
              </span>
            )}

            <button
              onClick={() => setMetaModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-colors shadow-xs"
            >
              <Edit2 className="h-3.5 w-3.5 text-amber-400" />
              <span>Edit Title &amp; Details</span>
            </button>

            <Link
              href={`/products/${product.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-ssil-red hover:bg-ssil-red-600 text-white text-xs font-black transition-colors shadow-md shadow-ssil-red/20"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>View Live Website</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. VISUAL PRODUCT HERO BANNER SECTION */}
      {/* ============================================================ */}
      <div className="relative w-full h-[52vh] sm:h-[60vh] max-h-[520px] bg-slate-950 overflow-hidden group/hero border-b-4 border-ssil-red">
        <Image
          src={product.heroImage || "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510355/ssil_banners/products-hero.png"}
          alt={product.name}
          fill
          priority
          className="object-cover object-center brightness-90 group-hover/hero:brightness-75 transition-all duration-300"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />

        {/* Floating Hero Banner Edit Button */}
        <div className="absolute top-6 right-6 z-20">
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/80 hover:bg-ssil-red text-white text-xs font-black tracking-wider uppercase border border-white/20 shadow-2xl backdrop-blur-md hover:scale-105 transition-all">
            {uploadingBanner ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4 text-amber-400" />}
            <span>{uploadingBanner ? "Uploading Banner..." : "Change Top Banner Photo"}</span>
            <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
          </label>
        </div>

        {/* Hero Title & Breadcrumb Overlay */}
        <div className="absolute bottom-10 left-6 sm:left-12 z-20 max-w-3xl text-left">
          <div className="flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-widest text-slate-300 mb-2">
            <span>SSIL PRODUCTS</span>
            <span>/</span>
            <span className="text-ssil-red">/products/{product.slug}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-serif drop-shadow-md">
            {product.name}
          </h1>

          {product.tagline && (
            <p className="text-sm sm:text-base text-slate-200 mt-2 line-clamp-2 drop-shadow-sm font-medium">
              {product.tagline}
            </p>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. INTERACTIVE DAY / NIGHT SHOWCASE SECTION */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-md">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100 dark:border-zinc-800 mb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-ssil-red">
                DAY &amp; NIGHT PHOTOS
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase font-serif mt-0.5">
                Day &amp; Night Photos
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                These photos control the Day/Night interactive hover preview on the catalog and product page.
              </p>
            </div>

            <div className="text-xs font-mono font-bold text-slate-400 self-start sm:self-auto">
              Auto-saved to Cloudinary
            </div>
          </div>

          {/* 2-Column Visual Photo Cards with Direct Change Overlay */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Daytime Photo Card */}
            <div className="relative group rounded-3xl overflow-hidden bg-slate-100 dark:bg-zinc-800 border-2 border-slate-200 dark:border-zinc-700 shadow-xs hover:border-ssil-red transition-all">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={product.dayImage}
                  alt="Daytime Showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-slate-900 text-xs font-black shadow-xl hover:scale-105 transition-transform">
                    {uploadingDayShowcase ? <Loader2 className="h-4 w-4 animate-spin text-ssil-red" /> : <Upload className="h-4 w-4 text-ssil-red" />}
                    <span>Upload New Daytime Photo</span>
                    <input type="file" accept="image/*" onChange={handleDayShowcaseUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-zinc-900 flex items-center justify-between border-t border-slate-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-black uppercase text-slate-900 dark:text-white">Daytime Photo</span>
                </div>
                <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-ssil-red hover:underline">
                  <Camera className="h-3.5 w-3.5" />
                  <span>Replace Photo</span>
                  <input type="file" accept="image/*" onChange={handleDayShowcaseUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Nighttime Photo Card */}
            <div className="relative group rounded-3xl overflow-hidden bg-slate-950 border-2 border-slate-800 shadow-xs hover:border-amber-400 transition-all">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={product.nightImage || product.dayImage}
                  alt="Nighttime Showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-400 text-slate-950 text-xs font-black shadow-xl hover:scale-105 transition-transform">
                    {uploadingNightShowcase ? <Loader2 className="h-4 w-4 animate-spin text-slate-950" /> : <Upload className="h-4 w-4 text-slate-950" />}
                    <span>Upload New Nighttime Photo</span>
                    <input type="file" accept="image/*" onChange={handleNightShowcaseUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="p-4 bg-slate-900 flex items-center justify-between border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-black uppercase text-white">Nighttime Photo</span>
                </div>
                <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline">
                  <Camera className="h-3.5 w-3.5" />
                  <span>Replace Photo</span>
                  <input type="file" accept="image/*" onChange={handleNightShowcaseUpload} className="hidden" />
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. VISUAL PRODUCT DESIGNS & MODELS GALLERY (ONLY FOR PRODUCTS WITH VARIANTS) */}
      {/* ============================================================ */}
      {!isSpecializedShowcase && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-md space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-zinc-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-ssil-red">
                    INTERNAL PRODUCT MODELS
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-[10px] font-black">
                    {designs.length} Models Active
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase font-serif mt-0.5">
                  Available Product Designs &amp; Variants
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Hover over any model card to upload/replace its photo or edit its model name and specifications.
                </p>
              </div>

              <Button
                onClick={openAddDesignModal}
                className="bg-ssil-red hover:bg-ssil-red-600 text-white font-black px-5 py-2.5 rounded-2xl text-xs shadow-md flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Model Variant</span>
              </Button>
            </div>

            {/* 4-Column Responsive Visual Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {designs.map((item, idx) => {
                const isUploadingThis = uploadingDesignIdx === idx;

                return (
                  <div
                    key={item._id || item.id || `design-${idx}`}
                    className="group relative rounded-3xl bg-slate-50 dark:bg-zinc-800/70 border border-slate-200/90 dark:border-zinc-700/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-ssil-red transition-all flex flex-col justify-between"
                  >
                    {/* Photo with Direct Upload Hover Trigger */}
                    <div className="relative h-56 w-full bg-white dark:bg-zinc-900 overflow-hidden border-b border-slate-200 dark:border-zinc-700">
                      <img
                        src={item.dayImage}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Quick Upload Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4">
                        <label className="cursor-pointer w-full py-2.5 px-3 rounded-xl bg-ssil-red hover:bg-ssil-red-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105">
                          {isUploadingThis ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                          <span>{isUploadingThis ? "Uploading..." : "Upload Photo"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleDirectDesignPhotoUpload(idx, e)}
                            className="hidden"
                          />
                        </label>

                        <button
                          onClick={() => openEditDesignModal(idx)}
                          className="w-full py-2 px-3 rounded-xl bg-white/90 hover:bg-white text-slate-900 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-transform hover:scale-105"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-ssil-red" />
                          <span>Edit Name &amp; Specs</span>
                        </button>
                      </div>

                      {/* Index Tag */}
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-black font-mono">
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Details & Actions Footer */}
                    <div className="p-4 flex flex-col justify-between flex-1 gap-2">
                      <div>
                        <h4 className="text-sm font-black uppercase text-slate-900 dark:text-white group-hover:text-ssil-red transition-colors line-clamp-1">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                          {item.specs || "IP66 Weatherproof • Custom Engineering • ISO Standards"}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200/70 dark:border-zinc-700/70 flex items-center justify-between">
                        <label className="cursor-pointer text-[11px] font-black text-ssil-red hover:underline flex items-center gap-1">
                          <Upload className="h-3 w-3" />
                          <span>Replace</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleDirectDesignPhotoUpload(idx, e)}
                            className="hidden"
                          />
                        </label>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEditDesignModal(idx)}
                            className="p-1 rounded-lg text-slate-400 hover:text-ssil-red transition-colors"
                            title="Edit Specs"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteDesign(idx)}
                            className="p-1 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                            title="Delete Model"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Quick Add Model Card */}
              <button
                onClick={openAddDesignModal}
                className="h-full min-h-[280px] rounded-3xl border-2 border-dashed border-slate-300 dark:border-zinc-700 hover:border-ssil-red hover:bg-white dark:hover:bg-zinc-800 transition-all flex flex-col items-center justify-center p-6 text-center group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-ssil-red/10 text-ssil-red group-hover:bg-ssil-red group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                  <Plus className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase group-hover:text-ssil-red transition-colors">
                  Add Model #{String(designs.length + 1).padStart(2, "0")}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 max-w-[180px]">
                  Add another design model with image and technical specifications
                </p>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 1: EDIT PRODUCT TITLE, TAGLINE & DESCRIPTION */}
      {/* ============================================================ */}
      {metaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-zinc-800 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase">
                Edit Product Page Details
              </h3>
              <button onClick={() => setMetaModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMeta} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Product Title</label>
                <input
                  type="text"
                  value={metaForm.name}
                  onChange={(e) => setMetaForm({ ...metaForm, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Tagline</label>
                <input
                  type="text"
                  value={metaForm.tagline}
                  onChange={(e) => setMetaForm({ ...metaForm, tagline: e.target.value })}
                  placeholder="e.g. Precision-engineered architectural lighting..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={metaForm.description}
                  onChange={(e) => setMetaForm({ ...metaForm, description: e.target.value })}
                  placeholder="Engineering specifications summary..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setMetaModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-ssil-red hover:bg-ssil-red-600 text-white font-black px-5 py-2 rounded-xl text-xs"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: ADD / EDIT DESIGN MODEL */}
      {/* ============================================================ */}
      {designModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-zinc-800 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase">
                {selectedDesignIdx !== null ? `Edit ${designForm.name}` : "Add New Product Model"}
              </h3>
              <button onClick={() => setDesignModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDesignForm} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Model Name</label>
                <input
                  type="text"
                  value={designForm.name}
                  onChange={(e) => setDesignForm({ ...designForm, name: e.target.value })}
                  required
                  placeholder="e.g. SSILDP01"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Model Photo (Cloudinary)</label>
                {designForm.dayImage && (
                  <div className="h-36 w-full rounded-2xl overflow-hidden bg-slate-950 mb-2 border border-slate-200 dark:border-zinc-700">
                    <img src={designForm.dayImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-ssil-red transition-colors">
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        try {
                          const up = await uploadImageFile(f, "ssil_product_designs");
                          setDesignForm((p) => ({ ...p, dayImage: up.url }));
                        } catch (err: any) {
                          alert("Upload failed: " + err.message);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                  <input
                    type="url"
                    value={designForm.dayImage}
                    onChange={(e) => setDesignForm({ ...designForm, dayImage: e.target.value })}
                    placeholder="Or paste image URL"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-mono text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Specifications</label>
                <input
                  type="text"
                  value={designForm.specs}
                  onChange={(e) => setDesignForm({ ...designForm, specs: e.target.value })}
                  placeholder="e.g. IP66 Weatherproof • Custom Engineering • ISO Standards"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setDesignModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={designActionLoading}
                  className="bg-ssil-red hover:bg-ssil-red-600 text-white font-black px-5 py-2 rounded-xl text-xs"
                >
                  {designActionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Model"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
