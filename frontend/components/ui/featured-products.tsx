"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredProducts as defaultFeatured, FeaturedProduct } from "@/data/featured-products";
import { fetchApi } from "@/lib/admin-api";
import { NEUTRAL_PRODUCT_PLACEHOLDER } from "@/lib/placeholders";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

const ProductCard = ({ product }: { product: FeaturedProduct }) => {
  const productHref = product.slug ? `/products/${product.slug}` : "/products";
  const daySrc = product.dayImage || NEUTRAL_PRODUCT_PLACEHOLDER;
  const nightSrc = product.nightImage || daySrc;

  return (
    <motion.div variants={cardVariants} className="group flex flex-col w-full">
      <Link href={productHref} className="block w-full">
        {/* Product Image Frame (10:15 / 2:3 ratio matching exact 1024x1536 image dimensions) */}
        <div className="relative w-full aspect-[10/15] rounded-none overflow-hidden bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-ssil-red shadow-sm group-hover:shadow-lg">
          {/* Day Image */}
          <img
            src={daySrc}
            alt={`${product.name} Daytime`}
            className="w-full h-full object-cover object-center opacity-100 group-hover:opacity-0 transition-opacity duration-500 ease-in-out"
            loading="lazy"
            decoding="async"
          />

          {/* Night Image */}
          <img
            src={nightSrc}
            alt={`${product.name} Nighttime`}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none"
            loading="lazy"
            decoding="async"
          />

          {/* Subtle Ambient Red Glow Highlight on Hover */}
          <div className="absolute inset-0 ring-1 ring-transparent group-hover:ring-ssil-red/30 transition-all duration-300 pointer-events-none" />
        </div>

        {/* Product Name Below Image */}
        <h3 className="mt-3 text-center text-sm sm:text-base font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-ssil-red transition-colors duration-300 leading-snug">
          {product.name}
        </h3>
      </Link>
    </motion.div>
  );
};

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<FeaturedProduct[]>(defaultFeatured.slice(0, 6));

  useEffect(() => {
    let isMounted = true;
    const fetchFeatured = async () => {
      try {
        const data = await fetchApi("/home/featured");
        if (isMounted && data.success && Array.isArray(data.products) && data.products.length > 0) {
          const mapped: FeaturedProduct[] = data.products.map((p: any) => ({
            id: p._id || p.id,
            name: p.name,
            dayImage: p.dayImage || NEUTRAL_PRODUCT_PLACEHOLDER,
            nightImage: p.nightImage || p.dayImage || NEUTRAL_PRODUCT_PLACEHOLDER,
            category: p.category,
            tagline: p.tagline,
            slug: p.slug,
          }));
          setProducts(mapped.slice(0, 6));
        }
      } catch (err) {
        // Fallback to static defaults
      }
    };

    fetchFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/80 transition-colors overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
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

        {/* 6 Featured Products Grid (2 Rows x 3 Columns) */}
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 sm:gap-x-4 lg:gap-x-6 gap-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
        >
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id || product.name} product={product} />
          ))}
        </motion.div>

        {/* Single Centered CTA Button Below Grid */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.15 }}
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
