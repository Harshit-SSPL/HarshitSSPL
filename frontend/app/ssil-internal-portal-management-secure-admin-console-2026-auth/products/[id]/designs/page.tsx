"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { ADMIN_BASE_PATH } from "@/lib/admin-api";

export default function AdminProductDesignsRedirectPage() {
  const params = useParams();
  const productId = params?.id as string;
  const router = useRouter();

  useEffect(() => {
    if (productId) {
      router.replace(`${ADMIN_BASE_PATH}/products/${productId}`);
    }
  }, [productId, router]);

  return (
    <div className="p-16 flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 text-ssil-red animate-spin mb-4" />
      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
        Opening Product Studio...
      </span>
    </div>
  );
}
