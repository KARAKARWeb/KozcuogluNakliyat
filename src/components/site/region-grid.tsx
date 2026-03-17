"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface RegionItem {
  id: string;
  slug: string;
  title: string;
  image?: string;
  description?: string;
}

const PAGE_SIZE = 16;

export default function RegionGrid({ regions }: { regions: RegionItem[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setVisible((prev) => Math.min(prev + PAGE_SIZE, regions.length));
  }, [regions.length]);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  const shown = regions.slice(0, visible);
  const hasMore = visible < regions.length;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {shown.map((r) => (
          <Link key={r.id} href={`/${r.slug}.html`} className="group relative overflow-hidden rounded-xl border bg-white pt-0 shadow-sm transition hover:shadow-lg">
            <div className="relative aspect-[16/9] w-full bg-gradient-to-br from-[#122032] to-[#1a3050]">
              {r.image && <Image src={r.image} alt={r.title} fill sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw" className="object-cover opacity-100 transition group-hover:scale-105 group-hover:opacity-60" />}
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-[#122032] transition group-hover:text-[#e3000f]">{r.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.description || `${r.title} hizmeti. Profesyonel ekip, sigortalı taşımacılık.`}</p>
            </div>
          </Link>
        ))}
      </div>
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#e3000f]" />
        </div>
      )}
    </>
  );
}
