"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, ExternalLink, Bell, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "error";
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [clearing, setClearing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  async function clearAllCaches() {
    if (!confirm('Tüm cache\'ler temizlenecek ve site yenilenecek. Devam etmek istiyor musunuz?')) return;
    
    setClearing(true);
    
    try {
      // Clear Next.js cache via API
      await fetch('/api/cache/clear', { method: 'POST' });
      
      // Clear browser caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
      
      // Clear localStorage
      localStorage.clear();
      
      // Clear sessionStorage
      sessionStorage.clear();
      
      // Clear cookies (except auth)
      document.cookie.split(";").forEach(c => {
        const name = c.split("=")[0].trim();
        if (!name.includes('auth') && !name.includes('session')) {
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
      });
      
      alert('Tüm cache\'ler temizlendi! Site yenileniyor...');
      
      // Hard reload
      window.location.href = window.location.href + '?nocache=' + Date.now();
    } catch (error) {
      alert('Cache temizleme hatası: ' + error);
    } finally {
      setClearing(false);
    }
  }

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((j) => { if (j.success) setNotifications(j.data.slice(0, 10)); })
      .catch(() => {});
    const interval = setInterval(() => {
      fetch("/api/notifications")
        .then((r) => r.json())
        .then((j) => { if (j.success) setNotifications(j.data.slice(0, 10)); })
        .catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function markAllRead() {
    await fetch("/api/notifications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "markAllRead" }) });
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  const typeColor = (t: string) => t === "error" ? "bg-red-500" : t === "warning" ? "bg-yellow-500" : t === "success" ? "bg-green-500" : "bg-blue-500";

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={clearAllCaches}
          disabled={clearing}
          title="Tüm Cache'leri Temizle"
          className="relative"
        >
          <Trash2 className={`h-5 w-5 ${clearing ? 'animate-pulse text-red-500' : ''}`} />
        </Button>

        <div className="relative" ref={dropdownRef}>
          <Button variant="ghost" size="icon" className="relative" onClick={() => setShowDropdown(!showDropdown)}>
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e3000f] px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </Button>
          {showDropdown && (
            <div className="absolute right-0 top-full z-50 mt-1 w-80 rounded-xl border bg-white shadow-xl">
              <div className="flex items-center justify-between border-b px-4 py-2.5">
                <span className="text-sm font-semibold">Bildirimler</span>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="flex items-center gap-1 text-xs text-[#e3000f] hover:underline">
                    <Check className="h-3 w-3" /> Tümünü Okundu
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-muted-foreground">Bildirim yok</p>
                ) : (
                  notifications.map((n) => (
                    <Link
                      key={n.id}
                      href={n.link || "/admin/dashboard"}
                      onClick={() => setShowDropdown(false)}
                      className={`flex gap-2.5 border-b px-4 py-3 transition hover:bg-gray-50 ${!n.isRead ? "bg-blue-50/50" : ""}`}
                    >
                      <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${typeColor(n.type)}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="truncate text-xs text-muted-foreground">{n.message}</p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">{new Date(n.createdAt).toLocaleString("tr-TR")}</p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <Link href="/" target="_blank">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <ExternalLink className="h-3.5 w-3.5" />
            Siteyi Göster
          </Button>
        </Link>
        <div className="text-right">
          <p className="text-sm font-medium">{session?.user?.name || "Admin"}</p>
          <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#122032] text-sm font-bold text-white">
          {(session?.user?.name || "A").charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
