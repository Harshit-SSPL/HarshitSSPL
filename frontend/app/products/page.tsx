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
      {/* Pure Floating Image Frame (NO Box Container Div, NO Inner Background, NO Borders) */}
      <div className="group relative w-full aspect-[10/13] rounded-xl sm:rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1.5 cursor-pointer">
        
        {/* Day Image (Default Mode) */}
        <Image
          src={product.dayImage}
          alt={`${product.name} Daytime`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain object-center pb-8 opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
          priority
        />

        {/* Night Image (Hover Crossfade Mode) */}
        <Image
          src={product.nightImage}
          alt={`${product.name} Nighttime`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain object-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
        />

        {/* Floating Product Name & View All Button directly on image artwork */}
        <div className="absolute bottom-1 inset-x-0 px-2 py-1 flex items-center justify-between pointer-events-auto z-10">
          {/* Left Side: Product Name */}
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-ssil-red transition-colors duration-300">
            {product.name}
          </h3>

          {/* Right Side: View All Button */}
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
    <div className="min-h-screen bg-gradient-to-b from-white via-red-100/40 to-white dark:from-black dark:via-red-950/30 dark:to-black text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* ============================================================ */}
      {/* 1. FULL-BLEED HERO BANNER (EXTREME LEFT ALIGNED TEXT, RED HIGHLIGHT WORD) */}
      {/* ============================================================ */}
      <section className="relative w-full h-[52vh] sm:h-[60vh] max-h-[500px] flex items-end overflow-hidden rounded-none pt-24 pb-10 sm:pb-12">
        
        {/* Full-bleed Background Image */}
        <img
          src="/products/products-hero.png"
          alt="SSIL World Street Night Lighting Installation"
          className="absolute inset-0 w-full h-full object-cover object-center rounded-none"
          loading="eager"
        />

        {/* Glass Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent rounded-none pointer-events-none" />

        {/* Extreme Left Hero Content (No Left Offset) */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 text-left flex flex-col items-start">
          <h1 className="text-[20px] sm:text-[30px] md:text-[36px] font-black text-white tracking-tight leading-snug drop-shadow-md max-w-2xl">
            Engineered Lighting for <span className="text-ssil-red">Modern</span> Infrastructure
          </h1>

          <p className="mt-2 text-xs sm:text-[13px] text-slate-200 font-medium max-w-xl leading-relaxed drop-shadow-xs">
            SSIL designs and delivers customized lighting systems for highways, urban infrastructure, commercial developments, architectural spaces, and large-scale projects.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. OUR PRODUCTS SECTION (WHITE & RED LIGHT GRADIENT, BLACK & RED DARK GRADIENT) */}
      {/* ============================================================ */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Left Slide-In Animated Header (Triggers whenever scrolled into view from top or bottom) */}
          <motion.div
            className="text-left max-w-4xl mb-10 sm:mb-12 border-l-[5px] border-ssil-red pl-4 sm:pl-5"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
              OUR PRODUCTS
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed font-normal">
              Shiv Shakti India Limited (SSIL) manufactures and supplies complete commercial, municipal, and highway outdoor lighting systems engineered for public landmarks and urban infrastructure across India.
            </p>
          </motion.div>

          {/* 6 Products Grid (Pure Floating Images, No Box Divs) */}
          <div className="mb-8">
            <motion.div
              className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
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
