"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText, Settings, Users, MessageSquare, BarChart3, Truck, Image, Tag, MapPin, Star, Package, Calendar, Shield, ArrowRight } from "lucide-react";

const ADMIN_PAGES = [
  { label: "Dashboard", href: "/admin/dashboard", icon: BarChart3, keywords: "ana sayfa özet" },
  { label: "Hizmetler", href: "/admin/services", icon: FileText, keywords: "hizmet servis" },
  { label: "Çözümler", href: "/admin/solutions", icon: Package, keywords: "çözüm solution" },
  { label: "Bölgeler", href: "/admin/regions", icon: MapPin, keywords: "bölge ilçe şehir" },
  { label: "Blog", href: "/admin/blog", icon: FileText, keywords: "blog yazı makale" },
  { label: "Yorumlar", href: "/admin/reviews", icon: Star, keywords: "yorum değerlendirme" },
  { label: "Mesajlar", href: "/admin/messages", icon: MessageSquare, keywords: "mesaj iletişim form" },
  { label: "Keşif Talepleri", href: "/admin/surveys", icon: Users, keywords: "keşif talep müşteri" },
  { label: "Taşıma Takip", href: "/admin/tracking", icon: Truck, keywords: "takip taşıma nakliyat" },
  { label: "Araç Filosu", href: "/admin/fleet", icon: Truck, keywords: "araç filo kamyon" },
  { label: "Kampanyalar", href: "/admin/campaigns", icon: Calendar, keywords: "kampanya indirim" },
  { label: "Galeri", href: "/admin/gallery", icon: Image, keywords: "galeri fotoğraf video" },
  { label: "Fiyat Modülleri", href: "/admin/pricing", icon: Tag, keywords: "fiyat hesaplama modül" },
  { label: "Sayfalar", href: "/admin/pages", icon: FileText, keywords: "sayfa içerik" },
  { label: "Ayarlar", href: "/admin/settings", icon: Settings, keywords: "ayar site nap logo" },
  { label: "301 Yönlendirmeler", href: "/admin/redirects", icon: ArrowRight, keywords: "redirect yönlendirme 301" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = ADMIN_PAGES.filter((p) => {
    const q = query.toLowerCase();
    return p.label.toLowerCase().includes(q) || p.keywords.toLowerCase().includes(q);
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") setOpen(false);
    },
    []
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function navigate(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      navigate(filtered[selectedIndex].href);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]" onClick={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg rounded-xl border bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleInputKeyDown}
            placeholder="Sayfa ara... (Cmd+K)"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button onClick={() => setOpen(false)} className="rounded p-1 hover:bg-gray-100">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">Sonuç bulunamadı</p>
          ) : (
            filtered.map((page, i) => {
              const Icon = page.icon;
              return (
                <button
                  key={page.href}
                  onClick={() => navigate(page.href)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    i === selectedIndex ? "bg-[#122032] text-white" : "text-[#122032] hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="font-medium">{page.label}</span>
                </button>
              );
            })
          )}
        </div>
        <div className="border-t px-4 py-2 text-xs text-muted-foreground">
          <span className="rounded border px-1.5 py-0.5 font-mono text-[10px]">↑↓</span> gezin
          <span className="ml-2 rounded border px-1.5 py-0.5 font-mono text-[10px]">↵</span> aç
          <span className="ml-2 rounded border px-1.5 py-0.5 font-mono text-[10px]">esc</span> kapat
        </div>
      </div>
    </div>
  );
}
