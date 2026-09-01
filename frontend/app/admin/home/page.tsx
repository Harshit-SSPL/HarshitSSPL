"use client";

import React, { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2, TrendingUp, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchApi, uploadImageFile } from "@/lib/admin-api";

export default function AdminHomePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 4 Stats State
  const [stats, setStats] = useState({
    deployedFootprints: { value: 20000, suffix: "+", label: "Poles & Lighting Installations", sublabel: "DEPLOYED FOOTPRINT" },
    yearsExperience: { value: 12, suffix: "+", label: "Years of Experience", sublabel: "ENGINEERING HERITAGE" },
    statesServed: { value: 22, suffix: "+", label: "States & UTs Across India", sublabel: "PAN-INDIA PRESENCE" },
    projectsCompleted: { value: 500, suffix: "+", label: "Government & Private Projects", sublabel: "EXECUTED CONTRACTS" },
  });

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const res = await fetchApi("/home/stats");
        if (res.success && res.stats) {
          setStats({
            deployedFootprints: res.stats.deployedFootprints || stats.deployedFootprints,
            yearsExperience: res.stats.yearsExperience || stats.yearsExperience,
            statesServed: res.stats.statesServed || stats.statesServed,
            projectsCompleted: res.stats.projectsCompleted || stats.projectsCompleted,
          });
        }
      } catch (e) {
        console.warn("Using default stats");
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage(null);

    try {
      const res = await fetchApi("/home/stats", {
        method: "PUT",
        body: JSON.stringify(stats),
      });

      if (res.success) {
        setSuccessMessage("Home statistics updated successfully! Live website reflects changes.");
        setTimeout(() => setSuccessMessage(null), 4000);
      }
    } catch (err: any) {
      alert(err.message || "Failed to update statistics");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-ssil-red animate-spin mb-3" />
        <span className="text-xs font-bold text-slate-500 uppercase">Loading Home Page CMS...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-ssil-red block mb-1">
            HOME PAGE CMS
          </span>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
            Company Statistics &amp; Metrics
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Edit the 4 scale metrics displayed on the Home page credibility section.
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

      {/* 4 Statistics Form */}
      <form onSubmit={handleSaveStats} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* 1. Deployed Footprints */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
              <span className="text-xs font-black uppercase text-ssil-red">Stat 1: Deployed Footprints</span>
              <span className="text-[10px] font-bold uppercase text-slate-400">COUNTER #1</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Target Counter Value</label>
              <input
                type="number"
                required
                value={stats.deployedFootprints.value}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    deployedFootprints: { ...stats.deployedFootprints, value: Number(e.target.value) },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Suffix</label>
                <input
                  type="text"
                  value={stats.deployedFootprints.suffix}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      deployedFootprints: { ...stats.deployedFootprints, suffix: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Sublabel (Badge)</label>
                <input
                  type="text"
                  value={stats.deployedFootprints.sublabel}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      deployedFootprints: { ...stats.deployedFootprints, sublabel: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Main Label</label>
              <input
                type="text"
                value={stats.deployedFootprints.label}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    deployedFootprints: { ...stats.deployedFootprints, label: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium"
              />
            </div>
          </div>

          {/* 2. Years of Experience */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
              <span className="text-xs font-black uppercase text-ssil-red">Stat 2: Experience</span>
              <span className="text-[10px] font-bold uppercase text-slate-400">COUNTER #2</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Years Value</label>
              <input
                type="number"
                required
                value={stats.yearsExperience.value}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    yearsExperience: { ...stats.yearsExperience, value: Number(e.target.value) },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Suffix</label>
                <input
                  type="text"
                  value={stats.yearsExperience.suffix}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      yearsExperience: { ...stats.yearsExperience, suffix: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Sublabel (Badge)</label>
                <input
                  type="text"
                  value={stats.yearsExperience.sublabel}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      yearsExperience: { ...stats.yearsExperience, sublabel: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Main Label</label>
              <input
                type="text"
                value={stats.yearsExperience.label}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    yearsExperience: { ...stats.yearsExperience, label: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium"
              />
            </div>
          </div>

          {/* 3. States Served */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
              <span className="text-xs font-black uppercase text-ssil-red">Stat 3: States &amp; UTs</span>
              <span className="text-[10px] font-bold uppercase text-slate-400">COUNTER #3</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">States Count</label>
              <input
                type="number"
                required
                value={stats.statesServed.value}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    statesServed: { ...stats.statesServed, value: Number(e.target.value) },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Suffix</label>
                <input
                  type="text"
                  value={stats.statesServed.suffix}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      statesServed: { ...stats.statesServed, suffix: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Sublabel (Badge)</label>
                <input
                  type="text"
                  value={stats.statesServed.sublabel}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      statesServed: { ...stats.statesServed, sublabel: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Main Label</label>
              <input
                type="text"
                value={stats.statesServed.label}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    statesServed: { ...stats.statesServed, label: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium"
              />
            </div>
          </div>

          {/* 4. Projects Completed */}
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
              <span className="text-xs font-black uppercase text-ssil-red">Stat 4: Projects Completed</span>
              <span className="text-[10px] font-bold uppercase text-slate-400">COUNTER #4</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Projects Count</label>
              <input
                type="number"
                required
                value={stats.projectsCompleted.value}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    projectsCompleted: { ...stats.projectsCompleted, value: Number(e.target.value) },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-sm font-bold"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Suffix</label>
                <input
                  type="text"
                  value={stats.projectsCompleted.suffix}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      projectsCompleted: { ...stats.projectsCompleted, suffix: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Sublabel (Badge)</label>
                <input
                  type="text"
                  value={stats.projectsCompleted.sublabel}
                  onChange={(e) =>
                    setStats({
                      ...stats,
                      projectsCompleted: { ...stats.projectsCompleted, sublabel: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">Main Label</label>
              <input
                type="text"
                value={stats.projectsCompleted.label}
                onChange={(e) =>
                  setStats({
                    ...stats,
                    projectsCompleted: { ...stats.projectsCompleted, label: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-xs font-medium"
              />
            </div>
          </div>

        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={saving}
            className="bg-ssil-red hover:bg-ssil-red-600 text-white font-bold px-7 py-2.5 rounded-xl text-xs sm:text-sm shadow-md"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Statistics Changes
              </>
            )}
          </Button>
        </div>

      </form>

    </div>
  );
}
