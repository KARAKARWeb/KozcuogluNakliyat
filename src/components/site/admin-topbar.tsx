"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileEdit, Settings, ExternalLink } from "lucide-react";

function getEditUrl(pathname: string): string | null {
  if (pathname === "/") return "/admin/pages";
  if (pathname.startsWith("/blog/")) return "/admin/blog";
  if (pathname === "/blog") return "/admin/blog";
  if (pathname === "/galeri") return "/admin/gallery";
  if (pathname === "/hizmet-bolgeleri") return "/admin/regions";
  if (pathname === "/hizmetlerimiz") return "/admin/services";
  if (pathname === "/cozumlerimiz") return "/admin/solutions";
  if (pathname === "/sozlesmeler") return "/admin/contracts";
  if (pathname === "/iletisim") return "/admin/messages";
  if (pathname === "/kampanyalar") return "/admin/campaigns";
  if (pathname === "/referanslarimiz") return "/admin/reviews";
  if (pathname === "/fiyatlarimiz") return "/admin/pricing";
  if (pathname === "/araclarimiz") return "/admin/fleet";
  if (pathname === "/ekibimiz") return "/admin/pages";
  if (pathname === "/hakkimizda") return "/admin/pages";
  return null;
}

function hasSessionCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((c) => c.trim().startsWith("next-auth.session-token=") || c.trim().startsWith("__Secure-next-auth.session-token="));
}

export default function AdminTopbar() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(hasSessionCookie());
  }, []);

  if (!isAdmin) return null;
  if (pathname.startsWith("/admin")) return null;

  const editUrl = getEditUrl(pathname);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] flex h-8 items-center justify-between bg-[#1d2327] px-3 text-xs text-white/80 shadow-md">
      <div className="flex items-center gap-3">
        <Link href="/admin/dashboard" className="flex items-center gap-1.5 transition hover:text-white">
          <LayoutDashboard className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
        {editUrl && (
          <Link href={editUrl} className="flex items-center gap-1.5 transition hover:text-white">
            <FileEdit className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sayfayı Düzenle</span>
          </Link>
        )}
        <Link href="/admin/settings" className="flex items-center gap-1.5 transition hover:text-white">
          <Settings className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Ayarlar</span>
        </Link>
      </div>
      <Link href="/admin/dashboard" className="flex items-center gap-1 transition hover:text-white">
        <ExternalLink className="h-3 w-3" />
        <span>Admin Panel</span>
      </Link>
    </div>
  );
}
