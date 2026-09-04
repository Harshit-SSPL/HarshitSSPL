"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  Layers,
  Package,
  Plus,
  Building2,
  PhoneCall,
  MapPin,
  FileText,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Eye,
  ExternalLink,
} from "lucide-react";
import { ADMIN_BASE_PATH, fetchApi } from "@/lib/admin-api";
import { catalogProducts } from "@/data/products-catalog";
import { clientCompanies } from "@/data/clients";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    productsCount: catalogProducts.length,
    projectsCount: clientCompanies.length,
    statsCount: 4,
  });

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [prodRes, projRes] = await Promise.all([
          fetchApi("/products/admin/all"),
          fetchApi("/national-projects/admin/all"),
        ]);
        if (prodRes.success && Array.isArray(prodRes.products)) {
          setStats((prev) => ({ ...prev, productsCount: prodRes.products.length }));
        }
        if (projRes.success && Array.isArray(projRes.projects)) {
          setStats((prev) => ({ ...prev, projectsCount: projRes.projects.length }));
        }
      } catch (e) {
        // use fallback
      }
    };
    loadCounts();
  }, []);

  const dashboardBoxes = [
    {
      id: "home",
      title: "Home Page",
      subtitle: "Manage 6 featured products with Day/Night hover & company stats",
      icon: Home,
      href: `${ADMIN_BASE_PATH}/home`,
      iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
      badge: "6 Featured",
    },
    {
      id: "about",
      title: "About Us",
      subtitle: "Manage corporate narrative & company profile",
      icon: Layers,
      href: `${ADMIN_BASE_PATH}/about`,
      iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400",
      badge: "Narrative",
    },
    {
      id: "products",
      title: "Products Catalog",
      subtitle: "Manage all 21 product pages, banners, day/night photos & designs",
      icon: Package,
      href: `${ADMIN_BASE_PATH}/products`,
      iconBg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400",
      badge: `${stats.productsCount} Pages`,
    },
    {
      id: "gallery",
      title: "Projects & Gallery",
      subtitle: "Manage executed case studies shown on /projects",
      icon: Building2,
      href: `${ADMIN_BASE_PATH}/gallery`,
      iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
      badge: "Case Studies",
    },
    {
      id: "national-projects",
      title: "National Projects",
      subtitle: "Manage client & government partner logos",
      icon: Sparkles,
      href: `${ADMIN_BASE_PATH}/national-projects`,
      iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
      badge: `${stats.projectsCount} Logos`,
    },
    {
      id: "footer",
      title: "Footer & Contact",
      subtitle: "Edit office address, contact numbers, email & socials",
      icon: MapPin,
      href: `${ADMIN_BASE_PATH}/footer`,
      iconBg: "bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400",
      badge: "Global",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-serif">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Select a page below to manage and edit its website content
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-zinc-800 hover:bg-slate-50 border border-slate-200 dark:border-zinc-700 px-4 py-2.5 rounded-2xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Eye className="h-4 w-4 text-ssil-red" />
          <span>View Live Site</span>
          <ExternalLink className="h-3 w-3 text-slate-400" />
        </Link>
      </div>

      {/* Grid of 6 Core Management Pages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardBoxes.map((box) => {
          const Icon = box.icon;
          return (
            <Link
              key={box.id}
              href={box.href}
              className="group relative bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 rounded-3xl p-7 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-ssil-red/50 hover:-translate-y-1 transition-all duration-300 min-h-[220px]"
            >
              {/* Top Badge */}
              <div className="w-full flex justify-between items-center">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs ${box.iconBg}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 group-hover:bg-ssil-red/10 group-hover:text-ssil-red transition-colors">
                  {box.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mt-5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-ssil-red transition-colors flex items-center justify-between">
                  <span>{box.title}</span>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-ssil-red" />
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                  {box.subtitle}
                </p>
              </div>

              {/* Hover Indicator Line */}
              <div className="w-full h-1 rounded-full bg-slate-100 dark:bg-zinc-800 group-hover:bg-ssil-red transition-colors mt-4" />
            </Link>
          );
        })}
      </div>

    </div>
  );
}
