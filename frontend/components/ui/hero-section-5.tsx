'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { ChevronRight } from 'lucide-react';

export function HeroSection() {
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

            {/* Client Partners Infinite Slider Strip (Constant Speed = 7, NO hover speed acceleration) */}
            <section className="bg-white dark:bg-black pb-6 border-t border-b border-slate-200/80 dark:border-zinc-800/80 transition-colors">
                <div className="group relative m-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="md:max-w-48 md:border-r md:border-slate-200 dark:md:border-zinc-800 md:pr-6 mb-4 md:mb-0">
                            <p className="text-center md:text-end text-xs sm:text-sm font-extrabold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                                POWERING NATIONAL PROJECTS
                            </p>
                        </div>
                        <div className="relative py-4 md:w-[calc(100%-12rem)]">
                            <InfiniteSlider
                                speed={7}
                                gap={80}
                            >
                                <div className="flex items-center text-sm font-extrabold text-slate-700 dark:text-zinc-300">
                                    IndianOil
                                </div>
                                <div className="flex items-center text-sm font-extrabold text-slate-700 dark:text-zinc-300">
                                    M3M India
                                </div>
                                <div className="flex items-center text-sm font-extrabold text-slate-700 dark:text-zinc-300">
                                    DAE Government
                                </div>
                                <div className="flex items-center text-sm font-extrabold text-slate-700 dark:text-zinc-300">
                                    BPTP Infra
                                </div>
                                <div className="flex items-center text-sm font-extrabold text-slate-700 dark:text-zinc-300">
                                    Mahagun Group
                                </div>
                                <div className="flex items-center text-sm font-extrabold text-slate-700 dark:text-zinc-300">
                                    ACE Group
                                </div>
                                <div className="flex items-center text-sm font-extrabold text-slate-700 dark:text-zinc-300">
                                    Eros Infra
                                </div>
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
