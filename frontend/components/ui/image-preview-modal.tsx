"use client";

import React, { useEffect } from "react";
import { X, ChevronRight, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ImagePreviewModalProps {
  isOpen: boolean;
  imageSrc: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
  onEnquire?: (modelName: string) => void;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isOpen,
  imageSrc,
  title,
  onClose,
  onEnquire,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
          
          {/* Transparent Glass Backdrop: Underlying website is visible, clicking outside closes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs cursor-pointer"
          />

          {/* Compact 9:16 Portrait Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-[330px] sm:max-w-[360px] max-h-[85vh] rounded-3xl bg-slate-950/70 dark:bg-black/70 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8),0_0_35px_-5px_rgba(229,62,62,0.3)] overflow-hidden flex flex-col justify-between"
          >
            {/* Top Transparent Bar: ID / Model Title & Close Button */}
            <div className="w-full px-4 py-3 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-md">
              <span className="text-xs font-black uppercase text-white tracking-wide truncate max-w-[240px]">
                {title}
              </span>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/10 hover:bg-ssil-red text-white transition-colors cursor-pointer shrink-0"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Centered Image (9:16 Portrait Ratio) */}
            <div className="relative w-full flex-1 flex items-center justify-center p-4 sm:p-5 min-h-[340px] max-h-[58vh]">
              <img
                src={imageSrc}
                alt={title}
                className="max-h-[54vh] max-w-full w-auto object-contain rounded-2xl drop-shadow-2xl select-none"
              />
            </div>

            {/* Bottom Glass Bar: Title ID & Enquire Now Button */}
            <div className="w-full px-4 py-3 flex items-center justify-between gap-3 border-t border-white/10 bg-slate-950/60 backdrop-blur-md">
              <span className="text-[11px] font-bold text-slate-200 truncate flex-1 text-left">
                {title}
              </span>

              {onEnquire && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onEnquire(title);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-ssil-red hover:bg-ssil-red-600 transition-all duration-200 px-3.5 py-1.5 rounded-xl shadow-md shrink-0 hover:scale-105 cursor-pointer"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Enquire Now</span>
                </button>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
