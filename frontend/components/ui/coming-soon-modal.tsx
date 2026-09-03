"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
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
          className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity cursor-pointer"
        />

        {/* Modal Box with Exact Navbar-matching Translucent Glass Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 dark:border-white/15 bg-slate-950/40 dark:bg-slate-950/50 p-6 sm:p-8 text-white shadow-2xl backdrop-blur-2xl"
          style={{
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.35), inset 0 -1px 2px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Top Glass Rim Shine */}
          <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition-all border border-white/15"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Segment Launching Soon Title */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ssil-red/20 border border-ssil-red/40 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-ssil-red shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Segment Launching Soon
            </span>
          </div>

          {/* Message Body */}
          <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-5 mb-6 backdrop-blur-xs">
            <p>
              This product segment is currently under active engineering, precision toolcrafting, and quality testing at Shiv Shakti India Limited (SSIL).
            </p>
            <p className="text-slate-300">
              We will soon be officially launching our bespoke collection for this segment with full certifications and engineering datasheets.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              asChild
              className="w-full sm:w-auto flex-1 bg-ssil-red hover:bg-red-700 text-white font-extrabold rounded-full h-10 sm:h-11 shadow-lg shadow-ssil-red/30 border-0"
            >
              <Link href="/contact" onClick={onClose} className="flex items-center justify-center gap-2">
                <PhoneCall className="h-4 w-4" />
                <span>Contact Us</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto rounded-full h-10 sm:h-11 border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold"
            >
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
