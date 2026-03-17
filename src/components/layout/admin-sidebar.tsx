"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Truck,
  Wrench,
  MapPin,
  FileText,
  Star,
  Calculator,
  FileEdit,
  Mail,
  Settings,
  ClipboardList,
  Package,
  CarFront,
  Megaphone,
  Image,
  ScrollText,
  Building2,
  BarChart3,
  Link2,
  ArrowRightLeft,
  LogOut,
  Shield,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const NAV_GROUPS = [
  {
    label: "Genel",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "İçerik",
    items: [
      {
        label: "Sayfalar",
        icon: FileEdit,
        isAccordion: true,
        children: [
          { label: "Sözleşmeler", href: "/admin/contracts", icon: ScrollText },
          { label: "Politikalar", href: "/admin/policies", icon: Shield },
        ],
      },
      { label: "Hizmetler", href: "/admin/services", icon: Truck },
      { label: "Çözümler", href: "/admin/solutions", icon: Wrench },
      { label: "Bölgeler", href: "/admin/regions", icon: MapPin },
      { label: "Blog", href: "/admin/blog", icon: FileText },
    ],
  },
  {
    label: "Müşteri",
    items: [
      { label: "Mesajlar", href: "/admin/messages", icon: Mail },
      { label: "Teklifler", href: "/admin/quotes", icon: ClipboardList },
      { label: "Keşif Talepleri", href: "/admin/surveys", icon: ClipboardList },
      { label: "Taşıma Takip", href: "/admin/tracking", icon: Package },
      { label: "Yorumlar", href: "/admin/reviews", icon: Star },
    ],
  },
  {
    label: "Yönetim",
    items: [
      { label: "Medya Kütüphanesi", href: "/admin/media", icon: Image },
      {
        label: "Fiyatlandırma",
        icon: Calculator,
        isAccordion: true,
        children: [
          { label: "Fiyat Sayfaları", href: "/admin/pricing-pages", icon: FileText },
          { label: "Fiyat Modülleri", href: "/admin/pricing", icon: Calculator },
          { label: "Fiyat Hesaplama", href: "/admin/pricing-config", icon: Calculator },
        ],
      },
      { label: "Kampanyalar", href: "/admin/campaigns", icon: Megaphone },
      { label: "Galeri", href: "/admin/gallery", icon: Image },
      { label: "Müşteri Logoları", href: "/admin/clients", icon: Building2 },
      { label: "Araç Filosu", href: "/admin/fleet", icon: CarFront },
    ],
  },
  {
    label: "SEO",
    items: [
      { label: "Rating", href: "/admin/ratings", icon: BarChart3 },
      { label: "İç Linkleme", href: "/admin/internal-links", icon: Link2 },
      { label: "Redirects & 404", href: "/admin/redirects", icon: ArrowRightLeft },
    ],
  },
  {
    label: "Sistem",
    items: [
      {
        label: "Ayarlar",
        icon: Settings,
        isAccordion: true,
        children: [
          { label: "Footer", href: "/admin/footer", icon: FileEdit },
        ],
      },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="flex h-screen w-64 flex-col bg-[#122032] text-white">
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <Truck className="h-7 w-7 text-[#e3000f]" />
        <div>
          <p className="text-sm font-bold leading-tight">Kozcuoğlu</p>
          <p className="text-[10px] text-white/50">Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
              {group.label}
            </p>
            {group.items.map((item: any) => {
              if (item.isAccordion) {
                const accordionKey = `${group.label}-${item.label}`;
                const isOpen = openAccordions[accordionKey];
                const hasActiveChild = item.children?.some(
                  (child: any) => pathname === child.href || pathname.startsWith(child.href + "/")
                );

                return (
                  <div key={accordionKey}>
                    <button
                      onClick={() => toggleAccordion(accordionKey)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                        hasActiveChild
                          ? "bg-white/10 font-medium text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {isOpen ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children?.map((child: any) => {
                          const isActive = pathname === child.href || pathname.startsWith(child.href + "/");
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors",
                                isActive
                                  ? "bg-white/10 font-medium text-white"
                                  : "text-white/60 hover:bg-white/5 hover:text-white"
                              )}
                            >
                              <child.icon className="h-3.5 w-3.5 shrink-0" />
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-white/10 font-medium text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={() => signOut({ callbackUrl: "/admin" })}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
