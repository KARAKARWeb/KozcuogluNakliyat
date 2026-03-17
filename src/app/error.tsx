"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e3000f]/10">
        <AlertTriangle className="h-10 w-10 text-[#e3000f]" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-[#122032]">Bir Hata Oluştu</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Beklenmeyen bir hata meydana geldi. Lütfen tekrar deneyin veya ana sayfaya dönün.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-lg bg-[#e3000f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#c5000d]"
        >
          <RefreshCw className="h-4 w-4" /> Tekrar Dene
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium text-[#122032] transition hover:bg-[#f5f5f5]"
        >
          <Home className="h-4 w-4" /> Ana Sayfa
        </Link>
      </div>
    </div>
  );
}
