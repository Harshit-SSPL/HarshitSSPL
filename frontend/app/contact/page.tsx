"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

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
        message: "",
      });
    }, 4000);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pt-32 sm:pt-36 md:pt-40 pb-16 md:pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-5 lg:items-start">
          
          {/* Left Column (40% width / lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-ssil-red block mb-2">
                CONTACT US
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Get In Touch
              </h1>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Have questions about our lighting solutions, products, or project requirements? Our team is ready to assist you with complete lighting solutions tailored to your needs.
            </p>

            {/* Contact Info Blocks */}
            <div className="space-y-4 pt-4">
              {/* Email Block */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:border-ssil-red/50">
                <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-slate-800 flex items-center justify-center text-ssil-red shrink-0 mt-0.5">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                    Email Us
                  </h3>
                  <a
                    href="mailto:ssilindia2006@gmail.com"
                    className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-ssil-red transition-colors"
                  >
                    ssilindia2006@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Block */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:border-ssil-red/50">
                <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-slate-800 flex items-center justify-center text-ssil-red shrink-0 mt-0.5">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                    Call Us
                  </h3>
                  <a
                    href="tel:+919999590064"
                    className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-ssil-red transition-colors"
                  >
                    +91 9999590064
                  </a>
                </div>
              </div>

              {/* Address Block */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all hover:border-ssil-red/50">
                <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-slate-800 flex items-center justify-center text-ssil-red shrink-0 mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                    Corporate Location
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Haryana, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form (60% width / lg:col-span-3) */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 md:p-10 border border-slate-200/80 dark:border-slate-800/80 shadow-xl dark:shadow-2xl">
              
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-6">
                Send Us A Message
              </h2>

              {submitted ? (
                <div className="p-6 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-center space-y-3">
                  <CheckCircle2 className="h-12 w-12 text-ssil-red mx-auto" />
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Thank you for contacting Shiv Shakti India Limited. Our technical team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First & Last Name Grid */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        First Name <span className="text-ssil-red">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-ssil-red focus:ring-1 focus:ring-ssil-red transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Last Name <span className="text-ssil-red">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-ssil-red focus:ring-1 focus:ring-ssil-red transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Email <span className="text-ssil-red">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-ssil-red focus:ring-1 focus:ring-ssil-red transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9999590064"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-ssil-red focus:ring-1 focus:ring-ssil-red transition-all"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Message <span className="text-ssil-red">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project requirements or inquiry..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-ssil-red focus:ring-1 focus:ring-ssil-red transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-ssil-red hover:bg-red-700 text-white font-extrabold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-red-600/30 flex items-center justify-center gap-2 group"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
