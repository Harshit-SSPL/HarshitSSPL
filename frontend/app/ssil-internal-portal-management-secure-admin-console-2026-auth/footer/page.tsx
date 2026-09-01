"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/lib/admin-api";

export default function AdminFooterPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formState, setFormState] = useState({
    corporateOfficeAddress: "Office No- 812A, 814, Puri High Street, Sector 81-121002, Faridabad, Haryana, India",
    factoryAddress: "Plot No. 5, Sector 65, Village Sahupura, Ballabgarh, 121004, Faridabad, Haryana, India",
    phone1: "+91 9999590064",
    phone2: "+91 9999990064",
    email: "ssindia2006@gmail.com",
    gmapsCorporateQuery: "812A%2C+814%2C+Puri+High+Street%2C+Sector+81-121002%2C+Faridabad%2C+Haryana%2C+India",
    gmapsFactoryQuery: "Plot+No.+5%2C+Sector+65%2C+Village+Sahupura%2C+Ballabgarh%2C+121004%2C+Faridabad%2C+Haryana%2C+India",
  });

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const res = await fetchApi("/footer");
        if (res.success && res.footer) {
          setFormState({
            corporateOfficeAddress: res.footer.corporateOfficeAddress || formState.corporateOfficeAddress,
            factoryAddress: res.footer.factoryAddress || formState.factoryAddress,
            phone1: res.footer.phone1 || formState.phone1,
            phone2: res.footer.phone2 || formState.phone2,
            email: res.footer.email || formState.email,
            gmapsCorporateQuery: res.footer.gmapsCorporateQuery || formState.gmapsCorporateQuery,
            gmapsFactoryQuery: res.footer.gmapsFactoryQuery || formState.gmapsFactoryQuery,
          });
        }
      } catch (e) {
        console.warn("Using default footer content");
      } finally {
        setLoading(false);
      }
    };

    loadFooter();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);

    try {
      const res = await fetchApi("/footer", {
        method: "PUT",
        body: JSON.stringify(formState),
      });

      if (res.success) {
        setSuccessMessage("Footer settings updated successfully! Live website footer reflects changes.");
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } catch (err: any) {
      alert(err.message || "Failed to update footer settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-ssil-red animate-spin mb-3" />
        <span className="text-xs font-bold text-slate-500 uppercase">Loading Footer CMS...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-ssil-red block mb-1">
            FOOTER &amp; CONTACT CMS
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Corporate Office &amp; Factory Contact Info
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage the global office address, factory location, phone numbers, and inquiry email in the footer.
          </p>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-5">
        
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-ssil-red" />
            <span>Corporate Office Address</span>
          </label>
          <textarea
            rows={2}
            required
            value={formState.corporateOfficeAddress}
            onChange={(e) => setFormState({ ...formState, corporateOfficeAddress: e.target.value })}
            className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-ssil-red" />
            <span>Factory Address</span>
          </label>
          <textarea
            rows={2}
            required
            value={formState.factoryAddress}
            onChange={(e) => setFormState({ ...formState, factoryAddress: e.target.value })}
            className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-ssil-red" />
              <span>Primary Phone Number</span>
            </label>
            <input
              type="text"
              required
              value={formState.phone1}
              onChange={(e) => setFormState({ ...formState, phone1: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-ssil-red" />
              <span>Secondary Phone Number</span>
            </label>
            <input
              type="text"
              value={formState.phone2}
              onChange={(e) => setFormState({ ...formState, phone2: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-ssil-red" />
            <span>Official Email Address</span>
          </label>
          <input
            type="email"
            required
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs sm:text-sm font-medium"
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
                <span>Saving Footer Changes...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Footer Changes</span>
              </>
            )}
          </Button>
        </div>

      </form>

    </div>
  );
}
