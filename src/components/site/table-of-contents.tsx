"use client";

import { useEffect, useState } from "react";
import { List, ChevronDown } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function TocNav({ items, activeId, onClickItem }: { items: TocItem[]; activeId: string; onClickItem?: () => void }) {
  return (
    <nav className="space-y-0.5">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById(item.id);
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
            onClickItem?.();
          }}
          className={`block rounded-lg px-2 py-1.5 text-[13px] transition ${
            activeId === item.id
              ? "bg-red-50 font-medium text-[#e3000f]"
              : "text-muted-foreground hover:bg-gray-50 hover:text-[#e3000f]"
          }`}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}

export function MobileTableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const prose = document.querySelector(".prose");
    if (!prose) return;

    const headings = prose.querySelectorAll("h2");
    const tocItems: TocItem[] = [];
    headings.forEach((h) => {
      if (!h.id) h.id = slugify(h.textContent || "");
      tocItems.push({ id: h.id, text: h.textContent || "" });
    });
    setItems(tocItems);
    if (tocItems.length > 0) setActiveId(tocItems[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        // Görünür olan başlıkları filtrele
        const visible = entries.filter((e) => e.isIntersecting);
        
        if (visible.length > 0) {
          // En üstteki görünür başlığı aktif yap
          const topEntry = visible.reduce((top, entry) => {
            return entry.boundingClientRect.top < top.boundingClientRect.top ? entry : top;
          });
          setActiveId(topEntry.target.id);
        }
      },
      { 
        rootMargin: "-80px 0px -60% 0px", 
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (items.length < 2) return null;

  return (
    <div className="rounded-xl border bg-white shadow-sm lg:hidden mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4"
      >
        <div className="flex items-center gap-2">
          <List className="h-4 w-4 text-[#e3000f]" />
          <span className="text-sm font-bold text-[#122032]">İçindekiler</span>
          <span className="text-xs text-muted-foreground">({items.length})</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t px-4 pb-4 pt-2">
          <TocNav items={items} activeId={activeId} onClickItem={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}

export default function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const prose = document.querySelector(".prose");
    if (!prose) return;

    const headings = prose.querySelectorAll("h2");
    const tocItems: TocItem[] = [];

    headings.forEach((h) => {
      if (!h.id) {
        h.id = slugify(h.textContent || "");
      }
      tocItems.push({ id: h.id, text: h.textContent || "" });
    });

    setItems(tocItems);
    if (tocItems.length > 0) setActiveId(tocItems[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        // Görünür olan başlıkları filtrele
        const visible = entries.filter((e) => e.isIntersecting);
        
        if (visible.length > 0) {
          // En üstteki görünür başlığı aktif yap
          const topEntry = visible.reduce((top, entry) => {
            return entry.boundingClientRect.top < top.boundingClientRect.top ? entry : top;
          });
          setActiveId(topEntry.target.id);
        }
      },
      { 
        rootMargin: "-80px 0px -60% 0px", 
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  if (items.length < 2) return null;

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <List className="h-4 w-4 text-[#e3000f]" />
        <h3 className="text-sm font-bold text-[#122032]">İçindekiler</h3>
      </div>
      <TocNav items={items} activeId={activeId} />
    </div>
  );
}
