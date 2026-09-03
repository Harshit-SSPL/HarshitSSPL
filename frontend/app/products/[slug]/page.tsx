"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, CheckCircle2, PhoneCall, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { catalogProducts, CatalogProduct } from "@/data/products-catalog";
import { ProductCard } from "@/components/ui/product-card";
import { EnquiryModal } from "@/components/ui/enquiry-modal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const normalizeSlug = (s: string) => {
    if (!s) return "";
    const lower = s.toLowerCase();
    if (lower === "led-decorative-poles") return "decorative-poles";
    if (lower === "led-designer-poles") return "designer-poles";
    if (lower === "post-top-luminaries") return "post-top-illuminaries";
    if (lower === "bulkhead-pathways-luminaries") return "bulkhead-pathways";
    if (lower === "wall-washer-inground-lighting" || lower === "wall-washer-and-inground-lighting") return "wall-washer";
    return lower;
  };

  const resolvedSlug = normalizeSlug(slug);
  const fallbackProduct = catalogProducts.find(
    (p) => p.slug === slug || p.slug === resolvedSlug || p.id === slug
  );
  const [product, setProduct] = useState<CatalogProduct | undefined>(fallbackProduct);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!slug) return;
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const res = await fetch(`${apiUrl}/products/${slug}`, { signal: controller.signal });
        clearTimeout(timeoutId);

        const data = await res.json();
        if (data.success && data.product && fallbackProduct) {
          const apiProd = data.product;
          setProduct({
            ...fallbackProduct,
            ...apiProd,
            galleryImages:
              apiProd.designs && apiProd.designs.length > 0
                ? apiProd.designs.map((d: any, idx: number) => ({
                    id: d._id || d.id || `${slug}-${idx}`,
                    name: d.name,
                    dayImage: d.dayImage || fallbackProduct.galleryImages[idx % fallbackProduct.galleryImages.length]?.dayImage,
                    nightImage: d.nightImage,
                    specs: d.specs || "IP66 Weatherproof • Custom Engineering • ISO Standards",
                  }))
                : fallbackProduct.galleryImages,
          });
        }
      } catch (err) {
        // Fallback to hardcoded product
        if (fallbackProduct) setProduct(fallbackProduct);
      }
    };

    fetchProductData();
  }, [slug]);

  const [enquiryState, setEnquiryState] = useState<{
    isOpen: boolean;
    productCategory: string;
    productModel: string;
  }>({
    isOpen: false,
    productCategory: "",
    productModel: "",
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
          Product Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
          The product category you are looking for does not exist or has been relocated.
        </p>
        <Button asChild className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products Catalog
          </Link>
        </Button>
      </div>
    );
  }

  const openEnquiry = (modelName: string) => {
    setEnquiryState({
      isOpen: true,
      productCategory: product.name,
      productModel: modelName,
    });
  };

  const closeEnquiry = () => {
    setEnquiryState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* ============================================================ */}
      {/* 1. PRODUCT HERO BANNER */}
      {/* ============================================================ */}
      <section className="relative z-10 w-full h-[54vh] sm:h-[62vh] max-h-[540px] flex items-end overflow-hidden rounded-none pt-24 pb-10 sm:pb-12">
        
        {/* Full-bleed Background Image */}
        <Image
          src={product.heroImage || "/products/products-hero.png"}
          alt={`${product.name} SSIL Hero`}
          fill
          priority
          className="object-cover object-center rounded-none"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20 rounded-none pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 text-left flex flex-col items-start">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-3">
            <Link href="/products" className="hover:text-ssil-red transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-ssil-red" />
            <span className="text-ssil-red">{product.name}</span>
          </div>

          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-1">
            SSIL LUMINAIRES &amp; POLES
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight max-w-4xl drop-shadow-md">
            {product.name}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-200 font-medium max-w-2xl leading-relaxed drop-shadow-xs">
            {product.tagline}
          </p>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PRODUCT OVERVIEW STRIP */}
      {/* ============================================================ */}
      <section className="relative z-10 py-10 bg-slate-50 dark:bg-zinc-950 border-b border-slate-200/80 dark:border-zinc-800/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Description Narrative */}
            <div className="max-w-3xl">
              <h2 className="text-xs font-black uppercase tracking-widest text-ssil-red mb-2">
                ENGINEERING &amp; APPLICATION OVERVIEW
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quick Specs Badges */}
            <div className="grid grid-cols-2 gap-3 shrink-0 lg:max-w-md w-full">
              <div className="flex items-center gap-2.5 p-3 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">ISO 9001:2015 Quality</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">IP66 Weather Protection</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Custom Engineering</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-none bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Hot-Dip Galvanized</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. PRODUCT IMAGE GALLERY */}
      {/* ============================================================ */}
      <section className="relative z-10 py-14 sm:py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Gallery Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-200 dark:border-zinc-800 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1">
                PRODUCT CATALOGUE &amp; DESIGNS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                Available Designs ({product.galleryImages.length})
              </h2>
            </div>
            
            <span className="text-xs font-bold text-ssil-red uppercase tracking-wider bg-ssil-red/10 border border-ssil-red/20 px-3 py-1.5 rounded-none self-start sm:self-auto">
              {product.galleryImages.length} Available Models
            </span>
          </div>

          {/* 4 Images per Row Desktop Grid */}
          <motion.div
            className="w-full flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:gap-3.5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={containerVariants}
          >
            {product.galleryImages.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-2.625rem)/4)] flex"
              >
                <ProductCard
                  name={item.name}
                  dayImage={item.dayImage}
                  buttonText="Enquire Now"
                  showArrow={true}
                  enableImageCrossfade={false}
                  onEnquire={openEnquiry}
                />
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. CALL TO ACTION SECTION */}
      {/* ============================================================ */}
      <section className="relative z-10 py-16 bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          
          <span className="text-xs font-black uppercase tracking-widest text-ssil-red block mb-3">
            NEED A CUSTOM SPECIFICATION?
          </span>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase mb-4 text-white">
            Looking for Custom {product.name} Engineering?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
            Our engineering team designs custom structural calculations, photometric layouts, and tender-compliant manufacturing drawings tailored for your project requirements.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button
              onClick={() => openEnquiry("Custom Specification Request")}
              className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-none shadow-lg w-full sm:w-auto"
            >
              <FileText className="mr-2 h-4 w-4" /> Request Technical Tender Specs
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 font-bold text-xs sm:text-sm px-6 py-3 rounded-none w-full sm:w-auto"
            >
              <Link href="/contact">
                <PhoneCall className="mr-2 h-4 w-4 text-ssil-red" /> Speak with Lighting Engineer
              </Link>
            </Button>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. ENQUIRY MODAL POPUP */}
      {/* ============================================================ */}
      <EnquiryModal
        isOpen={enquiryState.isOpen}
        onClose={closeEnquiry}
        productCategory={enquiryState.productCategory}
        productModel={enquiryState.productModel}
      />

    </div>
  );
}
