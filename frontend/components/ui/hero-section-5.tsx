'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { clientCompanies, ClientCompany } from '@/data/clients';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Single Gliding Item: Floating 3D PNG Sticker Logo Top + Company Name Bottom
const MarqueeItem = ({ client }: { client: ClientCompany }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-2 shrink-0 px-4 cursor-default group">
      {/* Top: Floating 3D PNG Sticker Logo */}
      <div className="h-10 sm:h-12 w-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {client.logoUrl && !imgError ? (
          <img
            src={client.logoUrl}
            alt={`${client.name} Logo`}
            width={120}
            height={48}
            className="h-full w-auto max-w-[120px] object-contain filter drop-shadow-md brightness-105 dark:invert-0"
            onError={() => setImgError(true)}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className="text-xs font-black tracking-wider text-slate-800 dark:text-white uppercase text-center">
            {client.name}
          </span>
        )}
      </div>

      {/* Bottom: Company Name */}
      <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-800 dark:text-zinc-200 tracking-wider text-center uppercase whitespace-nowrap">
        {client.name}
      </span>
    </div>
  );
};

export function HeroSection() {
    const duplicatedClients = [...clientCompanies, ...clientCompanies];

    return (
        <div className="relative w-full overflow-hidden flex flex-col">
            {/* Top Main Hero Viewport Canvas (Reduced by exactly 45px from full height) */}
            <section className="relative w-full flex-1 flex flex-col justify-center min-h-[70vh] sm:min-h-[calc(100vh-125px)] py-14 sm:py-20 lg:py-24">
                <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:px-8 w-full">
                    <div className="max-w-3xl text-left">
                        
                        {/* Eyebrow: Small, Tracked Uppercase Eyebrow */}
                        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-3">
                            ABOUT US
                        </span>

                        {/* Headline: Clean 2-Line Desktop Typography (Second Line Red) */}
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                            Complete infrastructure &amp;<br />
                            <span className="text-ssil-red">architectural lighting.</span>
                        </h1>

                        {/* Supporting Paragraph: Short & Concise 1-2 Lines */}
                        <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mb-6">
                            SSIL manufactures and delivers complete energy-efficient LED luminaires, solar power systems, monumental flag poles, and infrastructure lighting across India.
                        </p>

                        {/* CTA Buttons: Explore Products (Periodic Shine) + Contact Engineers */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 lg:justify-start">
                            <Button
                                asChild
                                size="lg"
                                className="h-11 sm:h-12 rounded-full px-6 text-xs sm:text-sm font-extrabold bg-ssil-red hover:bg-red-700 text-white shadow-md shadow-red-900/20 relative overflow-hidden group border-0">
                                <Link href="/products" className="flex items-center gap-1">
                                    <span className="text-nowrap relative z-10">Explore Products</span>
                                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />

                                    {/* Subtle Periodic Translucent Light Sweep Animation */}
                                    <motion.span
                                        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] pointer-events-none"
                                        animate={{
                                            x: ["-150%", "300%"],
                                        }}
                                        transition={{
                                            duration: 1.8,
                                            repeat: Number.POSITIVE_INFINITY,
                                            repeatDelay: 3.5,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </Link>
                            </Button>

                            <Button
                                key={2}
                                asChild
                                size="lg"
                                variant="ghost"
                                className="h-11 sm:h-12 rounded-full px-6 text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 border border-slate-300 dark:border-zinc-800">
                                <Link href="/contact">
                                    <span className="text-nowrap">Contact Engineers</span>
                                </Link>
                            </Button>
                        </div>

                    </div>
                </div>

                {/* Subtle Backdrop Video Layer */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl border border-black/5 sm:rounded-[3rem] dark:border-white/5 pointer-events-none opacity-15">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="size-full object-cover opacity-15 invert dark:opacity-25 dark:invert-0"
                        src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
                    />
                </div>
            </section>

            {/* Client Partners Infinite Slider Strip (Positioned immediately after full-viewport Hero) */}
            <section className="bg-white dark:bg-black py-4 border-t border-b border-slate-200/80 dark:border-zinc-800/80 transition-colors relative z-20 shrink-0">
                <div className="group relative m-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="md:max-w-48 md:border-r md:border-slate-200 dark:md:border-zinc-800 md:pr-6 mb-3 md:mb-0 shrink-0">
                            <p className="text-center md:text-end text-xs sm:text-sm font-extrabold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                                POWERING NATIONAL PROJECTS
                            </p>
                        </div>
                        <div className="relative py-2 md:w-[calc(100%-12rem)] w-full overflow-hidden">
                            <InfiniteSlider
                                speed={5}
                                gap={48}
                            >
                                {duplicatedClients.map((client, index) => (
                                  <MarqueeItem key={`${client.id}-${index}`} client={client} />
                                ))}
                            </InfiniteSlider>

                            <ProgressiveBlur
                                className="pointer-events-none absolute left-0 top-0 h-full w-16"
                                direction="left"
                                blurIntensity={1}
                            />
                            <ProgressiveBlur
                                className="pointer-events-none absolute right-0 top-0 h-full w-16"
                                direction="right"
                                blurIntensity={1}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HeroSection;
