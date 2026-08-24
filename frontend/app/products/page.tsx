"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowDown } from "lucide-react";
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
  const scrollToCatalog = () => {
    const catalogElement = document.getElementById("our-products-section");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* ============================================================ */}
      {/* 1. FULL-BLEED HERO BANNER SECTION (STARTING AT NAVBAR, 0 BORDER-RADIUS) */}
      {/* ============================================================ */}
      <section className="relative w-full min-h-[70vh] sm:min-h-[82vh] flex items-center justify-center overflow-hidden rounded-none pt-24 sm:pt-32 pb-16 sm:pb-20">
        
        {/* Full-bleed Background Image */}
        <img
          src="/products/products-hero.png"
          alt="SSIL World Street Night Lighting Installation"
          className="absolute inset-0 w-full h-full object-cover object-center rounded-none"
          loading="eager"
        />

        {/* Dark Overlay Gradient for High Contrast Typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/50 rounded-none pointer-events-none" />

        {/* Overlay Hero Typography Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl text-center flex flex-col items-center">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-3 bg-red-950/40 px-4 py-1.5 rounded-full border border-ssil-red/30 backdrop-blur-md">
            SSIL INDUSTRIAL &amp; MUNICIPAL LIGHTING
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] drop-shadow-lg max-w-4xl">
            High-Performance Infrastructure &amp; Architectural Luminaires
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-slate-200 font-medium max-w-3xl leading-relaxed drop-shadow-md">
            Engineered for long-lasting durability, energy efficiency, and high lumen output across national highways, expressways, urban plazas, and commercial developments.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={scrollToCatalog}
              size="lg"
              className="h-12 rounded-full pl-6 pr-5 text-base font-extrabold bg-ssil-red hover:bg-red-700 text-white shadow-xl shadow-red-900/30 border-0 cursor-pointer"
            >
              <span>Explore Products</span>
              <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full px-6 text-base font-extrabold text-white border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-md"
            >
              <Link href="/contact">
                <span>Contact Engineers</span>
                <ChevronRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. OUR PRODUCTS SECTION (TITLE + 2-LINE DESCRIPTION + 6 CARDS) */}
      {/* ============================================================ */}
      <section id="our-products-section" className="py-16 sm:py-24 bg-white dark:bg-black transition-colors">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          
          {/* Section Header */}
          <div className="text-left max-w-5xl mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-ssil-red tracking-tight mb-4">
              OUR PRODUCTS
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
              Shiv Shakti India Limited (SSIL) manufactures and supplies complete commercial, municipal, and highway outdoor lighting systems across India. Explore our featured lighting solutions engineered for architectural spaces, urban infrastructure, and commercial developments.
            </p>
          </div>

          {/* Featured 6 Products Grid (Day/Night Hover Crossfade) */}
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
