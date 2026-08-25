"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, CheckCircle2, PhoneCall, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { catalogProducts, CatalogProduct, GalleryItem } from "@/data/products-catalog";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const GalleryCard = ({ item, categoryName }: { item: GalleryItem; categoryName: string }) => {
  return (
    <motion.div variants={cardVariants} className="w-full">
      <div className="group relative w-full aspect-[10/14] rounded-none overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-md hover:shadow-2xl border border-slate-200/50 dark:border-slate-800/60 bg-slate-900">
        
        {/* Primary Image */}
        <Image
          src={item.dayImage}
          alt={`${item.name} Day`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
          priority
        />

        {/* Night Image (Hover Crossfade) */}
        <Image
          src={item.nightImage || item.dayImage}
          alt={`${item.name} Night`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
        />

        {/* Ambient Red Edge Glow on Hover */}
        <div className="absolute inset-0 ring-1 ring-transparent group-hover:ring-ssil-red/40 transition-all duration-300 pointer-events-none" />

        {/* Inside Bottom Overlay Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent px-3.5 py-3 flex flex-col justify-end z-10">
          <span className="text-[10px] font-extrabold uppercase text-ssil-red tracking-wider mb-0.5">
            {categoryName}
          </span>
          
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xs sm:text-sm font-black text-white tracking-tight drop-shadow-md truncate">
              {item.name}
            </h3>

            <Link
              href="/contact"
              className="inline-flex items-center text-[10px] sm:text-[11px] font-black text-white hover:text-ssil-red transition-colors gap-0.5 shrink-0 bg-ssil-red hover:bg-ssil-red-600 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-none shadow-xs"
            >
              <span>Inquire</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const product = catalogProducts.find((p) => p.slug === slug);

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
      {/* 3. PRODUCT IMAGE GALLERY (4 PER ROW DESKTOP GRID) */}
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
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={containerVariants}
          >
            {product.galleryImages.map((item) => (
              <GalleryCard key={item.id} item={item} categoryName={product.name} />
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
              <Button asChild size="lg" className="bg-ssil-red hover:bg-ssil-red-600 font-bold px-6 text-white text-xs sm:text-sm">
                <Link href="/contact">
                  <PhoneCall className="mr-2 h-4 w-4" /> Request Technical Tender Quote
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-zinc-700 text-white hover:bg-zinc-900 font-bold px-6 text-xs sm:text-sm">
                <Link href="/contact">
                  <FileText className="mr-2 h-4 w-4" /> Download Catalogue Specs
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
