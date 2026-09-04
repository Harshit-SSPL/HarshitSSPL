"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  Edit2,
  Trash2,
  Layers,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Package,
  X,
  ExternalLink,
  Search,
  LayoutGrid,
  List,
  ChevronRight,
  ArrowRight,
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

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploadingDay, setUploadingDay] = useState(false);
  const [uploadingNight, setUploadingNight] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
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
    dayImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510375/ssil_products_day/day.png",
    nightImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510376/ssil_products_night/night.png",
    heroImage: "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510355/ssil_banners/products-hero.png",
    active: true,
  });

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

  useEffect(() => {
    if (searchParams.get("action") === "new") {
      openAddModal();
    }
  }, [searchParams]);

  const openAddModal = () => {
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
    setErrorMsg(null);
    setModalOpen(true);
  };

  const openEditModal = (product: ProductItem) => {
    setSelectedProduct(product);
    setFormState({
      name: product.name,
      slug: product.slug,
      tagline: product.tagline || "",
      description: product.description || "",
      dayImage: product.dayImage || "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510375/ssil_products_day/day.png",
      nightImage: product.nightImage || "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510376/ssil_products_night/night.png",
      heroImage: product.heroImage || "https://res.cloudinary.com/wlgmz8gr/image/upload/v1788510355/ssil_banners/products-hero.png",
      active: product.active ?? true,
    });
    setErrorMsg(null);
    setModalOpen(true);
  };

  const handleDayImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDay(true);
    setErrorMsg(null);

    try {
      const uploaded = await uploadImageFile(file, "ssil_products_day");
      setFormState((prev) => ({ ...prev, dayImage: uploaded.url }));
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload daytime image.");
    } finally {
      setUploadingDay(false);
    }
  };

  const handleNightImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingNight(true);
    setErrorMsg(null);

    try {
      const uploaded = await uploadImageFile(file, "ssil_products_night");
      setFormState((prev) => ({ ...prev, nightImage: uploaded.url }));
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload nighttime image.");
    } finally {
      setUploadingNight(false);
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHero(true);
    setErrorMsg(null);

    try {
      const uploaded = await uploadImageFile(file, "ssil_banners");
      setFormState((prev) => ({ ...prev, heroImage: uploaded.url }));
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to upload hero banner image.");
    } finally {
      setUploadingHero(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg(null);

    try {
      const slugVal = formState.slug || formState.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const payload = { ...formState, slug: slugVal };

      if (selectedProduct?._id && selectedProduct._id.length > 10) {
        const res = await fetchApi(`/products/${selectedProduct._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        if (res.success) {
          setSuccessMsg(`Product "${formState.name}" updated successfully!`);
        }
      } else {
        const res = await fetchApi("/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (res.success) {
          setSuccessMsg(`Product "${formState.name}" created successfully!`);
        }
      }

      setModalOpen(false);
      await loadProducts();
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save product.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct?._id) return;
    setActionLoading(true);

    try {
      const res = await fetchApi(`/products/${selectedProduct._id}`, {
        method: "DELETE",
      });

      if (res.success) {
        setSuccessMsg("Product deleted successfully.");
        setDeleteModalOpen(false);
        await loadProducts();
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete product");
    } finally {
      setActionLoading(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-ssil-red animate-spin mb-3" />
        <span className="text-xs font-bold text-slate-500 uppercase">Loading Products Master...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-ssil-red block mb-1">
            CATALOGUE MASTER CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-serif">
            Products &amp; Solutions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage all 18 product categories, day/night visuals, and click any product to edit its internal model designs.
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-5 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add Product Category
        </Button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter and View Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-3.5 rounded-2xl border border-slate-200/90 dark:border-zinc-800 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title or route slug..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-ssil-red"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-slate-500 font-bold mr-2">
            Showing {filteredProducts.length} of {products.length} Products
          </span>
          <div className="flex items-center bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-white dark:bg-zinc-700 text-ssil-red shadow-xs font-bold" : "text-slate-500 hover:text-slate-900"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "table" ? "bg-white dark:bg-zinc-700 text-ssil-red shadow-xs font-bold" : "text-slate-500 hover:text-slate-900"
              }`}
              title="Table View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View of Internal Products */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product, idx) => {
            const prodId = product._id || product.id || String(idx);
            const displayIndex = (product.order !== undefined && product.order !== null)
              ? product.order + 1
              : idx + 1;
            const numFormatted = String(displayIndex).padStart(2, "0");

            return (
              <div
                key={prodId}
                className="group bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 rounded-3xl p-5 shadow-xs hover:shadow-xl hover:border-ssil-red/40 transition-all flex flex-col justify-between relative"
              >
                <div>
                  {/* Numbering Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-mono text-[11px] font-black tracking-wider shadow-xs">
                      #{numFormatted}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${product.active !== false ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60" : "bg-zinc-100 text-zinc-500"}`}>
                      {product.active !== false ? "Active" : "Draft"}
                    </span>
                  </div>

                  {/* Image Previews (Day & Night) */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="h-28 rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 relative">
                      <img src={product.dayImage} alt="Day" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-white/90 dark:bg-black/70 text-[9px] font-black uppercase tracking-wider text-slate-800 dark:text-white">
                        Day
                      </span>
                    </div>
                    <div className="h-28 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative">
                      <img src={product.nightImage || product.dayImage} alt="Night" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/80 text-[9px] font-black uppercase tracking-wider text-amber-400">
                        Night
                      </span>
                    </div>
                  </div>

                  {/* Title and Route */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white group-hover:text-ssil-red transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                        /products/{product.slug}
                      </p>
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="p-1 rounded-lg text-slate-400 hover:text-ssil-red hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                      title="View Live Page"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  {product.tagline && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                      {product.tagline}
                    </p>
                  )}
                </div>

                {/* Bottom Actions: Internal Models & Edit Category */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                  <Link
                    href={`${ADMIN_BASE_PATH}/products/${prodId}/designs`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold text-xs hover:bg-blue-100 transition-colors"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Internal Designs ({product.designCount || 12}+)</span>
                  </Link>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(product)}
                      className="p-2 rounded-xl text-slate-600 hover:text-ssil-red hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                      title="Edit Category Details"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setDeleteModalOpen(true);
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-zinc-800/60 text-slate-500 dark:text-zinc-400 font-extrabold uppercase border-b border-slate-200 dark:border-zinc-800">
                <tr>
                  <th className="py-3.5 px-4 w-14">#</th>
                  <th className="py-3.5 px-4">Product Name</th>
                  <th className="py-3.5 px-4">Slug Route</th>
                  <th className="py-3.5 px-4">Day / Night Visuals</th>
                  <th className="py-3.5 px-4">Internal Models</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 font-medium">
                {filteredProducts.map((product, idx) => {
                  const prodId = product._id || product.id || String(idx);
                  const displayIndex = (product.order !== undefined && product.order !== null)
                    ? product.order + 1
                    : idx + 1;
                  const numFormatted = String(displayIndex).padStart(2, "0");

                  return (
                    <tr key={prodId} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-black font-mono text-ssil-red">#{numFormatted}</td>
                      <td className="py-3.5 px-4 font-black uppercase text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span>{product.name}</span>
                          <Link href={`/products/${product.slug}`} target="_blank" className="text-slate-400 hover:text-ssil-red">
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">/products/{product.slug}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="h-9 w-9 rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-700 bg-slate-100 flex items-center justify-center">
                            <img src={product.dayImage} alt="Day" className="h-full w-full object-cover" />
                          </div>
                          {product.nightImage && (
                            <div className="h-9 w-9 rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-700 bg-slate-900 flex items-center justify-center">
                              <img src={product.nightImage} alt="Night" className="h-full w-full object-cover" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <Link
                          href={`${ADMIN_BASE_PATH}/products/${prodId}/designs`}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-100 transition-colors"
                        >
                          <Layers className="h-3.5 w-3.5" />
                          <span>Manage Designs ({product.designCount || 12}+)</span>
                        </Link>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEditModal(product)} className="p-1.5 rounded-lg text-slate-500 hover:text-ssil-red hover:bg-slate-100 dark:hover:bg-zinc-800">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button onClick={() => { setSelectedProduct(product); setDeleteModalOpen(true); }} className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800 mb-4">
              <h3 className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white">
                {selectedProduct ? "Edit Product Category" : "Add New Product Category"}
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

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Smart CCTV Camera Poles"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Route Slug (/products/[slug])</label>
                <input
                  type="text"
                  value={formState.slug}
                  onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
                  placeholder="e.g. camera-poles (auto-generated if empty)"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Tagline</label>
                <input
                  type="text"
                  value={formState.tagline}
                  onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
                  placeholder="Brief high-level description"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Engineering and specification overview"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium leading-relaxed"
                />
              </div>

              {/* Day & Night Images */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase text-slate-800 dark:text-slate-200">
                    Day &amp; Night Interactive Visuals
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">CATALOG &amp; INTERNAL SHOWCASE</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                      Daytime Visual (Default)
                    </label>
                    <div className="h-24 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-1 flex items-center justify-center mb-2 overflow-hidden">
                      <img src={formState.dayImage} alt="Day" className="max-h-full max-w-full object-cover rounded-lg" />
                    </div>
                    <label className="cursor-pointer flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700 hover:border-ssil-red bg-white dark:bg-zinc-900 text-[11px] font-bold text-slate-600 dark:text-slate-300 transition-colors">
                      {uploadingDay ? <Loader2 className="h-3.5 w-3.5 animate-spin text-ssil-red" /> : <Upload className="h-3.5 w-3.5 text-ssil-red" />}
                      <span>Upload Day Image</span>
                      <input type="file" accept="image/*" onChange={handleDayImageUpload} className="hidden" />
                    </label>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                      Nighttime Visual (Hover)
                    </label>
                    <div className="h-24 rounded-xl bg-slate-950 border border-slate-700 p-1 flex items-center justify-center mb-2 overflow-hidden">
                      <img src={formState.nightImage} alt="Night" className="max-h-full max-w-full object-cover rounded-lg" />
                    </div>
                    <label className="cursor-pointer flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700 hover:border-ssil-red bg-white dark:bg-zinc-900 text-[11px] font-bold text-slate-600 dark:text-slate-300 transition-colors">
                      {uploadingNight ? <Loader2 className="h-3.5 w-3.5 animate-spin text-ssil-red" /> : <Upload className="h-3.5 w-3.5 text-ssil-red" />}
                      <span>Upload Night Image</span>
                      <input type="file" accept="image/*" onChange={handleNightImageUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Product Page Hero Banner Photo */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-black uppercase text-ssil-red">
                    Product Page Top Hero Banner Photo (Cloudinary)
                  </label>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">FULL-BLEED BANNER</span>
                </div>

                {formState.heroImage && (
                  <div className="relative h-28 w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-700 p-1 flex items-center justify-center">
                    <img src={formState.heroImage} alt="Hero Banner Preview" className="max-h-full max-w-full object-cover rounded-lg" />
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <label className="flex-1 cursor-pointer flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-zinc-600 hover:border-ssil-red bg-white dark:bg-zinc-900 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors">
                    {uploadingHero ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-ssil-red" />
                        <span>Uploading Banner to Cloudinary...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5 text-ssil-red" />
                        <span>Upload Banner Photo</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={handleHeroImageUpload} className="hidden" />
                  </label>
                </div>

                <input
                  type="url"
                  placeholder="Or paste Cloudinary banner URL"
                  value={formState.heroImage}
                  onChange={(e) => setFormState({ ...formState, heroImage: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-[11px] font-mono text-slate-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-zinc-800">
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
                  disabled={actionLoading || uploadingDay || uploadingNight || uploadingHero}
                  className="bg-ssil-red hover:bg-ssil-red-600 text-white text-xs font-bold rounded-xl"
                >
                  {actionLoading ? "Saving..." : "Save Product Category"}
                </Button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-black uppercase text-slate-900 dark:text-white">Delete Product?</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              Are you sure you want to delete <strong>{selectedProduct.name}</strong> and all its associated designs?
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

export default function AdminProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 text-xs font-bold">Loading Products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
