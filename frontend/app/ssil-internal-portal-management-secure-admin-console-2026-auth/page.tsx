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
      subtitle: "Manage hero text & 4 credibility metrics",
      icon: Home,
      href: `${ADMIN_BASE_PATH}/home`,
      iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
      badge: "4 Metrics",
    },
    {
      id: "about",
      title: "About Us Page",
      subtitle: "Manage corporate narrative & company profile",
      icon: Layers,
      href: `${ADMIN_BASE_PATH}/about`,
      iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400",
      badge: "Narrative",
    },
    {
      id: "products",
      title: "Products",
      subtitle: "Manage product catalog & internal models",
      icon: Package,
      href: `${ADMIN_BASE_PATH}/products`,
      iconBg: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400",
      badge: `${stats.productsCount} Categories`,
    },
    {
      id: "add-product",
      title: "Add Product",
      subtitle: "Create new product category & models",
      icon: Plus,
      href: `${ADMIN_BASE_PATH}/products?action=new`,
      iconBg: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
      badge: "Quick Action",
    },
    {
      id: "gallery",
      title: "Gallery & Projects",
      subtitle: "Manage national project client logos",
      icon: Building2,
      href: `${ADMIN_BASE_PATH}/national-projects`,
      iconBg: "bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400",
      badge: `${stats.projectsCount} Logos`,
    },
    {
      id: "contact",
      title: "Contact Us Page",
      subtitle: "Manage contact & inquiry submissions",
      icon: MessageSquare,
      href: `${ADMIN_BASE_PATH}/footer`,
      iconBg: "bg-cyan-100 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400",
      badge: "Inquiries",
    },
    {
      id: "footer",
      title: "Footer",
      subtitle: "Edit office address & footer settings",
      icon: MapPin,
      href: `${ADMIN_BASE_PATH}/footer`,
      iconBg: "bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400",
      badge: "Global",
    },
    {
      id: "quotations",
      title: "Quotations & Leads",
      subtitle: "Manage customer quote requests & routing",
      icon: FileText,
      href: `${ADMIN_BASE_PATH}/footer`,
      iconBg: "bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400",
      badge: "Active",
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
            Manage your website content and pages from here
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

      {/* Grid of Interactive Management Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {dashboardBoxes.map((box) => {
          const Icon = box.icon;
          return (
            <Link
              key={box.id}
              href={box.href}
              className="group relative bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 rounded-3xl p-7 flex flex-col items-center text-center justify-between shadow-xs hover:shadow-xl hover:border-slate-300 dark:hover:border-zinc-700 hover:-translate-y-1 transition-all duration-300 min-h-[220px]"
            >
              {/* Optional Subtle Badge */}
              <div className="w-full flex justify-end">
                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 group-hover:bg-ssil-red/10 group-hover:text-ssil-red transition-colors">
                  {box.badge}
                </span>
              </div>

              {/* Large Pastel Icon Box */}
              <div className="my-auto flex flex-col items-center">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-xs ${box.iconBg}`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                {/* Box Title */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-ssil-red transition-colors">
                  {box.title}
                </h3>

                {/* Subtitle Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 px-1">
                  {box.subtitle}
                </p>
              </div>

              {/* Hover Indicator Line */}
              <div className="w-8 h-1 rounded-full bg-transparent group-hover:bg-ssil-red transition-colors mt-2" />
            </Link>
          );
        })}
      </div>

    </div>
  );
}
