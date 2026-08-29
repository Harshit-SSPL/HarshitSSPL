"use client";

import React from "react";
import { motion } from "framer-motion";
import { catalogProducts } from "@/data/products-catalog";
import { ProductCard } from "@/components/ui/product-card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export default function ProductsPage() {
  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
      {/* ============================================================ */}
      {/* 1. FULL-BLEED HERO BANNER (EXTREME LEFT ALIGNED TEXT, RED HIGHLIGHT WORD) */}
      {/* ============================================================ */}
      <section className="relative z-10 w-full h-[52vh] sm:h-[60vh] max-h-[500px] flex items-end overflow-hidden rounded-none pt-24 pb-10 sm:pb-12">
        
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
      {/* 2. OUR PRODUCTS SECTION (CLEAN WHITE/BLACK BACKGROUND, 18 OFFICIAL PRODUCTS) */}
      {/* ============================================================ */}
      <section className="relative z-10 py-14 sm:py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Left Slide-In Animated Header */}
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
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 mt-2.5 leading-relaxed font-medium">
              Shiv Shakti India Limited (SSIL) manufactures and supplies complete commercial, municipal, and highway outdoor lighting systems engineered for public landmarks and urban infrastructure across India.
            </p>
          </motion.div>

          {/* 18 Official Catalog Products Grid (Linking to /products/[slug]) with Automatic Centering for Incomplete Rows */}
          <div className="mb-8">
            <motion.div
              className="w-full flex flex-wrap justify-center gap-2.5 sm:gap-3 lg:gap-3.5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={containerVariants}
            >
              {catalogProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-full sm:w-[calc((100%-0.75rem)/2)] lg:w-[calc((100%-2.625rem)/4)] flex"
                >
                  <ProductCard
                    name={product.name}
                    dayImage={product.dayImage}
                    nightImage={product.nightImage}
                    href={`/products/${product.slug}`}
                    buttonText="View All"
                    showArrow={true}
                  />
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}
