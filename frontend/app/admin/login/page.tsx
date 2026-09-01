"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, User, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/lib/admin-api";
import { useAdminAuth } from "@/context/admin-auth-context";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAdminAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (res.success && res.token && res.admin) {
        login(res.token, res.admin);
        router.push("/admin");
      } else {
        setError(res.message || "Invalid admin credentials. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-zinc-800">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-ssil-red text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-ssil-red/30">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
            SSIL Admin Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Sign in to manage website content, products &amp; media
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Admin ID / Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ssil-red"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ssil-red"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-ssil-red hover:bg-ssil-red-600 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Sign In to CMS"
            )}
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800 text-center">
          <span className="text-[11px] text-slate-400 block font-medium">
            Protected Enterprise System • Shiv Shakti India Limited
          </span>
        </div>

      </div>
    </div>
  );
}
