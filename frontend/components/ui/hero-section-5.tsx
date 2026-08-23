'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { clientCompanies, ClientCompany } from '@/data/clients';
import { ChevronRight } from 'lucide-react';

// Single Gliding Item: Logo Image Top + Company Name Bottom
const MarqueeItem = ({ client }: { client: ClientCompany }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-center gap-2 shrink-0 px-2 cursor-default group">
      {/* Top: PNG Sticker Logo in White High-Contrast Card */}
      <div className="h-10 sm:h-12 w-28 sm:w-32 bg-white/95 dark:bg-white/95 rounded-xl p-1.5 shadow-sm border border-slate-200/80 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
        {client.logoUrl && !imgError ? (
          <img
            src={client.logoUrl}
            alt={`${client.name} Logo`}
            className="h-full w-full object-contain max-h-9"
            onError={() => setImgError(true)}
            loading="eager"
          />
        ) : (
          <span className="text-[11px] font-black tracking-wider text-slate-900 uppercase text-center truncate">
            {client.name}
          </span>
        )}
      </div>

      {/* Bottom: Company Name */}
      <span className="text-[11px] sm:text-xs font-extrabold text-slate-800 dark:text-zinc-200 tracking-wider text-center uppercase whitespace-nowrap">
        {client.name}
      </span>
    </div>
  );
};

export function HeroSection() {
    const duplicatedClients = [...clientCompanies, ...clientCompanies];

    return (
        <main className="overflow-x-hidden relative w-full">
            <section className="relative">
                <div className="pt-24 pb-16 md:pb-24 lg:pt-32 lg:pb-28">
                    <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                        <div className="mx-auto max-w-2xl text-center lg:ml-0 lg:max-w-3xl lg:text-left">
                            <h1 className="mt-4 text-balance text-4xl font-black sm:text-5xl md:text-6xl lg:text-7xl text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                                Complete Infrastructure &amp; Architectural Lighting
                            </h1>
                            <p className="mt-6 text-balance text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                                SSIL is one of the most equipped manufacturers of lighting solutions in the global market. We engineer energy-efficient LED luminaires, solar power systems, and monumental poles across India.
                            </p>

                            <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row lg:justify-start">
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-12 rounded-full pl-6 pr-4 text-base font-extrabold bg-ssil-red hover:bg-red-700 text-white shadow-lg shadow-red-900/20">
                                    <Link href="/products">
                                        <span className="text-nowrap">Explore Products</span>
                                        <ChevronRight className="ml-1 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button
                                    key={2}
                                    asChild
                                    size="lg"
                                    variant="ghost"
                                    className="h-12 rounded-full px-6 text-base font-extrabold text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 ring-1 ring-slate-300 dark:ring-slate-800">
                                    <Link href="/contact">
                                        <span className="text-nowrap">Contact Engineers</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Video Background Layer */}
                    <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl border border-black/10 sm:aspect-video lg:rounded-[3rem] dark:border-white/5 pointer-events-none">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="size-full object-cover opacity-30 invert dark:opacity-40 dark:invert-0"
                            src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"
                        />
                    </div>
                </div>
            </section>

            {/* Client Partners Infinite Slider Strip (Logo Top + Name Bottom, 19 Companies, Constant Speed = 7) */}
            <section className="bg-white dark:bg-black pb-6 border-t border-b border-slate-200/80 dark:border-zinc-800/80 transition-colors">
                <div className="group relative m-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="md:max-w-48 md:border-r md:border-slate-200 dark:md:border-zinc-800 md:pr-6 mb-4 md:mb-0 shrink-0">
                            <p className="text-center md:text-end text-xs sm:text-sm font-extrabold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                                POWERING NATIONAL PROJECTS
                            </p>
                        </div>
                        <div className="relative py-3 md:w-[calc(100%-12rem)] w-full overflow-hidden">
                            <InfiniteSlider
                                speed={7}
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
        </main>
    );
}

export default HeroSection;
