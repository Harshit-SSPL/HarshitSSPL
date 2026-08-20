import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lightbulb, Sunset, Trees, Zap } from "lucide-react";

const productCategories = [
  {
    title: "Street & Highway Lighting",
    description: "High-output LED luminaires engineered for municipal roads, expressways, and heavy transport corridors.",
    icon: <Zap className="h-8 w-8 text-ssil-blue" />,
  },
  {
    title: "Architectural Landscape Bollards",
    description: "Extruded aluminum bollards providing downward illumination for parks, commercial high streets, and residential developments.",
    icon: <Lightbulb className="h-8 w-8 text-ssil-red" />,
  },
  {
    title: "High-Mast & Flag Poles",
    description: "Monumental national flag poles and polygonal high-mast towers constructed with hot-dip galvanized steel.",
    icon: <Trees className="h-8 w-8 text-ssil-blue" />,
  },
  {
    title: "Standalone Solar Lighting Systems",
    description: "Off-grid solar street and garden poles equipped with high-efficiency PV panels and LiFePO4 batteries.",
    icon: <Sunset className="h-8 w-8 text-ssil-red" />,
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="mb-4 text-slate-600 dark:text-slate-400 hover:text-ssil-red">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>

          <span className="text-xs font-bold uppercase tracking-widest text-ssil-red block mb-1">
            SSIL PRODUCTS CATALOG
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Infrastructure &amp; Architectural Lighting
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
            Shiv Shakti India Limited (SSIL) manufactures and supplies complete commercial, municipal, and highway outdoor lighting systems across India.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {productCategories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl flex flex-col justify-between hover:border-ssil-red/50 transition-all shadow-sm"
            >
              <div>
                <div className="mb-4 p-3 bg-white dark:bg-slate-800 rounded-lg inline-block shadow-xs">
                  {cat.icon}
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {cat.title}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <Button asChild size="sm" variant="outline" className="w-full font-semibold">
                  <Link href="/contact">Inquire Technical Specs</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
