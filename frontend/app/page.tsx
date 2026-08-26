"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Stats2 } from "@/components/ui/stats-2";
import { ClientMarquee } from "@/components/ui/client-marquee";
import { FeaturedProducts } from "@/components/ui/featured-products";
import { WhySsilSection } from "@/components/ui/why-ssil";
import { FeatureCardDemo } from "@/components/ui/feature-card";
import { HeroVideoCarousel } from "@/components/ui/hero-video-carousel";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="flex flex-col gap-0 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Primary Hero Section with SSIL Multi-Video Carousel Background (Full 100vh Height) */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        
        {/* Multi-Video Carousel (3 videos with smooth crossfade and indicator dots) */}
        <HeroVideoCarousel />

        {/* Lightened Contrast Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/45 to-transparent z-10" />

        {/* Hero Text & CTA Content Container */}
        <div className="container mx-auto px-4 md:px-6 relative z-20 text-white">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
              Engineered Lighting for <br className="hidden sm:inline" />
              <span className="text-ssil-red drop-shadow-sm">Modern</span> Infrastructure
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-xl drop-shadow-sm">
              SSIL designs and delivers customized lighting systems for highways, urban infrastructure, commercial developments, architectural spaces, and large-scale projects.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Button asChild size="lg" className="bg-ssil-red hover:bg-ssil-red-600 font-bold px-8 shadow-md text-white">
                <Link href="/products">
                  Explore Products Catalog <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/20 max-w-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                <span className="text-xs font-semibold text-slate-200">ISO Quality Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ssil-blue shrink-0" />
                <span className="text-xs font-semibold text-slate-200">IP66 Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                <span className="text-xs font-semibold text-slate-200">Custom Engineering</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Component 1: 4-Metric Company Credibility & Scale Section */}
      <Stats2 />

      {/* Component 2: Continuous Client & Company Marquee */}
      <ClientMarquee />

      {/* Component 3: Featured Lighting Solutions (6 Products with Day/Night Crossfade) */}
      <FeaturedProducts />

      {/* Component 4: Why SSIL / The Difference, Built for What's Next */}
      <WhySsilSection />

      {/* Component 5: Feature Card Process Workflow ("From Design Specification to Infrastructure Execution") */}
      <FeatureCardDemo />
    </div>
  );
}
