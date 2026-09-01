"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  Layers,
  Building2,
  MapPin,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { fetchApi } from "@/lib/admin-api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    productsCount: 18,
    designsCount: 200,
    nationalProjectsCount: 20,
    statsLoaded: false,
  });

  useEffect(() => {
    const loadOverview = async () => {
      try {
        const [productsRes, projectsRes] = await Promise.all([
          fetchApi("/products/admin/all"),
          fetchApi("/national-projects/admin/all"),
        ]);

        let pCount = 18;
        let dCount = 0;
        if (productsRes.success && Array.isArray(productsRes.products)) {
          pCount = productsRes.products.length;
          dCount = productsRes.products.reduce((acc: number, p: any) => acc + (p.designCount || 0), 0);
        }

        let projCount = 20;
        if (projectsRes.success && Array.isArray(projectsRes.projects)) {
          projCount = projectsRes.projects.length;
        }

        setStats({
          productsCount: pCount,
          designsCount: dCount || 200,
          nationalProjectsCount: projCount,
          statsLoaded: true,
        });
      } catch (e) {
        // use fallback initial numbers
        setStats((prev) => ({ ...prev, statsLoaded: true }));
      }
    };

    loadOverview();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-ssil-red block mb-1">
            SSIL CMS DASHBOARD
          </span>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Overview &amp; Content Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage live website data, national project clients, product catalogues, and footer contact details.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3.5 py-2 rounded-xl shrink-0">
          <ShieldCheck className="h-4 w-4" />
          <span>CMS Backend Active</span>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Products */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Products Catalog</span>
            <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/60 text-ssil-red">
              <Package className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {stats.productsCount}
          </div>
          <span className="text-[11px] text-slate-400 font-medium block mt-1">Active categories</span>
        </div>

        {/* Total Product Designs */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Product Designs</span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {stats.designsCount}+
          </div>
          <span className="text-[11px] text-slate-400 font-medium block mt-1">Managed models/variants</span>
        </div>

        {/* National Projects */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Shared Projects</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {stats.nationalProjectsCount}
          </div>
          <span className="text-[11px] text-slate-400 font-medium block mt-1">Home &amp; About ticker</span>
        </div>

        {/* CMS Sections */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Sections</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            6
          </div>
          <span className="text-[11px] text-slate-400 font-medium block mt-1">CMS-controlled modules</span>
        </div>

      </div>

      {/* Quick Navigation Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Quick Management Sections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <Link
            href="/admin/products"
            className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-ssil-red/60 shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/50 text-ssil-red flex items-center justify-center mb-3">
                <Package className="h-5 w-5" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-ssil-red transition-colors">
                Products Master
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Add, edit, delete, reorder products and manage individual design models.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-ssil-red pt-4 mt-2 border-t border-slate-100 dark:border-zinc-800">
              <span>Manage Products</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/admin/national-projects"
            className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-ssil-red/60 shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center mb-3">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-ssil-red transition-colors">
                Shared National Projects
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Manage logos &amp; names shown in the &quot;Powering National Projects&quot; strip on Home and About.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 pt-4 mt-2 border-t border-slate-100 dark:border-zinc-800">
              <span>Manage Projects</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/admin/home"
            className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-ssil-red/60 shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center mb-3">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-ssil-red transition-colors">
                Home Page CMS
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Edit 4 credibility stats counters and Featured Lighting Solutions cards.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-blue-600 pt-4 mt-2 border-t border-slate-100 dark:border-zinc-800">
              <span>Edit Home Content</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/admin/about"
            className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-ssil-red/60 shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center mb-3">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-ssil-red transition-colors">
                About Us CMS
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Edit main company overview text, headings, and supporting descriptions.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-purple-600 pt-4 mt-2 border-t border-slate-100 dark:border-zinc-800">
              <span>Edit About Us</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/admin/footer"
            className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-ssil-red/60 shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mb-3">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-ssil-red transition-colors">
                Footer &amp; Contact
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Edit corporate office address, factory location, phone numbers, and email.
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 pt-4 mt-2 border-t border-slate-100 dark:border-zinc-800">
              <span>Edit Footer Info</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
}
