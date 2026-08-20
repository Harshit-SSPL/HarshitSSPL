"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Award } from "lucide-react";

const Stats2 = () => {
  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          
          <div className="bg-white border border-slate-200 shadow-sm flex h-60 flex-col justify-between rounded-xl p-8 transition-transform hover:-translate-y-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-ssil-blue font-bold text-xs tracking-wider uppercase">
                Client Trust & Reach
              </p>
              <Award className="h-5 w-5 text-ssil-blue" />
            </div>
            <div>
              <h3 className="text-5xl font-black text-slate-900 tracking-tight">50+</h3>
              <p className="text-slate-600 text-sm font-medium mt-2">
                Enterprise, Commercial & Government Tender Clients
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm flex h-60 flex-col justify-between rounded-xl p-8 transition-transform hover:-translate-y-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-ssil-red font-bold text-xs tracking-wider uppercase">
                Engineering Precision
              </p>
              <ShieldCheck className="h-5 w-5 text-ssil-red" />
            </div>
            <div>
              <h3 className="text-5xl font-black text-slate-900 tracking-tight">99.9%</h3>
              <p className="text-slate-600 text-sm font-medium mt-2">
                IP66 Quality & Structural Rigor Compliance
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm flex h-60 flex-col justify-between rounded-xl p-8 transition-transform hover:-translate-y-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-ssil-blue font-bold text-xs tracking-wider uppercase">
                Infrastructure Footprint
              </p>
              <ArrowRight className="h-5 w-5 text-ssil-blue" />
            </div>
            <div>
              <h3 className="text-5xl font-black text-slate-900 tracking-tight">5,000+</h3>
              <p className="text-slate-600 text-sm font-medium mt-2">
                Outdoor Lighting Fixtures & Poles Deployed Across India
              </p>
            </div>
          </div>

        </div>

        <div className="flex flex-col justify-center p-6 py-12 text-center">
          <div>
            <h2 className="mb-3 text-2xl font-bold md:text-4xl text-slate-900 tracking-tight">
              Engineered for Illumination, Built for Infrastructure Scale
            </h2>
            <p className="text-slate-600 text-base max-w-2xl mx-auto">
              Shiv Shakti India Limited delivers customized outdoor lighting solutions designed to meet exacting technical standards for highways, municipal roads, and commercial developments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Stats2 };
