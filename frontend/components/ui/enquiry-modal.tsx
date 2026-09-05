"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchApi } from "@/lib/admin-api";

export interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  productCategory?: string;
  productModel?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  productCategory = "",
  productModel = "",
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    category: productCategory,
    model: productModel,
    enquiry: "",
  });

  // Sync props when modal opens or props change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      category: productCategory,
      model: productModel,
    }));
  }, [productCategory, productModel]);

  // Handle escape key to close modal
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetchApi("/enquiries", {
        method: "POST",
        body: JSON.stringify({
          type: "product_enquiry",
          ...formData,
        }),
      });
    } catch (err) {
      console.error("Failed to submit enquiry:", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          category: productCategory,
          model: productModel,
          enquiry: "",
        });
        onClose();
      }, 3500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Glass Backdrop: Website remains visible */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-sm cursor-pointer"
          />

          {/* Frosted Glass Card Container (Balanced density & legibility) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-lg sm:max-w-xl rounded-3xl bg-slate-950/90 dark:bg-black/92 backdrop-blur-3xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] overflow-hidden text-white my-4"
          >
            {/* Top Glass Bar */}
            <div className="w-full px-6 py-4 flex items-center justify-between border-b border-white/10 bg-white/5 backdrop-blur-md">
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wide drop-shadow-sm">
                Send us an enquiry
              </h2>

              <button
                onClick={onClose}
                type="button"
                className="p-1.5 rounded-full bg-white/10 hover:bg-ssil-red text-white transition-colors cursor-pointer shrink-0"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Container */}
            <div className="p-5 sm:p-6 md:p-7">
              {submitted ? (
                <div className="py-10 text-center space-y-4 border border-emerald-500/40 bg-emerald-500/15 p-6 rounded-2xl backdrop-blur-md shadow-lg">
                  <CheckCircle2 className="h-16 w-16 text-emerald-400 mx-auto stroke-[2.2]" />
                  <h3 className="text-xl font-black text-white tracking-tight">
                    Enquiry Received
                  </h3>
                  <p className="text-sm text-slate-200 max-w-md mx-auto leading-relaxed font-medium">
                    Thank you for inquiring about{" "}
                    <span className="text-white font-bold">{formData.model || formData.category || "our product"}</span>.
                    Our engineering team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* First & Last Name Row */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-200">
                        First Name <span className="text-ssil-red">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 dark:bg-white/5 text-white text-xs sm:text-sm font-medium placeholder:text-slate-400 border border-white/20 focus:outline-none focus:border-ssil-red focus:bg-white/15 shadow-xs transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-200">
                        Last Name <span className="text-ssil-red">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 dark:bg-white/5 text-white text-xs sm:text-sm font-medium placeholder:text-slate-400 border border-white/20 focus:outline-none focus:border-ssil-red focus:bg-white/15 shadow-xs transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-200">
                        Email <span className="text-ssil-red">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 dark:bg-white/5 text-white text-xs sm:text-sm font-medium placeholder:text-slate-400 border border-white/20 focus:outline-none focus:border-ssil-red focus:bg-white/15 shadow-xs transition-all"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-200">
                        Phone Number <span className="text-ssil-red">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXXXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 dark:bg-white/5 text-white text-xs sm:text-sm font-medium placeholder:text-slate-400 border border-white/20 focus:outline-none focus:border-ssil-red focus:bg-white/15 shadow-xs transition-all"
                      />
                    </div>
                  </div>

                  {/* Non-editable Product Category Field */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-300">
                      Product
                    </label>
                    <input
                      type="text"
                      name="category"
                      readOnly
                      value={formData.category}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-slate-200 cursor-not-allowed text-xs sm:text-sm font-bold focus:outline-none select-none"
                    />
                  </div>

                  {/* Non-editable Product ID / Model Field */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-300">
                      Product ID
                    </label>
                    <input
                      type="text"
                      name="model"
                      readOnly
                      value={formData.model}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-slate-200 cursor-not-allowed text-xs sm:text-sm font-bold focus:outline-none select-none"
                    />
                  </div>

                  {/* Enquiry Text Area */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-200">
                      Enquiry <span className="text-ssil-red">*</span>
                    </label>
                    <textarea
                      name="enquiry"
                      required
                      rows={3}
                      value={formData.enquiry}
                      onChange={handleChange}
                      placeholder="Tell us about your project requirements, quantities, or technical specifications..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 dark:bg-white/5 text-white text-xs sm:text-sm font-medium placeholder:text-slate-400 border border-white/20 focus:outline-none focus:border-ssil-red focus:bg-white/15 shadow-xs transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-2xl bg-ssil-red hover:bg-ssil-red-600 disabled:opacity-75 text-white font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-lg shadow-ssil-red/35 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
