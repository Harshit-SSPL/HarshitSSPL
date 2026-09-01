"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchApi, uploadImageFile } from "@/lib/admin-api";
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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [uploadingDay, setUploadingDay] = useState(false);
  const [uploadingNight, setUploadingNight] = useState(false);
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
    dayImage: "/images/products/homepage/product-01/day.png",
    nightImage: "/images/products/homepage/product-01/night.png",
    heroImage: "/products/products-hero.png",
    active: true,
  });

  const loadProducts = async () => {
    try {
      const res = await fetchApi("/products/admin/all");
      if (res.success && Array.isArray(res.products) && res.products.length > 0) {
        setProducts(res.products);
      } else {
        // Fallback to local catalog
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

  const openAddModal = () => {
    setSelectedProduct(null);
    setFormState({
      name: "",
      slug: "",
      tagline: "",
      description: "",
      dayImage: "/images/products/homepage/product-01/day.png",
      nightImage: "/images/products/homepage/product-01/night.png",
      heroImage: "/products/products-hero.png",
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
      dayImage: product.dayImage,
      nightImage: product.nightImage || "",
      heroImage: product.heroImage || "/products/products-hero.png",
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
      setErrorMsg(err.message || "Failed to upload night image.");
    } finally {
      setUploadingNight(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg(null);

    // Auto-generate slug if blank
    const cleanSlug = formState.slug
      ? formState.slug.toLowerCase().trim()
      : formState.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const payload = {
      ...formState,
      slug: cleanSlug,
    };

    try {
      if (selectedProduct?._id && selectedProduct._id.length > 10) {
        const res = await fetchApi(`/products/${selectedProduct._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        if (res.success) {
          setSuccessMsg(`Product "${payload.name}" updated successfully!`);
        }
      } else {
        const res = await fetchApi("/products", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (res.success) {
          setSuccessMsg(`Product "${payload.name}" created successfully!`);
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
        setSuccessMsg("Product and associated design variants deleted successfully.");
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

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-ssil-red animate-spin mb-3" />
        <span className="text-xs font-bold text-slate-500 uppercase">Loading Products Catalog...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-ssil-red block mb-1">
            PRODUCTS CMS
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Products Master Catalog
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage all 18+ official product categories, day/night image assets, and individual model designs.
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Products Table */}
      <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white text-[11px] font-extrabold uppercase tracking-wider border-b border-slate-800">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4 w-16">Preview</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Route Slug</th>
                <th className="py-3 px-4 text-center">Designs</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 font-medium text-slate-800 dark:text-slate-200">
              {products.map((product, idx) => (
                <tr
                  key={product._id || product.id || idx}
                  className="hover:bg-slate-50 dark:hover:bg-zinc-800/60 transition-colors"
                >
                  <td className="py-3 px-4 text-center font-bold text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="h-10 w-10 rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
                      <img
                        src={product.dayImage}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-black text-slate-900 dark:text-white uppercase tracking-tight text-xs sm:text-sm">
                      {product.name}
                    </div>
                    <span className="text-[11px] text-slate-500 line-clamp-1 max-w-sm">
                      {product.tagline || product.description}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                    /products/{product.slug}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600">
                      {product.designCount || 0} Models
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4 text-end space-x-1">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="text-[11px] font-bold h-7 px-2.5 rounded-lg border-slate-200 dark:border-zinc-700 hover:bg-ssil-red hover:text-white hover:border-ssil-red transition-all"
                    >
                      <Link href={`/admin/products/${product._id || product.slug}/designs`}>
                        <Layers className="mr-1 h-3.5 w-3.5" />
                        Manage Designs
                      </Link>
                    </Button>

                    <button
                      onClick={() => openEditModal(product)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-ssil-red hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setDeleteModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800 mb-4">
              <h3 className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white">
                {selectedProduct ? "Edit Product Details" : "Add New Product Category"}
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

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Product Category Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Smart Solar Lighting"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Route Slug</label>
                <input
                  type="text"
                  value={formState.slug}
                  onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
                  placeholder="e.g. smart-solar-lighting"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Tagline</label>
                <input
                  type="text"
                  value={formState.tagline}
                  onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
                  placeholder="e.g. Autonomous high-lumen solar illumination for expressways."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium"
                />
              </div>

              {/* Day Image Upload */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Daytime Product Image</label>
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-zinc-800 border shrink-0">
                    <img src={formState.dayImage} alt="Day" className="h-full w-full object-cover" />
                  </div>
                  <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700 hover:border-ssil-red bg-slate-50 dark:bg-zinc-800 text-xs font-bold">
                    {uploadingDay ? <Loader2 className="h-3.5 w-3.5 animate-spin text-ssil-red" /> : <Upload className="h-3.5 w-3.5 text-ssil-red" />}
                    <span>Upload Daytime Image</span>
                    <input type="file" accept="image/*" onChange={handleDayImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Night Image Upload */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Nighttime Glow Image (Hover)</label>
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-xl overflow-hidden bg-slate-950 border shrink-0">
                    <img src={formState.nightImage} alt="Night" className="h-full w-full object-cover" />
                  </div>
                  <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700 hover:border-ssil-red bg-slate-50 dark:bg-zinc-800 text-xs font-bold">
                    {uploadingNight ? <Loader2 className="h-3.5 w-3.5 animate-spin text-ssil-red" /> : <Upload className="h-3.5 w-3.5 text-ssil-red" />}
                    <span>Upload Night Image</span>
                    <input type="file" accept="image/*" onChange={handleNightImageUpload} className="hidden" />
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
                  disabled={actionLoading || uploadingDay || uploadingNight}
                  className="bg-ssil-red hover:bg-ssil-red-600 text-white text-xs font-bold rounded-xl"
                >
                  {actionLoading ? "Saving..." : "Save Product"}
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
            <h3 className="text-base font-black uppercase text-slate-900 dark:text-white">Delete Product Category?</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-5">
              Are you sure you want to remove <strong>{selectedProduct.name}</strong> and all of its associated design variants?
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
