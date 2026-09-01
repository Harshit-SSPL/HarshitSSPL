"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Save, Loader2, CheckCircle2, Layers, Building2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchApi, ADMIN_BASE_PATH } from "@/lib/admin-api";

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    heading: "Delivering Dependable Infrastructure Lighting Solutions Across India",
    subheading: "Integrated Design, Precision Engineering, and In-House Hot-Dip Galvanizing",
    mainDescription:
      "Shiv Shakti India Limited (SSIL) is a premier manufacturer and infrastructure solutions provider specializing in high-performance outdoor lighting systems, high-tensile octagonal steel poles, monumental high masts, smart camera poles, and energy-efficient LED luminaires.",
    supportingText:
      "With state-of-the-art manufacturing infrastructure and an in-house hot-dip galvanizing plant, SSIL delivers turn-key execution for expressways, smart cities, municipal corporations, stadium complexes, and national landmarks across India.",
  });

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const res = await fetchApi("/about");
        if (res.success && res.about) {
          setFormState({
            heading: res.about.heading || formState.heading,
            subheading: res.about.subheading || formState.subheading,
            mainDescription: res.about.mainDescription || formState.mainDescription,
            supportingText: res.about.supportingText || formState.supportingText,
          });
        }
      } catch (e) {
        console.warn("Using default about content");
      } finally {
        setLoading(false);
      }
    };

    loadAbout();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);

    try {
      const res = await fetchApi("/about", {
        method: "PUT",
        body: JSON.stringify(formState),
      });

      if (res.success) {
        setSuccessMessage("About Us content updated successfully! Live page reflects changes.");
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } catch (err: any) {
      alert(err.message || "Failed to update About Us content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-ssil-red animate-spin mb-3" />
        <span className="text-xs font-bold text-slate-500 uppercase">Loading About Us CMS...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-ssil-red block mb-1">
            ABOUT US CMS
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Company Profile &amp; Mission Text
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Edit the main narrative text displayed on the public About Us page.
          </p>
        </div>
      </div>

      {/* Shared National Projects Notification Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-amber-600 shrink-0" />
          <div className="text-xs">
            <strong className="text-amber-900 dark:text-amber-200 block font-bold uppercase">
              Shared National Projects Component
            </strong>
            <span className="text-amber-700 dark:text-amber-300">
              The &quot;Powering National Projects&quot; ticker on About Us uses the shared national projects database.
            </span>
          </div>
        </div>
        <Button asChild size="sm" variant="outline" className="text-xs font-bold rounded-xl shrink-0">
          <Link href={`${ADMIN_BASE_PATH}/national-projects`}>
            <span>Manage Projects</span>
            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* About Content Form */}
      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-5">
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Main Section Heading
          </label>
          <input
            type="text"
            required
            value={formState.heading}
            onChange={(e) => setFormState({ ...formState, heading: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Subheading / Accent Line
          </label>
          <input
            type="text"
            value={formState.subheading}
            onChange={(e) => setFormState({ ...formState, subheading: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Primary Description Paragraph
          </label>
          <textarea
            rows={4}
            required
            value={formState.mainDescription}
            onChange={(e) => setFormState({ ...formState, mainDescription: e.target.value })}
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-medium leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Supporting Paragraph / Infrastructure Capabilities
          </label>
          <textarea
            rows={4}
            value={formState.supportingText}
            onChange={(e) => setFormState({ ...formState, supportingText: e.target.value })}
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-medium leading-relaxed"
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={saving}
            className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-7 py-2.5 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save About Us Changes</span>
              </>
            )}
          </Button>
        </div>

      </form>

    </div>
  );
}
