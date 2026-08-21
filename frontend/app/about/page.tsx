"use client";

import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import {
  Lightbulb,
  ShieldCheck,
  Cpu,
  Sparkles,
  Building,
  CheckCircle2,
  Award,
  Layers,
  Zap,
} from "lucide-react";

export default function AboutPage() {
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
      
      {/* 1. HERO SECTION: Red SSIL Lamp Component */}
      <section className="relative w-full overflow-hidden">
        <LampContainer>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center text-center max-w-3xl"
          >
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-ssil-red block mb-3">
              ABOUT SHIV SHAKTI INDIA LIMITED (SSIL)
            </span>
            <h1 className="bg-gradient-to-br from-white via-slate-100 to-slate-300 py-2 bg-clip-text text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-transparent leading-tight drop-shadow-md">
              Engineering Lighting Solutions with Purpose
            </h1>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              One of the most equipped manufacturers of complete lighting solution providers in the global market, enclosing all infrastructure &amp; architectural requirements in a single basket.
            </p>
          </motion.div>
        </LampContainer>
      </section>

      {/* 2. WHO WE ARE: Corporate Introduction */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/80 transition-colors">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center max-w-6xl mx-auto">
            <div>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-2.5">
                WHO WE ARE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                Complete Lighting Infrastructure Under One Roof
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                SSIL is one of the most equipped and major manufacturers of lighting solution providers in the global market. We are an experienced organization in the field of complete lighting solutions, enclosing all your requirements in a single basket.
              </p>
              <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                We are engaged in the export and supply of a wide range of commercial and household products, enclosing outdoor, indoor, solar, decorative LED lights, and solar plants.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80">
                  <CheckCircle2 className="h-4 w-4 text-ssil-red shrink-0" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Global Export &amp; Supply</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80">
                  <CheckCircle2 className="h-4 w-4 text-ssil-blue shrink-0" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">End-to-End Solutions</span>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl bg-slate-900 p-8 text-white shadow-xl border border-slate-800">
              <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-32 h-32 bg-ssil-red/20 rounded-full blur-3xl pointer-events-none" />
              <Award className="h-10 w-10 text-ssil-red mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
                Established Market Reputation
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                SSIL holds the reputation of one of the leading manufacturers and suppliers of lighting fixtures, LED luminaires, all types of decorative poles, ornamental designer poles, octagonal poles, and high mast / flag mast poles.
              </p>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>ESTABLISHED 2015</span>
                <span>HARYANA, INDIA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO & PRODUCT EXPERTISE */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-slate-800/80 transition-colors">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-2.5">
              OUR EXPERTISE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Comprehensive Product &amp; Fixture Range
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-3.5 leading-relaxed">
              Manufactured with high-precision engineering to serve urban infrastructure, highway developments, and commercial projects.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-ssil-red/50 transition-all">
              <Lightbulb className="h-7 w-7 text-ssil-red mb-4" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
                Outdoor &amp; Indoor LED Luminaires
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Energy-efficient LED luminaires and lighting fixtures engineered for high performance, commercial facilities, and residential developments.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-ssil-red/50 transition-all">
              <Zap className="h-7 w-7 text-ssil-blue mb-4" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
                Solar Lights &amp; Power Plants
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Integrated solar lighting systems, standalone solar LED poles, and commercial solar power plant installations for sustainable infrastructure.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-ssil-red/50 transition-all">
              <Building className="h-7 w-7 text-ssil-red mb-4" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
                Ornamental &amp; Designer Poles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Ornamental heritage poles and custom designer poles created for urban beautification, public parks, resorts, and civic plazas.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-ssil-red/50 transition-all">
              <Layers className="h-7 w-7 text-ssil-blue mb-4" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
                Octagonal &amp; High Mast Poles
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Heavy-duty octagonal poles, high mast poles, and flag mast poles designed for highways, stadiums, airports, and industrial complexes.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-ssil-red/50 transition-all">
              <ShieldCheck className="h-7 w-7 text-ssil-red mb-4" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
                Galvanized Iron (GI) Street Lights
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Corrosion-resistant galvanized iron (GI) LED street lights, mounting brackets, and heavy-duty structural fittings.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-ssil-red/50 transition-all">
              <Sparkles className="h-7 w-7 text-ssil-blue mb-4" />
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
                Decorative LED Lighting
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Architectural decorative LED solutions blending aesthetic elegance with industrial durability for modern urban lifestyles.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGY, R&D & ENGINEERING */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/60 dark:border-slate-800/80 transition-colors">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            
            <div className="space-y-4">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block">
                TECHNOLOGY &amp; R&amp;D FACILITIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                Advanced Tool Rooms &amp; Technocrat Leadership
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                The products manufactured by SSIL are equipped with the latest technology, elaborate tool rooms, and extensive R&amp;D facilities.
              </p>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Our manufacturing operations are managed by a highly motivated team of technocrats, engineering, and marketing professionals, complemented by quality workmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              
              <div className="flex gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80">
                <Cpu className="h-8 w-8 text-ssil-red shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Elaborate Tool Rooms &amp; Tech
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Outfitted with precision tooling and testing gear to meet international lighting standards.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80">
                <ShieldCheck className="h-8 w-8 text-ssil-blue shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Extensive R&amp;D Capabilities
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    Continuous research and development in thermal management, optical efficiency, and structural wind-load durability.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. QUALITY COMMITMENT & DESIGN PHILOSOPHY */}
      <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <div className="grid gap-10 lg:grid-cols-2">
            
            <div className="p-8 rounded-2xl bg-slate-800/70 border border-slate-700/80">
              <span className="text-xs font-black uppercase tracking-widest text-ssil-red block mb-3">
                OUR COMMITMENT TO QUALITY
              </span>
              <h3 className="text-2xl font-bold text-white mb-4">
                Zero Once-Over Precision Deliverables
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We are driven by the responsible inclination to amplify our clients&apos; businesses and serve them with high-standard products and lighting solutions as per their requirements.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mt-3">
                With our commitment to quality aptitude and services, we make sure that the deliverables stand no chance of once-over and are carried through with precision.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-800/70 border border-slate-700/80">
              <span className="text-xs font-black uppercase tracking-widest text-sky-400 block mb-3">
                OUR DESIGN PHILOSOPHY
              </span>
              <h3 className="text-2xl font-bold text-white mb-4">
                Traditional Heritage Meets Contemporary Design
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Our unique collection of lighting is a blend of traditional time-honored designs reproduced with precise cognizance to detail and contemporary creation to suit modern lifestyle.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mt-3">
                Combining classic aesthetics with modern LED efficiency to transform urban landscapes.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CORPORATE ESTABLISHMENT DETAILS */}
      <section className="py-14 bg-slate-50 dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/80">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">
            COMPANY REGISTRATION &amp; BACKGROUND
          </span>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            Established in the year 2015 in Haryana, India, Shiv Shakti India (SSIL) is a proprietorship-based firm engaged as a foremost manufacturer and provider of ornamental heritage lighting poles, galvanized iron LED street lights, decorative poles, brackets, and infrastructure luminaires.
          </p>
        </div>
      </section>

    </div>
  );
}
