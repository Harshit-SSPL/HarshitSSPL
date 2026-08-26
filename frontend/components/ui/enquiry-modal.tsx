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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Glassmorphic Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Container: Navbar-inspired Glassmorphism with Zero Border Radius */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-2xl rounded-none bg-slate-950/80 dark:bg-slate-950/85 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 md:p-10 shadow-2xl text-white my-8 overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="absolute top-5 right-5 h-9 w-9 flex items-center justify-center rounded-none bg-white/10 hover:bg-ssil-red text-white transition-colors duration-200"
              aria-label="Close Enquiry Modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="mb-6 pr-8">
              <span className="text-[11px] font-black uppercase tracking-widest text-ssil-red block mb-1">
                SSIL TECHNICAL INQUIRY
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                Send us an enquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium leading-relaxed">
                Provide your details below to receive custom tender drawings, photometrics, and quotation.
              </p>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-4 border border-ssil-red/30 bg-ssil-red/10 p-6 rounded-none">
                <CheckCircle2 className="h-14 w-14 text-ssil-red mx-auto" />
                <h3 className="text-xl font-extrabold text-white">
                  Enquiry Received
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-medium">
                  Thank you for inquiring about{" "}
                  <span className="text-white font-bold">{formData.model || formData.category || "our product"}</span>.
                  Our engineering team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First & Last Name Row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      First Name <span className="text-ssil-red">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full px-4 py-2.5 rounded-none bg-slate-900/90 border border-white/15 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-ssil-red transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Last Name <span className="text-ssil-red">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full px-4 py-2.5 rounded-none bg-slate-900/90 border border-white/15 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-ssil-red transition-all"
                    />
                  </div>
                </div>

                {/* Email & Phone Row */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Work Email <span className="text-ssil-red">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="workemail@company.com"
                      className="w-full px-4 py-2.5 rounded-none bg-slate-900/90 border border-white/15 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-ssil-red transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Phone Number <span className="text-ssil-red">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXXXXXXX"
                      className="w-full px-4 py-2.5 rounded-none bg-slate-900/90 border border-white/15 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-ssil-red transition-all"
                    />
                  </div>
                </div>

                {/* Product Category Field */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    Product
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="w-full px-4 py-2.5 rounded-none bg-slate-900/90 border border-white/15 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-ssil-red transition-all"
                  />
                </div>

                {/* Product ID / Model Field */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    Product ID
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Product ID / Model Name"
                    className="w-full px-4 py-2.5 rounded-none bg-slate-900/90 border border-white/15 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-ssil-red transition-all"
                  />
                </div>

                {/* Enquiry Text Area */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    Enquiry <span className="text-ssil-red">*</span>
                  </label>
                  <textarea
                    name="enquiry"
                    required
                    rows={3}
                    value={formData.enquiry}
                    onChange={handleChange}
                    placeholder="Tell us about your project requirements, quantities, or technical specifications..."
                    className="w-full px-4 py-2.5 rounded-none bg-slate-900/90 border border-white/15 text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-ssil-red transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full px-8 py-3.5 rounded-none bg-ssil-red hover:bg-ssil-red-600 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-lg flex items-center justify-center gap-2 group"
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
