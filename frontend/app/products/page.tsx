"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
  hidden: { y: 16, opacity: 0 },
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
    <motion.div variants={cardVariants} className="group flex flex-col w-full">
      {/* Clean Product Image Frame (Zero Border Radius, Zero Glow/Shadows) */}
      <div className="relative w-full aspect-[10/15] rounded-none overflow-hidden transition-all duration-300 group-hover:-translate-y-1">
        {/* Day Image (Default Mode) */}
        <Image
          src={product.dayImage}
          alt={`${product.name} Daytime`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain object-center opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
          priority
        />

        {/* Night Image (Hover Crossfade Mode) */}
        <Image
          src={product.nightImage}
          alt={`${product.name} Nighttime`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
        />
      </div>

      {/* Product Name Below Image */}
      <h3 className="mt-3 text-center text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-ssil-red transition-colors duration-300 leading-snug">
        {product.name}
      </h3>
    </motion.div>
  );
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* ============================================================ */}
      {/* 1. SHORT FULL-BLEED HERO BANNER (LEFT-ALIGNED MINIMAL TEXT, NO BUTTONS, NO TAGS) */}
      {/* ============================================================ */}
      <section className="relative w-full h-[32vh] sm:h-[40vh] max-h-[340px] flex items-end overflow-hidden rounded-none pt-20 pb-8 sm:pb-10">
        
        {/* Full-bleed Background Image */}
        <img
          src="/products/products-hero.png"
          alt="SSIL World Street Night Lighting Installation"
          className="absolute inset-0 w-full h-full object-cover object-center rounded-none"
          loading="eager"
        />

        {/* Subtle Gradient Overlay for Clean Left Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent rounded-none pointer-events-none" />

        {/* Left-Aligned Minimal Overlay Typography (No Red Tag, No Buttons) */}
        <div className="relative z-10 container mx-auto px-6 sm:px-10 lg:px-12 max-w-7xl text-left flex flex-col items-start">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug drop-shadow-md max-w-2xl">
            Infrastructure &amp; Architectural Luminaires
          </h1>

          <p className="mt-1.5 text-xs sm:text-sm text-slate-300 font-medium max-w-xl leading-relaxed drop-shadow-xs">
            Engineered for high performance, long-lasting durability, and energy efficiency.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. OUR PRODUCTS SECTION (DISTINCT SERIF TYPOGRAPHY, NO GLOW/SHADOW) */}
      {/* ============================================================ */}
      <section className="py-14 sm:py-20 bg-white dark:bg-black transition-colors">
        <div className="container mx-auto px-6 sm:px-10 lg:px-12 max-w-7xl">
          
          {/* Section Header with Distinct Editorial Serif Typography & Red Left Accent Line */}
          <div className="text-left max-w-4xl mb-12 sm:mb-14 border-l-4 border-ssil-red pl-4 sm:pl-6">
            <h2 className="text-2xl sm:text-4xl font-bold font-serif uppercase tracking-widest text-slate-900 dark:text-white">
              OUR PRODUCTS
            </h2>
            <p className="text-sm sm:text-base font-serif italic text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
              Shiv Shakti India Limited (SSIL) manufactures and supplies complete commercial, municipal, and highway outdoor lighting systems engineered for public landmarks and urban infrastructure across India.
            </p>
          </div>

          {/* 6 Featured Products Grid (Day/Night Hover Crossfade) */}
          <div className="mb-8">
            <motion.div
              className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
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
