"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { fetchApi } from "@/lib/admin-api";

interface AdminUser {
  id: string;
  username: string;
  role: string;
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  loading: boolean;
  login: (token: string, user: AdminUser) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  admin: null,
  loading: true,
  login: () => {},
  logout: async () => {},
  isAuthenticated: false,
});

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("ssil_admin_token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetchApi("/auth/me");
        if (res.success && res.admin) {
          setAdmin(res.admin);
        } else {
          localStorage.removeItem("ssil_admin_token");
          setAdmin(null);
        }
      } catch (err) {
        localStorage.removeItem("ssil_admin_token");
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token: string, user: AdminUser) => {
    localStorage.setItem("ssil_admin_token", token);
    setAdmin(user);
  };

  const logout = async () => {
    try {
      await fetchApi("/auth/logout", { method: "POST" });
    } catch (e) {
      // ignore
    } finally {
      localStorage.removeItem("ssil_admin_token");
      setAdmin(null);
      router.push("/admin/login");
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
