"use client";

import React, { useState, useEffect } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Glassmorphic Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm"
          />

          {/* Modal Container: Navbar-inspired Glassmorphism with Sleek Rounded Radius & Translucent Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg sm:max-w-xl rounded-2xl bg-slate-950/20 dark:bg-slate-950/25 backdrop-blur-2xl border border-white/10 shadow-2xl p-5 sm:p-6 md:p-7 text-white my-4 overflow-hidden"
          >
            {/* Small Red Close Cross Icon (No Outer Box) */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-4 right-4 p-1 text-ssil-red hover:text-red-400 bg-transparent border-0 transition-transform hover:scale-110 focus:outline-none"
              aria-label="Close Enquiry Modal"
            >
              <X className="h-5 w-5 stroke-[2.5]" />
            </button>

            {/* Header: Title Only */}
            <div className="mb-4 pr-8">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Send us an enquiry
              </h2>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3 border border-ssil-red/30 bg-ssil-red/10 p-5 rounded-xl">
                <CheckCircle2 className="h-12 w-12 text-ssil-red mx-auto" />
                <h3 className="text-lg font-extrabold text-white">
                  Enquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 max-w-md mx-auto leading-relaxed font-medium">
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-medium placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:border-ssil-red focus:ring-1 focus:ring-ssil-red shadow-sm transition-all"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-medium placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:border-ssil-red focus:ring-1 focus:ring-ssil-red shadow-sm transition-all"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-medium placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:border-ssil-red focus:ring-1 focus:ring-ssil-red shadow-sm transition-all"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-medium placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:border-ssil-red focus:ring-1 focus:ring-ssil-red shadow-sm transition-all"
                    />
                  </div>
                </div>

                {/* Non-editable Product Category Field */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-200">
                    Product
                  </label>
                  <input
                    type="text"
                    name="category"
                    readOnly
                    value={formData.category}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-white/15 text-slate-200 cursor-not-allowed text-xs sm:text-sm font-semibold focus:outline-none select-none"
                  />
                </div>

                {/* Non-editable Product ID / Model Field */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-200">
                    Product ID
                  </label>
                  <input
                    type="text"
                    name="model"
                    readOnly
                    value={formData.model}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-white/15 text-slate-200 cursor-not-allowed text-xs sm:text-sm font-semibold focus:outline-none select-none"
                  />
                </div>

                {/* Enquiry Text Area (White Background) */}
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 text-xs sm:text-sm font-medium placeholder:text-slate-400 border border-slate-200 focus:outline-none focus:border-ssil-red focus:ring-1 focus:ring-ssil-red shadow-sm transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-xl bg-ssil-red hover:bg-ssil-red-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-md flex items-center justify-center gap-2 group"
                  >
                    <span>Submit Enquiry</span>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
