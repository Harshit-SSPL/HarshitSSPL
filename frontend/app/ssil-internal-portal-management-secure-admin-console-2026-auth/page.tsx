"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  Layers,
  Package,
  Building2,
  PhoneCall,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Edit3,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Database,
  Eye,
  Settings,
} from "lucide-react";
import { fetchApi, ADMIN_BASE_PATH } from "@/lib/admin-api";
import { catalogProducts } from "@/data/products-catalog";
import { clientCompanies } from "@/data/clients";

export default function AdminDashboardPage() {
  const [statsData, setStatsData] = useState<any>(null);
  const [aboutData, setAboutData] = useState<any>(null);
  const [footerData, setFooterData] = useState<any>(null);
  const [projectsList, setProjectsList] = useState<any[]>(clientCompanies);
  const [productsList, setProductsList] = useState<any[]>(catalogProducts);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    const loadAllContent = async () => {
      try {
        const [statsRes, aboutRes, footerRes, projRes, prodRes] = await Promise.all([
          fetchApi("/home/stats"),
          fetchApi("/about"),
          fetchApi("/footer"),
          fetchApi("/national-projects/admin/all"),
          fetchApi("/products/admin/all"),
        ]);

        if (statsRes.success && statsRes.stats) setStatsData(statsRes.stats);
        if (aboutRes.success && aboutRes.about) setAboutData(aboutRes.about);
        if (footerRes.success && footerRes.footer) setFooterData(footerRes.footer);
        if (projRes.success && Array.isArray(projRes.projects) && projRes.projects.length > 0) {
          setProjectsList(projRes.projects);
        }
        if (prodRes.success && Array.isArray(prodRes.products) && prodRes.products.length > 0) {
          setProductsList(prodRes.products);
        }
      } catch (err) {
        console.warn("Using local fallback previews");
      }
    };

    loadAllContent();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-black uppercase tracking-widest text-ssil-red">
              SSIL ENTERPRISE CMS CONSOLE
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold uppercase">
              Live Synchronized
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Website Content &amp; Page Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Select any page below to inspect its internal components and edit live text, credibility metrics, products catalog, and client projects.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-colors"
          >
            <Eye className="h-4 w-4 text-ssil-red" />
            <span>Preview Live Website</span>
          </Link>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PAGE CMS SECTIONS (DIV CARDS) */}
      {/* ============================================================ */}
      <div className="space-y-6">
        
        {/* ------------------------------------------------------------ */}
        {/* 1. HOME PAGE DIV CARD */}
        {/* ------------------------------------------------------------ */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-5 transition-all hover:border-blue-500/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center font-bold shrink-0 shadow-xs">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 block">
                  PAGE 01 • LANDING &amp; CREDIBILITY
                </span>
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  Home Page Content
                </h2>
              </div>
            </div>

            <Link
              href={`${ADMIN_BASE_PATH}/home`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors self-start sm:self-auto"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit Home Page</span>
            </Link>
          </div>

          {/* Internal Editable Elements in Home Page */}
          <div className="space-y-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Internal Editable Modules &amp; Current Values:
            </span>

            {/* 4 Scale Metrics Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Stat 1 • Footprint</span>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {statsData?.deployedFootprints?.value?.toLocaleString() || "20,000"}+
                </div>
                <span className="text-[10px] text-slate-500 line-clamp-1">Poles &amp; Lighting Installations</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Stat 2 • Experience</span>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {statsData?.yearsExperience?.value || 12}+
                </div>
                <span className="text-[10px] text-slate-500 line-clamp-1">Years of Engineering Heritage</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Stat 3 • Presence</span>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {statsData?.statesServed?.value || 22}+
                </div>
                <span className="text-[10px] text-slate-500 line-clamp-1">States &amp; UTs Across India</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700/60">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Stat 4 • Contracts</span>
                <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {statsData?.projectsCompleted?.value || 500}+
                </div>
                <span className="text-[10px] text-slate-500 line-clamp-1">Government &amp; Private Projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 2. ABOUT US PAGE DIV CARD */}
        {/* ------------------------------------------------------------ */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-5 transition-all hover:border-purple-500/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center font-bold shrink-0 shadow-xs">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 block">
                  PAGE 02 • CORPORATE NARRATIVE
                </span>
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  About Us Page Content
                </h2>
              </div>
            </div>

            <Link
              href={`${ADMIN_BASE_PATH}/about`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-colors self-start sm:self-auto"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit About Us</span>
            </Link>
          </div>

          {/* Internal Editable Elements in About Us */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700/60 space-y-1">
              <span className="text-[10px] font-black uppercase text-purple-600">Main Heading</span>
              <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                {aboutData?.heading || "Delivering Dependable Infrastructure Lighting Solutions Across India"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700/60 space-y-1">
              <span className="text-[10px] font-black uppercase text-purple-600">Overview Summary</span>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-2">
                {aboutData?.mainDescription || "Premier manufacturer and infrastructure solutions provider specializing in outdoor lighting systems..."}
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 3. PRODUCTS PAGE & INTERNAL PRODUCTS DIV CARD */}
        {/* ------------------------------------------------------------ */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-5 transition-all hover:border-ssil-red/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-red-50 dark:bg-red-950/50 text-ssil-red flex items-center justify-center font-bold shrink-0 shadow-xs">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-ssil-red block">
                  PAGE 03 • CATALOGUE &amp; 18 PRODUCT CATEGORIES
                </span>
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  Products Page &amp; Internal Catalog Models
                </h2>
              </div>
            </div>

            <Link
              href={`${ADMIN_BASE_PATH}/products`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ssil-red hover:bg-ssil-red-600 text-white font-bold text-xs shadow-xs transition-colors self-start sm:self-auto"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Manage Products Master ({productsList.length})</span>
            </Link>
          </div>

          {/* Internal Products List Preview with Direct Model Drill-down */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Internal Products &amp; Design Variants ({productsList.length} Categories):
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Click any product to manage its design models</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {productsList.map((prod, idx) => {
                const prodId = prod._id || prod.id || String(idx);
                return (
                  <Link
                    key={prodId}
                    href={`${ADMIN_BASE_PATH}/products/${prodId}/designs`}
                    className="group p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700/60 hover:border-ssil-red/60 transition-all flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shrink-0">
                      <img src={prod.dayImage} alt={prod.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-black uppercase text-slate-900 dark:text-white truncate block group-hover:text-ssil-red transition-colors">
                        {prod.name}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold block">
                        {prod.designCount || 12}+ Models
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-ssil-red group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 4. GALLERY & SHARED NATIONAL PROJECTS DIV CARD */}
        {/* ------------------------------------------------------------ */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-5 transition-all hover:border-amber-500/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center font-bold shrink-0 shadow-xs">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 block">
                  PAGE 04 • SHARED CLIENTS TICKER
                </span>
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  Gallery &amp; National Projects
                </h2>
              </div>
            </div>

            <Link
              href={`${ADMIN_BASE_PATH}/national-projects`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors self-start sm:self-auto"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Manage Shared Logos ({projectsList.length})</span>
            </Link>
          </div>

          {/* Internal Editable Logos Preview */}
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-3">
              Shared National Client Logos ({projectsList.length} Logos Hosted on Cloudinary):
            </span>

            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-2.5">
              {projectsList.slice(0, 16).map((proj, idx) => (
                <div
                  key={proj._id || proj.id || idx}
                  className="p-2 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/80 dark:border-zinc-700/60 flex flex-col items-center justify-center text-center"
                >
                  <div className="h-8 w-full flex items-center justify-center mb-1">
                    <img src={proj.logoUrl} alt={proj.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-700 dark:text-zinc-300 uppercase truncate w-full">
                    {proj.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* 5. CONTACT US & FOOTER DIV CARDS (SIDE BY SIDE) */}
        {/* ------------------------------------------------------------ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Contact Us Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center font-bold">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 block">
                    PAGE 05 • CONTACT &amp; INQUIRIES
                  </span>
                  <h3 className="text-base font-black uppercase text-slate-900 dark:text-white">
                    Contact Us Page
                  </h3>
                </div>
              </div>

              <Link
                href={`${ADMIN_BASE_PATH}/footer`}
                className="p-2 rounded-xl text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 transition-colors"
                title="Edit Contact Info"
              >
                <Edit3 className="h-4 w-4" />
              </Link>
            </div>

            <div className="text-xs space-y-2 text-slate-600 dark:text-slate-300 font-medium">
              <p><strong>Primary Phone:</strong> {footerData?.phone1 || "+91 9999590064"}</p>
              <p><strong>Secondary Phone:</strong> {footerData?.phone2 || "+91 9999990064"}</p>
              <p><strong>Email:</strong> {footerData?.email || "ssindia2006@gmail.com"}</p>
            </div>
          </div>

          {/* Footer Settings Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center font-bold">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 block">
                    GLOBAL FOOTER COMPONENT
                  </span>
                  <h3 className="text-base font-black uppercase text-slate-900 dark:text-white">
                    Footer &amp; Address Settings
                  </h3>
                </div>
              </div>

              <Link
                href={`${ADMIN_BASE_PATH}/footer`}
                className="p-2 rounded-xl text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 transition-colors"
                title="Edit Footer Settings"
              >
                <Edit3 className="h-4 w-4" />
              </Link>
            </div>

            <div className="text-xs space-y-2 text-slate-600 dark:text-slate-300 font-medium">
              <p className="line-clamp-1"><strong>Corporate Office:</strong> {footerData?.corporateOfficeAddress || "Office No- 812A, 814, Puri High Street..."}</p>
              <p className="line-clamp-1"><strong>Factory Location:</strong> {footerData?.factoryAddress || "Plot No. 5, Sector 65, Village Sahupura..."}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
