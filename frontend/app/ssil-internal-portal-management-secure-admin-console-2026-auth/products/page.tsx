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
      dayImage: product.dayImage || "/images/products/homepage/product-01/day.png",
      nightImage: product.nightImage || "/images/products/homepage/product-01/night.png",
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
      setErrorMsg(err.message || "Failed to upload nighttime image.");
    } finally {
      setUploadingNight(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setErrorMsg(null);

    try {
      // Auto-generate slug if empty
      const slugVal = formState.slug || formState.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const payload = { ...formState, slug: slugVal };

      if (selectedProduct?._id && selectedProduct._id.length > 10) {
        // Update existing
        const res = await fetchApi(`/products/${selectedProduct._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        if (res.success) {
          setSuccessMsg(`Product "${formState.name}" updated successfully!`);
        }
      } else {
        // Create new
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

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-ssil-red animate-spin mb-3" />
        <span className="text-xs font-bold text-slate-500 uppercase">Loading Products Master...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-ssil-red block mb-1">
            CATALOGUE MASTER CMS
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Products &amp; Solutions Manager
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage all 18 product categories, route slugs, daytime &amp; nighttime imagery, and design models.
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2 self-start sm:self-auto"
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

      {/* Products Table */}
      <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-zinc-800/60 text-slate-500 dark:text-zinc-400 font-extrabold uppercase border-b border-slate-200 dark:border-zinc-800">
              <tr>
                <th className="py-3.5 px-4 w-12">#</th>
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Slug Route</th>
                <th className="py-3.5 px-4">Day / Night Images</th>
                <th className="py-3.5 px-4">Designs</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 font-medium">
              {products.map((product, idx) => {
                const prodId = product._id || product.id || String(idx);
                return (
                  <tr key={prodId} className="hover:bg-slate-50/80 dark:hover:bg-zinc-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-400">
                      {idx + 1}
                    </td>

                    <td className="py-3.5 px-4 font-black uppercase text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <span>{product.name}</span>
                        <Link
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="text-slate-400 hover:text-ssil-red"
                          title="View Live Page"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      /products/{product.slug}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 rounded-lg overflow-hidden border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
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
                        <span>Manage Designs</span>
                      </Link>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-ssil-red hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                          title="Edit Category"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setDeleteModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                          title="Delete Category"
                        >
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
              <div className="grid grid-cols-2 gap-3 pt-2">
                
                {/* Daytime Image */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Daytime Image (Cloudinary)</label>
                  <div className="h-20 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 p-2 flex items-center justify-center mb-2 overflow-hidden">
                    <img src={formState.dayImage} alt="Day" className="max-h-full max-w-full object-cover" />
                  </div>
                  <label className="cursor-pointer flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700 hover:border-ssil-red bg-slate-50 dark:bg-zinc-800 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    {uploadingDay ? <Loader2 className="h-3.5 w-3.5 animate-spin text-ssil-red" /> : <Upload className="h-3.5 w-3.5 text-ssil-red" />}
                    <span>Upload Day Image</span>
                    <input type="file" accept="image/*" onChange={handleDayImageUpload} className="hidden" />
                  </label>
                </div>

                {/* Nighttime Image */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Nighttime Image (Cloudinary)</label>
                  <div className="h-20 rounded-xl bg-slate-900 border border-slate-700 p-2 flex items-center justify-center mb-2 overflow-hidden">
                    <img src={formState.nightImage} alt="Night" className="max-h-full max-w-full object-cover" />
                  </div>
                  <label className="cursor-pointer flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700 hover:border-ssil-red bg-slate-50 dark:bg-zinc-800 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                    {uploadingNight ? <Loader2 className="h-3.5 w-3.5 animate-spin text-ssil-red" /> : <Upload className="h-3.5 w-3.5 text-ssil-red" />}
                    <span>Upload Night Image</span>
                    <input type="file" accept="image/*" onChange={handleNightImageUpload} className="hidden" />
                  </label>
                </div>

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
                  disabled={actionLoading || uploadingDay || uploadingNight}
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
