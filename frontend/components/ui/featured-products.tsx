"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredProducts, FeaturedProduct } from "@/data/featured-products";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const ProductCard = ({ product }: { product: FeaturedProduct }) => {
  return (
    <motion.div variants={cardVariants} className="group flex flex-col">
      {/* Product Image Container with Day/Night Crossfade */}
      <div className="relative h-72 sm:h-80 w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-ssil-red/50 group-hover:shadow-[0_16px_36px_-8px_rgba(229,62,62,0.25)]">
        {/* Day Image (Default) */}
        <Image
          src={product.dayImage}
          alt={`${product.name} Daytime`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
          priority
        />

        {/* Night Image (Hover Crossfade) */}
        <Image
          src={product.nightImage}
          alt={`${product.name} Nighttime`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
        />

        {/* Subtle Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Product Name Below Card */}
      <h3 className="mt-4 text-center text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-ssil-red transition-colors duration-300">
        {product.name}
      </h3>
    </motion.div>
  );
};

export const FeaturedProducts = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/80 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-ssil-red block mb-2.5">
            OUR PRODUCTS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Featured Lighting Solutions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-3.5 leading-relaxed font-normal">
            Explore selected SSIL lighting solutions engineered for architectural spaces, urban infrastructure, commercial developments, and large-scale projects.
          </p>
        </motion.div>

        {/* 6 Featured Products Grid */}
        <motion.div
          className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* Single Centered CTA Button Below Grid */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button asChild size="lg" className="bg-ssil-red hover:bg-ssil-red-600 font-bold px-8 shadow-md text-white">
            <Link href="/products">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
};
