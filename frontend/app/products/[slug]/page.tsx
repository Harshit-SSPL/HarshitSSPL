"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, CheckCircle2, PhoneCall, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { catalogProducts } from "@/data/products-catalog";
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

  const product = catalogProducts.find((p) => p.slug === slug);

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
      {/* 1. PRODUCT HERO BANNER (EXTREME LEFT ALIGNED TEXT & TAGLINE) */}
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

          {/* Product Headline */}
          <h1 className="text-[24px] sm:text-[36px] md:text-[44px] font-black text-white tracking-tight leading-snug drop-shadow-md max-w-3xl">
            {product.name}
          </h1>

          {/* Product Specific Tagline */}
          <p className="mt-2 text-sm sm:text-base md:text-lg text-slate-200 font-semibold max-w-2xl leading-relaxed drop-shadow-xs">
            {product.tagline}
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PRODUCT INTRODUCTION & SPECIFICATIONS HIGHLIGHTS */}
      {/* ============================================================ */}
      <section className="relative z-10 py-12 sm:py-16 bg-slate-50 dark:bg-zinc-950/60 border-b border-slate-200/80 dark:border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Introduction Copy */}
            <div className="max-w-3xl border-l-[5px] border-ssil-red pl-4 sm:pl-6">
              <span className="text-xs font-black uppercase tracking-widest text-ssil-red block mb-1.5">
                PRODUCT CATEGORY OVERVIEW
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
                {product.name}
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
      {/* 3. PRODUCT IMAGE GALLERY (SAME 4 PER ROW DESKTOP GRID & ENQUIRY MODAL TRIGGER) */}
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

          {/* 4 Images per Row Desktop Grid (Clicking Enquire Now opens glassmorphic EnquiryModal) */}
          <motion.div
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-3.5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={containerVariants}
          >
            {product.galleryImages.map((item) => (
              <ProductCard
                key={item.id}
                name={item.name}
                dayImage={item.dayImage}
                buttonText="Enquire Now"
                showArrow={true}
                enableImageCrossfade={false}
                onEnquire={(modelName) => openEnquiry(modelName)}
              />
            ))}
          </motion.div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. B2B ENGINEERING INQUIRY CTA SECTION */}
      {/* ============================================================ */}
      <section className="relative z-10 py-12 bg-black text-white border-t border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 bg-zinc-950 border border-zinc-800 rounded-none">
            
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-ssil-red block mb-1">
                CUSTOM TENDER &amp; PROJECT SPECIFICATIONS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Need Custom Structural Engineering for {product.name}?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-normal leading-relaxed">
                Contact our engineering team for technical photometrics, structural calculations, tender drawings, and customized manufacturing.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button
                onClick={() => openEnquiry(`${product.name} (Tender Quote)`)}
                size="lg"
                className="bg-ssil-red hover:bg-ssil-red-600 font-bold px-6 text-white text-xs sm:text-sm rounded-none"
              >
                <PhoneCall className="mr-2 h-4 w-4" /> Request Technical Tender Quote
              </Button>
              <Button
                onClick={() => openEnquiry(`${product.name} (Master Specs)`)}
                size="lg"
                className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-500 font-bold px-6 text-xs sm:text-sm transition-all duration-200 rounded-none"
              >
                <FileText className="mr-2 h-4 w-4 text-ssil-red" /> Download Catalogue Specs
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* Glassmorphic Enquiry Modal with pre-filled Product Category & Product Model ID */}
      <EnquiryModal
        isOpen={enquiryState.isOpen}
        onClose={closeEnquiry}
        productCategory={enquiryState.productCategory}
        productModel={enquiryState.productModel}
      />

    </div>
  );
}
