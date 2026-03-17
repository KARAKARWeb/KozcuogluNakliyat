"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogTOC({ content }: { content: string }) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Sayfa DOM'undan h2 ve h3 başlıklarını bul
    const headings = document.querySelectorAll("article h2, article h3");
    
    const items: TocItem[] = [];
    headings.forEach((heading, index) => {
      const text = heading.textContent || "";
      const level = parseInt(heading.tagName.substring(1));
      
      // Mevcut ID'yi kullan veya yeni oluştur
      let id = heading.getAttribute("id");
      if (!id) {
        id = `heading-${index}`;
        heading.setAttribute("id", id);
      }
      
      items.push({ id, text, level });
    });

    setToc(items);
    if (items.length > 0) setActiveId(items[0].id);

    // Scroll spy - aktif başlığı takip et
    const observer = new IntersectionObserver(
      (entries) => {
        // Görünür olan başlıkları filtrele
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // En üstteki görünür başlığı aktif yap
          const topEntry = visibleEntries.reduce((top, entry) => {
            return entry.boundingClientRect.top < top.boundingClientRect.top ? entry : top;
          });
          setActiveId(topEntry.target.id);
        }
      },
      { 
        rootMargin: "-100px 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    // Heading'leri gözlemle
    headings.forEach((heading) => {
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-24 rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-sm font-bold text-[#122032]">
        <List className="h-4 w-4" />
        İçindekiler
      </div>
      <nav className="space-y-2">
        {toc.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`block w-full text-left text-sm transition-colors hover:text-[#e3000f] ${
              item.level === 3 ? "pl-4" : ""
            } ${
              activeId === item.id
                ? "font-semibold text-[#e3000f]"
                : "text-muted-foreground"
            }`}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  );
}
