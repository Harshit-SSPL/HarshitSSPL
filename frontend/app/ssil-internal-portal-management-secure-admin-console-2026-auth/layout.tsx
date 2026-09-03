"use client";

import React, { useState, useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  Sparkles,
  PlusCircle,
} from "lucide-react";
import { AdminAuthProvider, useAdminAuth } from "@/context/admin-auth-context";
import { Button } from "@/components/ui/button";
import { ADMIN_BASE_PATH } from "@/lib/admin-api";

const navItems = [
  { label: "Dashboard", href: ADMIN_BASE_PATH, icon: LayoutDashboard },
  { label: "Home Page", href: `${ADMIN_BASE_PATH}/home`, icon: Home },
  { label: "About Us", href: `${ADMIN_BASE_PATH}/about`, icon: Layers },
  { label: "Products Catalog", href: `${ADMIN_BASE_PATH}/products`, icon: Package },
  { label: "Gallery & Projects", href: `${ADMIN_BASE_PATH}/national-projects`, icon: Building2 },
  { label: "Footer & Contact", href: `${ADMIN_BASE_PATH}/footer`, icon: MapPin },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, loading, logout, isAuthenticated } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

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
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-zinc-950 flex text-slate-900 dark:text-white antialiased selection:bg-ssil-red/20 selection:text-ssil-red">
      
      {/* Sidebar for Desktop (Collapsible with Arrow Button) */}
      <aside
        className={`hidden lg:flex flex-col bg-white dark:bg-zinc-900 border-r border-slate-200/80 dark:border-zinc-800 shrink-0 transition-all duration-300 relative ${
          collapsed ? "w-[76px]" : "w-64"
        }`}
      >
        {/* Pinned Arrow Toggle Button on the Right Border */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-7 z-20 h-7 w-7 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-md flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-ssil-red hover:scale-110 transition-all"
          title={collapsed ? "Expand Side Panel" : "Collapse Side Panel"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* Brand Header */}
        <div className={`p-5 border-b border-slate-100 dark:border-zinc-800 flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
          <div className="w-9 h-9 rounded-xl bg-ssil-red text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm shadow-ssil-red/30">
            S
          </div>
          {!collapsed && (
            <div className="min-w-0 overflow-hidden">
              <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight truncate">
                SSIL Admin
              </h1>
              <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 block tracking-wider uppercase truncate">
                Control Panel
              </span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all group ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-zinc-800/60 hover:text-slate-900 dark:hover:text-white"
                } ${collapsed ? "justify-center px-0" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-ssil-red" : ""}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Footer Actions */}
        <div className="p-3 border-t border-slate-100 dark:border-zinc-800 space-y-2">
          {!collapsed ? (
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-800">
              <Shield className="h-4 w-4 text-emerald-500 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold truncate text-slate-800 dark:text-slate-200">
                  {admin?.username || "Admin"}
                </p>
                <p className="text-[9px] text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
                  {admin?.role || "Superadmin"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-1">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center" title="Admin Active">
                <Shield className="h-4 w-4" />
              </div>
            </div>
          )}

          <div className={`flex items-center gap-2 ${collapsed ? "flex-col" : ""}`}>
            <Button
              asChild
              variant="outline"
              size="sm"
              className={`text-[11px] font-bold border-slate-200 dark:border-zinc-700 rounded-xl ${collapsed ? "w-full p-2" : "flex-1"}`}
              title="View Public Website"
            >
              <Link href="/" target="_blank">
                <ExternalLink className="h-3.5 w-3.5" />
                {!collapsed && <span className="ml-1.5">Live Site</span>}
              </Link>
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={logout}
              className={`bg-red-50 hover:bg-red-100 text-ssil-red border border-red-200/80 dark:bg-red-950/40 dark:border-red-900/50 font-bold text-xs rounded-xl ${
                collapsed ? "w-full p-2" : "px-3"
              }`}
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
              {!collapsed && <span className="ml-1">Exit</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        
        {/* Top Bar on Mobile & Tablet */}
        <header className="lg:hidden h-16 bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between px-4 sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-ssil-red text-white flex items-center justify-center font-black text-xs">
              S
            </div>
            <span className="text-xs font-black uppercase text-slate-900 dark:text-white">
              SSIL Admin Console
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

              <nav className="flex-1 py-4 space-y-1.5 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-colors ${
                        isActive
                          ? "bg-slate-900 text-white dark:bg-white dark:text-zinc-900"
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
                <Button asChild variant="outline" className="w-full text-xs font-bold rounded-xl">
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
                  className="w-full text-xs font-bold rounded-xl"
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
