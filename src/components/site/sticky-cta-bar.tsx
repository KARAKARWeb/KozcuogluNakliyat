"use client";

import Link from "next/link";
import { Phone, MessageCircle, Calculator, FileText } from "lucide-react";

const ITEMS = [
  { href: "tel:4447436", label: "Ara", icon: Phone, external: true },
  { href: "https://wa.me/905321384979?text=Merhaba", label: "WhatsApp", icon: MessageCircle, external: true },
  { href: "/nakliyat-fiyat-hesaplama", label: "Fiyat", icon: Calculator, external: false },
  { href: "/teklif-al", label: "Teklif", icon: FileText, external: false },
];

export default function StickyCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden">
      <div className="border-t border-white/10 bg-[#122032] px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            const cls = "flex flex-col items-center gap-0.5 rounded-xl py-2.5 text-[10px] font-semibold text-white transition-all active:scale-95";

            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={cls}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition-colors">
                    <Icon className="h-[18px] w-[18px]" />
                  </div>
                  <span className="mt-0.5">{item.label}</span>
                </a>
              );
            }

            return (
              <Link key={item.label} href={item.href} className={cls}>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition-colors">
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <span className="mt-0.5">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
