"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  Package,
  MessageSquare,
  CheckCircle2,
  Clock,
  Trash2,
  ExternalLink,
  ChevronRight,
  X,
  Send,
  Loader2,
  AlertCircle,
  Tag,
  User,
} from "lucide-react";
import { fetchApi } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";

interface Enquiry {
  _id: string;
  type: "product_enquiry" | "contact_message";
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  productCategory?: string;
  productModel?: string;
  message: string;
  status: "new" | "reviewed" | "replied";
  notes?: string;
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "new" | "product_enquiry" | "contact_message">("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadEnquiries = async (isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    try {
      const res = await fetchApi("/enquiries/admin/all");
      if (res.success && Array.isArray(res.enquiries)) {
        setEnquiries(res.enquiries);
        // If modal is open, update selected enquiry data as well
        if (selectedEnquiry) {
          const updated = res.enquiries.find((e: Enquiry) => e._id === selectedEnquiry._id);
          if (updated) setSelectedEnquiry(updated);
        }
      }
    } catch (err) {
      console.error("Failed to load enquiries:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: "new" | "reviewed" | "replied") => {
    setUpdatingStatusId(id);
    try {
      const res = await fetchApi(`/enquiries/admin/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.success && res.enquiry) {
        setEnquiries((prev) =>
          prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry?._id === id) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Failed to update enquiry status:", err);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this enquiry?")) {
      return;
    }
    setDeletingId(id);
    try {
      const res = await fetchApi(`/enquiries/admin/${id}`, {
        method: "DELETE",
      });
      if (res.success) {
        setEnquiries((prev) => prev.filter((e) => e._id !== id));
        if (selectedEnquiry?._id === id) {
          setSelectedEnquiry(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete enquiry:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered list based on activeTab and searchQuery
  const filteredEnquiries = enquiries.filter((item) => {
    // Tab filter
    if (activeTab === "new" && item.status !== "new") return false;
    if (activeTab === "product_enquiry" && item.type !== "product_enquiry") return false;
    if (activeTab === "contact_message" && item.type !== "contact_message") return false;

    // Search query filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameMatch = (item.fullName || `${item.firstName} ${item.lastName}`).toLowerCase().includes(q);
    const emailMatch = (item.email || "").toLowerCase().includes(q);
    const phoneMatch = (item.phone || "").toLowerCase().includes(q);
    const prodCatMatch = (item.productCategory || "").toLowerCase().includes(q);
    const prodModMatch = (item.productModel || "").toLowerCase().includes(q);
    const msgMatch = (item.message || "").toLowerCase().includes(q);

    return nameMatch || emailMatch || phoneMatch || prodCatMatch || prodModMatch || msgMatch;
  });

  const totalCount = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === "new").length;
  const productCount = enquiries.filter((e) => e.type === "product_enquiry").length;
  const contactCount = enquiries.filter((e) => e.type === "contact_message").length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-ssil-red">
              Customer Leads & Messages
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-serif">
            Enquiries Console
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            View and manage all customer product inquiries and contact form submissions stored securely in MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => loadEnquiries(true)}
            variant="outline"
            size="sm"
            disabled={refreshing}
            className="rounded-2xl border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold flex items-center gap-2 shadow-xs"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin text-ssil-red" : ""}`} />
            <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Received
            </span>
            <div className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
              <Inbox className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {totalCount}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Unread / New
            </span>
            <div className="h-8 w-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
              {newCount}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Product Enquiries
            </span>
            <div className="h-8 w-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600">
              <Package className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {productCount}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Contact Form
            </span>
            <div className="h-8 w-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
              <MessageSquare className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {contactCount}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-slate-200/90 dark:border-zinc-800 shadow-xs">
        
        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "all"
                ? "bg-slate-900 text-white dark:bg-white dark:text-zinc-900 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
            }`}
          >
            All Enquiries ({totalCount})
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === "new"
                ? "bg-amber-500 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            Unread ({newCount})
          </button>
          <button
            onClick={() => setActiveTab("product_enquiry")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "product_enquiry"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
            }`}
          >
            Products ({productCount})
          </button>
          <button
            onClick={() => setActiveTab("contact_message")}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "contact_message"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
            }`}
          >
            Contact ({contactCount})
          </button>
        </div>

        {/* Search Field */}
        <div className="relative min-w-[240px] md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, model..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/80 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-ssil-red focus:ring-1 focus:ring-ssil-red transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main List Table */}
      {loading ? (
        <div className="p-16 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/90 dark:border-zinc-800 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 text-ssil-red animate-spin mb-3" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Loading Customer Enquiries...
          </p>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="p-16 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200/90 dark:border-zinc-800 flex flex-col items-center justify-center space-y-3">
          <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-400">
            <Inbox className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No Enquiries Found
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            {searchQuery
              ? `No enquiries match "${searchQuery}". Try changing your search query.`
              : "No customer submissions in this view yet. New form submissions will appear here automatically."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEnquiries.map((enquiry) => {
            const isProduct = enquiry.type === "product_enquiry";
            const formattedDate = new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={enquiry._id}
                className={`group bg-white dark:bg-zinc-900 rounded-3xl border transition-all duration-200 p-5 sm:p-6 shadow-xs hover:shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-5 ${
                  enquiry.status === "new"
                    ? "border-amber-300 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/10"
                    : "border-slate-200/80 dark:border-zinc-800 hover:border-ssil-red/40"
                }`}
              >
                {/* Left info column */}
                <div className="space-y-3 flex-1 min-w-0">
                  
                  {/* Top line: Type Badge + Status + Timestamp */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {isProduct ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 font-extrabold text-[11px] tracking-wide">
                        <Package className="h-3.5 w-3.5" />
                        Product Enquiry
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 font-extrabold text-[11px] tracking-wide">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Contact Us Form
                      </span>
                    )}

                    {/* Status Pill */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        enquiry.status === "new"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300"
                          : enquiry.status === "reviewed"
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300"
                          : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300"
                      }`}
                    >
                      {enquiry.status === "new" && <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />}
                      {enquiry.status}
                    </span>

                    {/* Product Model / Category Tag if available */}
                    {enquiry.productModel && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                        <Tag className="h-3 w-3 text-ssil-red" />
                        {enquiry.productModel}
                      </span>
                    )}

                    <span className="text-slate-400 dark:text-zinc-500 text-[11px] font-medium flex items-center gap-1 ml-auto lg:ml-0">
                      <Calendar className="h-3 w-3" />
                      {formattedDate}
                    </span>
                  </div>

                  {/* Customer Identity Line */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-200">
                        {enquiry.firstName?.[0]?.toUpperCase() || "C"}
                      </div>
                      <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {enquiry.fullName || `${enquiry.firstName} ${enquiry.lastName}`}
                      </span>
                    </div>

                    <a
                      href={`mailto:${enquiry.email}`}
                      className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-ssil-red flex items-center gap-1 transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      {enquiry.email}
                    </a>

                    {enquiry.phone && (
                      <a
                        href={`tel:${enquiry.phone}`}
                        className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-ssil-red flex items-center gap-1 transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        {enquiry.phone}
                      </a>
                    )}
                  </div>

                  {/* Message Snippet */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 bg-slate-50/80 dark:bg-zinc-800/40 p-3 rounded-2xl border border-slate-100 dark:border-zinc-800/60 font-mono">
                    {enquiry.message || "(No message provided)"}
                  </p>
                </div>

                {/* Right action buttons */}
                <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                  <Button
                    onClick={() => setSelectedEnquiry(enquiry)}
                    size="sm"
                    className="rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-ssil-red dark:hover:bg-ssil-red dark:hover:text-white text-xs font-bold px-4 shadow-xs"
                  >
                    View Details
                  </Button>

                  {/* Quick status cycle button */}
                  <select
                    value={enquiry.status}
                    onChange={(e) =>
                      handleStatusChange(enquiry._id, e.target.value as "new" | "reviewed" | "replied")
                    }
                    disabled={updatingStatusId === enquiry._id}
                    className="h-9 px-3 rounded-2xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-ssil-red"
                  >
                    <option value="new">Status: New</option>
                    <option value="reviewed">Status: Reviewed</option>
                    <option value="replied">Status: Replied</option>
                  </select>

                  <Button
                    onClick={() => handleDelete(enquiry._id)}
                    disabled={deletingId === enquiry._id}
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl"
                    title="Delete Enquiry"
                  >
                    {deletingId === enquiry._id ? (
                      <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Full Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-5 border-b border-slate-100 dark:border-zinc-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      selectedEnquiry.type === "product_enquiry"
                        ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300"
                        : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300"
                    }`}
                  >
                    {selectedEnquiry.type === "product_enquiry" ? "Product Inquiry" : "Contact Message"}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      selectedEnquiry.status === "new"
                        ? "bg-amber-100 text-amber-800"
                        : selectedEnquiry.status === "reviewed"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {selectedEnquiry.status}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-1">
                  {selectedEnquiry.fullName || `${selectedEnquiry.firstName} ${selectedEnquiry.lastName}`}
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  Received on {new Date(selectedEnquiry.createdAt).toLocaleString("en-IN")}
                </p>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="h-8 w-8 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6 space-y-6 flex-1">
              
              {/* Customer Contact Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="text-sm font-bold text-slate-900 dark:text-white hover:text-ssil-red flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="h-4 w-4 text-ssil-red shrink-0" />
                    <span className="truncate">{selectedEnquiry.email}</span>
                  </a>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Phone Number
                  </span>
                  {selectedEnquiry.phone ? (
                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      className="text-sm font-bold text-slate-900 dark:text-white hover:text-ssil-red flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span>{selectedEnquiry.phone}</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">Not provided</span>
                  )}
                </div>
              </div>

              {/* Product Specifications (if product inquiry) */}
              {selectedEnquiry.type === "product_enquiry" && (
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs uppercase tracking-wider">
                    <Package className="h-4 w-4" />
                    Target Product Details
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 font-semibold block">Category:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {selectedEnquiry.productCategory || "General Catalog"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Model / Design ID:</span>
                      <span className="font-bold text-ssil-red">
                        {selectedEnquiry.productModel || "Standard"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Customer Message */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Customer Message / Inquiry Scope
                </span>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-sm text-slate-900 dark:text-slate-100 whitespace-pre-wrap leading-relaxed font-sans">
                  {selectedEnquiry.message || "No message written."}
                </div>
              </div>

              {/* Status Update Switcher */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Update Lead Status
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleStatusChange(selectedEnquiry._id, "new")}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all ${
                      selectedEnquiry.status === "new"
                        ? "bg-amber-500 text-white border-amber-500 shadow-md"
                        : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-zinc-700 hover:border-amber-400"
                    }`}
                  >
                    Mark as New
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedEnquiry._id, "reviewed")}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all ${
                      selectedEnquiry.status === "reviewed"
                        ? "bg-purple-600 text-white border-purple-600 shadow-md"
                        : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-zinc-700 hover:border-purple-400"
                    }`}
                  >
                    Mark as Reviewed
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedEnquiry._id, "replied")}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all ${
                      selectedEnquiry.status === "replied"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                        : "bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-zinc-700 hover:border-emerald-400"
                    }`}
                  >
                    Mark as Replied
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between gap-3">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(selectedEnquiry._id)}
                disabled={deletingId === selectedEnquiry._id}
                className="rounded-2xl text-xs font-bold"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Delete
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-2xl text-xs font-bold"
              >
                Close
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
