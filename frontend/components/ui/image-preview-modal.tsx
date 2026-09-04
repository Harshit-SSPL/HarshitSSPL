"use client";

import React, { useEffect } from "react";
import { ChevronRight, MessageSquare } from "lucide-react";
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
          
          {/* Subtle Transparent Glass Backdrop: Underlying website is completely visible */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/25 backdrop-blur-[3px] cursor-pointer"
          />

          {/* Fully Transparent Glass Card (9:16 Portrait Ratio) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-[310px] sm:max-w-[340px] max-h-[85vh] rounded-3xl bg-white/10 dark:bg-black/20 backdrop-blur-2xl border border-white/30 dark:border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] overflow-hidden flex flex-col justify-between"
          >
            {/* Above Section: ONLY ID Name */}
            <div className="w-full px-5 py-3.5 text-center border-b border-white/15 bg-white/5 dark:bg-white/5 backdrop-blur-md">
              <span className="text-xs sm:text-sm font-black uppercase text-slate-900 dark:text-white tracking-wide drop-shadow-sm line-clamp-1">
                {title}
              </span>
            </div>

            {/* Middle Section: Transparent Image Container */}
            <div className="relative w-full flex-1 flex items-center justify-center p-4 sm:p-5 min-h-[320px] max-h-[58vh]">
              <img
                src={imageSrc}
                alt={title}
                className="max-h-[52vh] max-w-full w-auto object-contain rounded-2xl drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] select-none transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Below Section: ONLY Enquire Now Button */}
            <div className="w-full p-4 text-center border-t border-white/15 bg-white/5 dark:bg-white/5 backdrop-blur-md flex items-center justify-center">
              {onEnquire && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onEnquire(title);
                  }}
                  className="w-full py-2.5 px-5 rounded-2xl bg-ssil-red hover:bg-ssil-red-600 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-ssil-red/35 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
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
