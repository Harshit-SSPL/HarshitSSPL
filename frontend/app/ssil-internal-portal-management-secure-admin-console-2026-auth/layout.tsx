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
import { ADMIN_BASE_PATH } from "@/lib/admin-api";

const navItems = [
  { label: "Dashboard", href: ADMIN_BASE_PATH, icon: LayoutDashboard },
  { label: "Home Page CMS", href: `${ADMIN_BASE_PATH}/home`, icon: Home },
  { label: "Shared Projects", href: `${ADMIN_BASE_PATH}/national-projects`, icon: Building2 },
  { label: "About Us CMS", href: `${ADMIN_BASE_PATH}/about`, icon: Layers },
  { label: "Products Master", href: `${ADMIN_BASE_PATH}/products`, icon: Package },
  { label: "Footer & Contact", href: `${ADMIN_BASE_PATH}/footer`, icon: MapPin },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, loading, logout, isAuthenticated } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, render cleanly without sidebar
  if (pathname === `${ADMIN_BASE_PATH}/login`) {
    return <>{children}</>;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-ssil-red animate-spin mb-3" />
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Loading SSIL Secure Admin...</p>
      </div>
    );
  }

  // Not authenticated -> redirect to login
  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      router.push(`${ADMIN_BASE_PATH}/login`);
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
                Secure Console
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

        {/* User Info & Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-zinc-800 space-y-3">
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg bg-slate-50 dark:bg-zinc-800/50">
            <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold truncate text-slate-800 dark:text-slate-200">
                {admin?.username || "Admin"}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                {admin?.role || "Superadmin"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 text-[11px] font-bold border-slate-200 dark:border-zinc-700"
            >
              <Link href="/" target="_blank">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> View Site
              </Link>
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={logout}
              className="bg-red-50 hover:bg-red-100 text-ssil-red border border-red-200 dark:bg-red-950/40 dark:border-red-900/50 px-3 font-bold text-xs"
            >
              <LogOut className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Bar on Mobile & Tablet */}
        <header className="lg:hidden h-16 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-ssil-red text-white flex items-center justify-center font-black text-xs">
              S
            </div>
            <span className="text-xs font-black uppercase text-slate-900 dark:text-white">
              SSIL Admin
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-slate-700 dark:text-slate-200"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex flex-col">
            <div className="w-4/5 max-w-xs bg-white dark:bg-zinc-900 h-full flex flex-col p-4 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-ssil-red text-white flex items-center justify-center font-black text-xs">
                    S
                  </div>
                  <span className="text-xs font-black uppercase text-slate-900 dark:text-white">
                    SSIL Admin Console
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                        isActive
                          ? "bg-ssil-red text-white"
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 space-y-2">
                <Button asChild variant="outline" className="w-full text-xs font-bold">
                  <Link href="/" target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" /> View Public Site
                  </Link>
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                  className="w-full text-xs font-bold"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
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
