"use client";

import React, { useEffect } from "react";
import { X, ZoomIn, MessageSquareText } from "lucide-react";
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
  subtitle,
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
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 md:p-8">
          
          {/* Backdrop: Clicking outside closes modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-slate-950/95 border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
          >
            {/* Top Bar with Title & Close Button */}
            <div className="w-full px-5 py-4 flex items-center justify-between border-b border-white/10 bg-slate-900/60 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-ssil-red animate-pulse" />
                <div>
                  <h3 className="text-sm sm:text-base font-black uppercase text-white tracking-wide">
                    {title}
                  </h3>
                  {subtitle && (
                    <p className="text-[11px] text-slate-400 font-medium">{subtitle}</p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-ssil-red text-white transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* High-Resolution Image Container */}
            <div className="relative w-full flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden min-h-[300px] max-h-[72vh] bg-black/50">
              <img
                src={imageSrc}
                alt={title}
                className="max-h-[66vh] max-w-full w-auto object-contain rounded-xl shadow-2xl transition-transform duration-300 select-none"
              />
            </div>

            {/* Bottom Action Bar */}
            <div className="w-full px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 bg-slate-900/80 backdrop-blur-md">
              <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
                Click anywhere outside the photo to close
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Close Preview
                </button>

                {onEnquire && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onEnquire(title);
                    }}
                    className="px-5 py-2 rounded-xl bg-ssil-red hover:bg-ssil-red-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-ssil-red/30 transition-all hover:scale-105 cursor-pointer"
                  >
                    <MessageSquareText className="h-3.5 w-3.5" />
                    <span>Enquire For This Model</span>
                  </button>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
