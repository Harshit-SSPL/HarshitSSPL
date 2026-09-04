"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Layers,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  Camera,
  Eye,
  Sun,
  Moon,
  Sparkles,
  ArrowRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchApi, uploadImageFile, ADMIN_BASE_PATH } from "@/lib/admin-api";
import { catalogProducts } from "@/data/products-catalog";

interface ProductItem {
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

export default function VisualProductsCatalogEditor() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Uploading states
  const [uploadingIdx, setUploadingIdx] = useState<{ idx: number; type: "day" | "night" } | null>(null);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  // Quick Edit Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [formState, setFormState] = useState<{
    name: string;
    slug: string;
    tagline: string;
    description: string;
    dayImage: string;
    nightImage: string;
    heroImage: string;
    active: boolean;
  }>({
    name: "",
    slug: "",
    tagline: "",
    description: "",
    dayImage: "",
    nightImage: "",
    heroImage: "",
    active: true,
  });
  const [modalLoading, setModalLoading] = useState(false);

  // Catalog Hero Banner State
  const [catalogBanner, setCatalogBanner] = useState(
    "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510355/ssil_banners/products-hero.png"
  );

  const loadProducts = async () => {
    try {
      const res = await fetchApi("/products/admin/all");
      if (res.success && Array.isArray(res.products) && res.products.length > 0) {
        const sorted = [...res.products].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
        setProducts(sorted);
      } else {
        setProducts(catalogProducts.map((p, i) => ({ ...p, _id: p.id, order: i, active: true })));
      }
    } catch (e) {
      setProducts(catalogProducts.map((p, i) => ({ ...p, _id: p.id, order: i, active: true })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // Quick Direct Upload for Product Card (Day / Night)
  const handleDirectCardUpload = async (index: number, type: "day" | "night", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIdx({ idx: index, type });
    setErrorMsg(null);

    try {
      const folder = type === "day" ? "ssil_products_day" : "ssil_products_night";
      const uploaded = await uploadImageFile(file, folder);

      const target = products[index];
      const updatedProduct = {
        ...target,
        [type === "day" ? "dayImage" : "nightImage"]: uploaded.url,
      };

      // Update local state instantly
      const nextList = [...products];
      nextList[index] = updatedProduct;
      setProducts(nextList);

      // Auto-save to database
      const prodId = target._id || target.id || target.slug;
      await fetchApi(`/products/${prodId}`, {
        method: "PUT",
        body: JSON.stringify(updatedProduct),
      });

      showSuccess(`${type === "day" ? "Daytime" : "Nighttime"} photo for "${target.name}" updated!`);
    } catch (err: any) {
      setErrorMsg(err.message || `Failed to upload ${type} image.`);
    } finally {
      setUploadingIdx(null);
    }
  };

  // Open Quick Edit Modal
  const openEditModal = (p: ProductItem) => {
    setSelectedProduct(p);
    setFormState({
      name: p.name,
      slug: p.slug,
      tagline: p.tagline || "",
      description: p.description || "",
      dayImage: p.dayImage,
      nightImage: p.nightImage || p.dayImage,
      heroImage: p.heroImage || catalogBanner,
      active: p.active ?? true,
    });
    setModalOpen(true);
  };

  // Save Quick Edit Modal
  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      const prodId = selectedProduct?._id || selectedProduct?.id || formState.slug;
      if (selectedProduct) {
        await fetchApi(`/products/${prodId}`, {
          method: "PUT",
          body: JSON.stringify(formState),
        });
        showSuccess(`Product "${formState.name}" updated!`);
      } else {
        await fetchApi("/products", {
          method: "POST",
          body: JSON.stringify(formState),
        });
        showSuccess(`New product category "${formState.name}" added!`);
      }
      setModalOpen(false);
      await loadProducts();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save product.");
    } finally {
      setModalLoading(false);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-ssil-red animate-spin mb-4" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Loading Products Catalog CMS...
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
                Visual Catalog Editor:
              </span>
              <span className="text-xs font-extrabold text-ssil-red uppercase">
                {products.length} Categories Active
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

            <Button
              onClick={() => {
                setSelectedProduct(null);
                setFormState({
                  name: "",
                  slug: "",
                  tagline: "",
                  description: "",
                  dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510375/ssil_products_day/day.png",
                  nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510376/ssil_products_night/night.png",
                  heroImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510355/ssil_banners/products-hero.png",
                  active: true,
                });
                setModalOpen(true);
              }}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 border border-slate-700"
            >
              <Plus className="h-3.5 w-3.5 text-ssil-red" />
              <span>Add Category</span>
            </Button>

            <Link
              href="/products"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-ssil-red hover:bg-ssil-red-600 text-white text-xs font-black transition-colors shadow-md shadow-ssil-red/20"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>View Live /products</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </Link>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. VISUAL CATALOG HERO BANNER */}
      {/* ============================================================ */}
      <div className="relative w-full h-[45vh] sm:h-[50vh] max-h-[440px] bg-slate-950 overflow-hidden group/banner border-b-4 border-ssil-red">
        <Image
          src={catalogBanner}
          alt="Products Catalog Hero"
          fill
          priority
          className="object-cover object-center brightness-90 group-hover/banner:brightness-75 transition-all duration-300"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 pointer-events-none" />

        {/* Banner Edit Floating Button */}
        <div className="absolute top-6 right-6 z-20">
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/80 hover:bg-ssil-red text-white text-xs font-black tracking-wider uppercase border border-white/20 shadow-2xl backdrop-blur-md hover:scale-105 transition-all">
            {uploadingBanner ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4 text-amber-400" />}
            <span>{uploadingBanner ? "Uploading Banner..." : "Change Catalog Hero Banner"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                setUploadingBanner(true);
                try {
                  const up = await uploadImageFile(f, "ssil_banners");
                  setCatalogBanner(up.url);
                  showSuccess("Products catalog banner updated!");
                } catch (err: any) {
                  setErrorMsg(err.message || "Failed to upload banner");
                } finally {
                  setUploadingBanner(false);
                }
              }}
              className="hidden"
            />
          </label>
        </div>

        {/* Banner Content */}
        <div className="absolute bottom-10 left-6 sm:left-12 z-20 max-w-3xl text-left">
          <span className="text-[11px] font-mono font-black uppercase tracking-widest text-ssil-red block mb-1">
            SSIL PRODUCT PORTFOLIO
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-serif drop-shadow-md">
            Product Infrastructure Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 line-clamp-2 max-w-xl font-medium">
            Click any product card below to enter its Dedicated Product Studio and edit its Top Banner, Day/Night Showcase, and all Internal Model Designs.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. SEARCH & CONTROLS BAR */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search product categories by name or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-medium text-slate-900 dark:text-white"
            />
          </div>

          <span className="text-xs font-black uppercase text-slate-400">
            Showing {filteredProducts.length} of {products.length} Products
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. VISUAL PRODUCT CARDS GRID (WITH INTERACTIVE STUDIO LAUNCH) */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product, idx) => {
            const numFormatted = String((product.order ?? idx) + 1).padStart(2, "0");
            const prodId = product.slug || product._id || product.id || String(idx);
            const isUploadingDay = uploadingIdx?.idx === idx && uploadingIdx?.type === "day";
            const isUploadingNight = uploadingIdx?.idx === idx && uploadingIdx?.type === "night";

            return (
              <div
                key={prodId}
                className="group relative rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 p-5 shadow-sm hover:shadow-xl hover:border-ssil-red transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Number & Route */}
                  <div className="flex items-center justify-between text-xs font-black mb-3">
                    <span className="font-mono text-ssil-red font-black text-sm">#{numFormatted}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                      /products/{product.slug}
                    </span>
                  </div>

                  {/* Day / Night Image Previews (Clickable to enter Studio) */}
                  <Link
                    href={`${ADMIN_BASE_PATH}/products/${product.slug || prodId}`}
                    className="grid grid-cols-2 gap-2 mb-3.5 block group-hover:opacity-95 transition-opacity"
                    title="Click to open Product Studio"
                  >
                    <div className="h-28 rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 relative">
                      <img
                        src={product.dayImage}
                        alt="Day"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-white/90 text-[9px] font-black uppercase tracking-wider text-slate-900 shadow-xs">
                        Day
                      </span>
                    </div>

                    <div className="h-28 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                      <img
                        src={product.nightImage || product.dayImage}
                        alt="Night"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/80 text-[9px] font-black uppercase tracking-wider text-amber-400 shadow-xs">
                        Night
                      </span>
                    </div>
                  </Link>

                  {/* Title */}
                  <Link
                    href={`${ADMIN_BASE_PATH}/products/${product.slug || prodId}`}
                    className="block group-hover:text-ssil-red transition-colors"
                  >
                    <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  {product.tagline && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {product.tagline}
                    </p>
                  )}
                </div>

                {/* Single Clean Action to Open Studio */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-zinc-800">
                  <Link
                    href={`${ADMIN_BASE_PATH}/products/${product.slug || prodId}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-zinc-100 hover:bg-ssil-red dark:hover:bg-ssil-red text-white dark:text-zinc-900 dark:hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    <span>Edit Product</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-70 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* QUICK EDIT / ADD CATEGORY MODAL */}
      {/* ============================================================ */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="text-lg font-black uppercase text-slate-900 dark:text-white">
                {selectedProduct ? `Edit ${selectedProduct.name}` : "Add Product Category"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Product Name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Route Slug (/products/[slug])</label>
                <input
                  type="text"
                  value={formState.slug}
                  onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-mono font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Tagline</label>
                <input
                  type="text"
                  value={formState.tagline}
                  onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
                  placeholder="e.g. Heavy-duty infrastructure lighting..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  disabled={modalLoading}
                  className="bg-ssil-red hover:bg-ssil-red-600 text-white font-black px-5 py-2 rounded-xl text-xs"
                >
                  {modalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Category"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
