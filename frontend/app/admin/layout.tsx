"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Building2,
  Package,
  Layers,
  MapPin,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  Loader2,
} from "lucide-react";
import { AdminAuthProvider, useAdminAuth } from "@/context/admin-auth-context";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Home Page CMS", href: "/admin/home", icon: Home },
  { label: "Shared Projects", href: "/admin/national-projects", icon: Building2 },
  { label: "About Us CMS", href: "/admin/about", icon: Layers },
  { label: "Products Master", href: "/admin/products", icon: Package },
  { label: "Footer & Contact", href: "/admin/footer", icon: MapPin },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, loading, logout, isAuthenticated } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, render cleanly without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-ssil-red animate-spin mb-3" />
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Loading SSIL Admin...</p>
      </div>
    );
  }

  // Not authenticated -> redirect to login
  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      router.push("/admin/login");
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-zinc-950 flex text-slate-900 dark:text-white antialiased">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 shrink-0">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-ssil-red text-white flex items-center justify-center font-black text-sm">
              S
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                SSIL Admin
              </h1>
              <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 block tracking-wider uppercase">
                Content Management
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? "bg-ssil-red text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-200 dark:border-zinc-800 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5" />
              View Live Website
            </span>
          </Link>

          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout ({admin?.username})
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-64 bg-white dark:bg-zinc-900 h-full flex flex-col p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800">
              <span className="font-black text-sm uppercase">SSIL CMS</span>
              <button onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                      isActive ? "bg-ssil-red text-white" : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 border-t border-slate-200 dark:border-zinc-800 pt-3"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-14 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
              <Shield className="h-3.5 w-3.5 text-ssil-red" />
              <span>Admin Console</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
              Logged in: <strong className="text-slate-900 dark:text-white">{admin?.username}</strong>
            </span>
          </div>
        </header>

        {/* Page Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>

    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
}
