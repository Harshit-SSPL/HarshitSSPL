"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GlassCard,
  GlassCardHeader,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardAction,
  GlassCardContent,
  GlassCardFooter,
} from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Home, Lock, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Front-end login submit placeholder
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 px-4 py-20 overflow-hidden select-none">
      
      {/* High-Resolution Architectural Lighting Background Image with Dark Vignette */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 filter blur-xs transition-all duration-700"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2600&auto=format&fit=crop')`,
        }}
      />

      {/* SSIL Red & Dark Glow Ambient Background Elements */}
      <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-ssil-red/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-blue-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90 z-0 pointer-events-none" />

      {/* Main GlassCard Container */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Top Company Brand Mark Header */}
        <div className="mb-6 flex flex-col items-center justify-center text-center">
          <Link href="/" className="group flex items-center gap-2 mb-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md p-1 border border-white/20 transition-transform group-hover:scale-105">
              <Image
                src="/branding/companylogo-ui.png"
                alt="Shiv Shakti India Limited Logo"
                width={160}
                height={45}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              SSIL<span className="text-ssil-red">.</span>
            </span>
          </Link>
          <p className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
            Shiv Shakti India Limited Corporate Portal
          </p>
        </div>

        <GlassCard className="w-full bg-slate-900/40 border-white/15 shadow-2xl backdrop-blur-xl rounded-3xl p-2 sm:p-4 text-white">
          <GlassCardHeader className="border-b border-white/10 pb-5">
            <div>
              <GlassCardTitle className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mb-1">
                Login to Portal
              </GlassCardTitle>
              <GlassCardDescription className="text-xs sm:text-sm text-slate-300">
                Enter your official email to access your account
              </GlassCardDescription>
            </div>

            {/* Replaced Sign Up with Home Button as requested */}
            <GlassCardAction>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-9 px-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all text-xs font-bold"
              >
                <Link href="/" className="flex items-center gap-1.5">
                  <Home className="h-3.5 w-3.5 text-ssil-red" />
                  <span>Home</span>
                </Link>
              </Button>
            </GlassCardAction>
          </GlassCardHeader>

          <GlassCardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>Email Address</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@ssindia.com"
                  required
                  className="h-11 rounded-xl bg-slate-950/60 border-white/15 text-white placeholder:text-slate-400 focus:border-ssil-red focus:ring-ssil-red/20 text-sm"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Password</span>
                  </Label>
                  <Link
                    href="/contact"
                    className="text-xs font-semibold text-slate-300 hover:text-white underline-offset-4 hover:underline transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  required
                  className="h-11 rounded-xl bg-slate-950/60 border-white/15 text-white placeholder:text-slate-400 focus:border-ssil-red focus:ring-ssil-red/20 text-sm"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-ssil-red hover:bg-red-700 text-white font-extrabold text-sm shadow-lg shadow-red-950/50 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Login to Account</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </form>
          </GlassCardContent>

          <GlassCardFooter className="flex flex-col gap-3 pt-4 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full h-10 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 text-xs font-bold transition-all flex items-center justify-center gap-2"
              onClick={() => alert("Google SSO authentication is configured for corporate SSIL domain accounts.")}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.3C.6 9.3 0 11.6 0 14s.6 4.7 1.6 6.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"
                />
              </svg>
              <span>Login with Google</span>
            </Button>
          </GlassCardFooter>
        </GlassCard>

        {/* Footer Legal Terms note */}
        <p className="mt-6 text-center text-xs text-slate-400">
          By logging in, you agree to SSIL&apos;s{" "}
          <Link href="/terms-of-service" className="text-slate-300 hover:text-white underline underline-offset-4">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="text-slate-300 hover:text-white underline underline-offset-4">
            Privacy Policy
          </Link>.
        </p>

      </div>
    </div>
  );
}
