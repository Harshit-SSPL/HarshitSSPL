"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Clock, ArrowRight, PhoneCall, ShieldCheck, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
  productName,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Frosted Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
        />

        {/* Modal Container with Rich Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/40 dark:border-white/10 bg-white/85 dark:bg-slate-950/85 p-6 sm:p-8 text-slate-900 dark:text-white shadow-2xl shadow-black/40 backdrop-blur-2xl"
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
          }}
        >
          {/* Ambient Glow Gradient in Glass Box */}
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-ssil-red/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-200/60 dark:bg-zinc-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-zinc-700 transition-colors border border-white/20 dark:border-white/10"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ssil-red/10 border border-ssil-red/30 px-3 py-1 text-xs font-black uppercase tracking-wider text-ssil-red">
              <Sparkles className="h-3.5 w-3.5" />
              Segment Launching Soon
            </span>
          </div>

          {/* Product Icon & Title */}
          <div className="flex items-start gap-4 mb-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-ssil-red/20 to-red-900/10 border border-ssil-red/30 text-ssil-red shadow-inner">
              <Layers className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {productName}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                New Architectural Lighting Series
              </p>
            </div>
          </div>

          {/* Message Body */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/70 dark:bg-zinc-900/50 border border-slate-200/70 dark:border-zinc-800/80 rounded-2xl p-4 mb-6">
            <p>
              This product segment is currently under active engineering, precision toolcrafting, and quality testing at Shiv Shakti India Limited (SSIL).
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              We will soon be officially launching our bespoke collection for this segment with full certifications and engineering datasheets.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 pt-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Advance custom fabrication inquiries accepted</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              asChild
              className="w-full sm:w-auto flex-1 bg-ssil-red hover:bg-red-700 text-white font-black rounded-full h-11 shadow-lg shadow-ssil-red/25 border-0"
            >
              <Link href="/contact" onClick={onClose} className="flex items-center justify-center gap-2">
                <PhoneCall className="h-4 w-4" />
                <span>Contact for Advance Inquiries</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto rounded-full h-11 border-slate-300 dark:border-zinc-700 font-bold hover:bg-slate-100 dark:hover:bg-zinc-800"
            >
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
