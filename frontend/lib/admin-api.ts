/**
 * SSIL Admin & CMS API Client
 */

export const ADMIN_BASE_PATH = "/ssil-internal-portal-management-secure-admin-console-2026-auth";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/$/, "");

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}

// Lightweight in-memory cache for GET requests with 20s TTL
const apiCache = new Map<string, { timestamp: number; data: any }>();
const CACHE_TTL_MS = 20000;

export function invalidateApiCache() {
  apiCache.clear();
}

export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const method = (options.method || "GET").toUpperCase();
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const isAdminRequest = endpoint.includes("/admin");

  // Invalidate cache on mutations
  if (method !== "GET") {
    invalidateApiCache();
  } else if (!options.body && !isAdminRequest && options.cache !== "no-store") {
    // Check GET cache for public endpoints only
    const cached = apiCache.get(url);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }
  }

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  // If not FormData, default to application/json
  if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  // Get token from localStorage if available
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("ssil_admin_token");
    if (token && !headers["Authorization"]) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // send/receive HTTP-only cookies
    });

    const data = await response.json();

    // Cache successful GET responses
    if (method === "GET" && data && data.success) {
      apiCache.set(url, { timestamp: Date.now(), data });
    }

    return data;
  } catch (error: any) {
    console.warn(`[API Fetch Warning] ${endpoint}:`, error.message);
    return {
      success: false,
      message: error.message || "Network request failed",
    };
  }
}

// Upload helper for Cloudinary / backend file upload
export async function uploadImageFile(file: File, folder = "ssil_website"): Promise<{ url: string; publicId: string }> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder", folder);

  const res = await fetchApi("/upload/single", {
    method: "POST",
    body: formData,
  });

  if (res.success && res.url) {
    return {
      url: res.url,
      publicId: res.publicId || "",
    };
  }

  throw new Error(res.message || "Image upload failed");
}
