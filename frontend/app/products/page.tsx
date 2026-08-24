"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { featuredProducts, FeaturedProduct } from "@/data/featured-products";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const ProductCard = ({ product }: { product: FeaturedProduct }) => {
  return (
    <motion.div variants={cardVariants} className="w-full">
      {/* Product Container Card with Rounded Border Radius */}
      <div className="group bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-ssil-red/60 hover:shadow-lg">
        
        {/* Slightly Smaller Image Frame with Rounded Radius (rounded-xl) */}
        <div className="relative w-full aspect-[10/13] rounded-xl overflow-hidden bg-white dark:bg-slate-950 transition-transform duration-300 group-hover:-translate-y-1">
          {/* Day Image (Default Mode) */}
          <Image
            src={product.dayImage}
            alt={`${product.name} Daytime`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain object-center p-3 opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
            priority
          />

          {/* Night Image (Hover Crossfade Mode) */}
          <Image
            src={product.nightImage}
            alt={`${product.name} Nighttime`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain object-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
          />
        </div>

        {/* Bottom Bar: Product Name on Left + View All Button on Right */}
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
          {/* Left Side: Product Name */}
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-ssil-red transition-colors duration-300">
            {product.name}
          </h3>

          {/* Right Side: Small View All Button */}
          <Link
            href="/contact"
            className="inline-flex items-center text-xs font-extrabold text-ssil-red hover:text-red-700 dark:hover:text-red-400 transition-colors gap-0.5 shrink-0"
          >
            <span>View All</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </motion.div>
  );
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* ============================================================ */}
      {/* 1. FULL-BLEED HERO BANNER (BALANCED GOLDEN MIDDLE HEIGHT) */}
      {/* ============================================================ */}
      <section className="relative w-full h-[46vh] sm:h-[54vh] max-h-[460px] flex items-end overflow-hidden rounded-none pt-24 pb-10 sm:pb-12">
        
        {/* Full-bleed Background Image */}
        <img
          src="/products/products-hero.png"
          alt="SSIL World Street Night Lighting Installation"
          className="absolute inset-0 w-full h-full object-cover object-center rounded-none"
          loading="eager"
        />

        {/* Glass Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-transparent rounded-none pointer-events-none" />

        {/* Left-Aligned Minimal Hero Content */}
        <div className="relative z-10 container mx-auto px-6 sm:px-10 lg:px-12 max-w-7xl text-left flex flex-col items-start">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-snug drop-shadow-md max-w-3xl">
            Infrastructure &amp; Architectural Luminaires
          </h1>

          <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-200 font-medium max-w-2xl leading-relaxed drop-shadow-xs">
            Engineered for high performance, long-lasting durability, and energy efficiency across municipal roads, expressways, and commercial plazas.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. OUR PRODUCTS SECTION WITH LEFT SLIDE-IN ANIMATION */}
      {/* ============================================================ */}
      <section className="py-14 sm:py-20 bg-white dark:bg-black transition-colors">
        <div className="container mx-auto px-6 sm:px-10 lg:px-12 max-w-7xl">
          
          {/* Left Slide-In Animated Header */}
          <motion.div
            className="text-left max-w-4xl mb-12 sm:mb-14"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-2">
              SSIL CATALOGUE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              OUR PRODUCTS
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-3 leading-relaxed font-normal">
              Shiv Shakti India Limited (SSIL) manufactures and supplies complete commercial, municipal, and highway outdoor lighting systems engineered for public landmarks and urban infrastructure across India.
            </p>
          </motion.div>

          {/* 6 Products Container Grid */}
          <div className="mb-8">
            <motion.div
              className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
            >
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}
