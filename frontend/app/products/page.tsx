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
      {/* Product Image Frame with Fixed 10:15 Aspect Ratio & Zero Outer Padding / Borders */}
      <div className="relative w-full aspect-[10/15] rounded-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 shadow-sm group-hover:shadow-md">
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

        {/* Ambient Red Glow Highlight on Hover */}
        <div className="absolute inset-0 ring-1 ring-transparent group-hover:ring-ssil-red/30 transition-all duration-300 pointer-events-none" />
      </div>

      {/* Product Name Below Image */}
      <h3 className="mt-3 text-center text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-ssil-red transition-colors duration-300 leading-snug">
        {product.name}
      </h3>
    </motion.div>
  );
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white pt-24 sm:pt-28 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        
        {/* 1. TOP HERO BANNER IMAGE (ATTACHED WORLD STREET NIGHT LIGHTING INSTALLATION) */}
        <div className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-zinc-800 mb-12 sm:mb-16">
          <img
            src="/products/products-hero.png"
            alt="SSIL World Street Night Lighting Installation"
            className="w-full h-auto max-h-[500px] object-cover object-center"
            loading="eager"
          />
        </div>

        {/* 2. SECTION TITLE & DESCRIPTION BELOW HERO IMAGE */}
        <div className="text-left max-w-5xl mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-ssil-red tracking-tight mb-4">
            OUR PRODUCTS
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
            Shiv Shakti India Limited (SSIL) manufactures and supplies complete commercial, municipal, and highway outdoor lighting systems across India. Explore our featured lighting solutions engineered for architectural spaces, urban infrastructure, and commercial developments.
          </p>
        </div>

        {/* 3. FEATURED PRODUCTS GRID WITH DAY/NIGHT HOVER CROSSFADE */}
        <div className="mb-8">
          <motion.div
            className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
