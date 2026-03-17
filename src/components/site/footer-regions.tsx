"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface FooterRegion {
  id: string;
  slug: string;
  title: string;
}

const MOBILE_INITIAL = 15;

export default function FooterRegions({ regions }: { regions: FooterRegion[] }) {
  const [mobileShowAll, setMobileShowAll] = useState(false);
  const mobileVisible = mobileShowAll ? regions : regions.slice(0, MOBILE_INITIAL);
  const remaining = regions.length - MOBILE_INITIAL;

  return (
    <div>
      {/* Masaüstü: hepsi görünsün */}
      <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-1">
        {regions.map((r) => (
          <Link key={r.id} href={`/${r.slug}.html`} className="truncate text-xs transition hover:text-white">{r.title}</Link>
        ))}
      </div>
      {/* Mobil: ilk 15 + devamını yükle */}
      <div className="md:hidden">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {mobileVisible.map((r) => (
            <Link key={r.id} href={`/${r.slug}.html`} className="block truncate py-2 text-xs transition hover:text-white">{r.title}</Link>
          ))}
        </div>
        {!mobileShowAll && remaining > 0 && (
          <button
            onClick={() => setMobileShowAll(true)}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/20 px-4 py-2.5 text-xs font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            <ChevronDown className="h-3.5 w-3.5" />
            Devamını Yükle (+{remaining} bölge)
          </button>
        )}
      </div>
    </div>
  );
}
