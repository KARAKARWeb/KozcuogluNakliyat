"use client";

import { useState, useMemo } from "react";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FaqItem {
  q: string;
  a: string;
  service?: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
  title?: string;
  description?: string;
}

export function FaqSection({ faqs, title = "Sıkça Sorulan Sorular", description = "Nakliyat hakkında merak edilenler" }: FaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs.slice(0, 10);
    
    const query = searchQuery.toLowerCase();
    return faqs.filter(faq => 
      faq.q.toLowerCase().includes(query) || 
      faq.a.toLowerCase().includes(query) ||
      (faq.service && faq.service.toLowerCase().includes(query))
    );
  }, [faqs, searchQuery]);

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-center text-2xl font-bold text-[#122032] md:text-3xl mb-4">{title}</h2>
      <p className="text-center text-muted-foreground mb-8">{description}</p>

      {/* Arama */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="SSS içinde ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* SSS Listesi */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-3">
          {filteredFaqs.map((item, i) => (
            <details key={i} className="group rounded-xl border bg-white shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-[#122032]">
                <span>
                  {item.q}
                  {item.service && searchQuery && (
                    <span className="ml-2 text-xs text-muted-foreground">({item.service})</span>
                  )}
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
              </summary>
              <div className="border-t px-5 pb-5 pt-3 text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.a }} />
            </details>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aradığınız kriterlere uygun soru bulunamadı.</p>
        </div>
      )}

      {/* Toplam SSS sayısı */}
      {searchQuery && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {filteredFaqs.length} sonuç bulundu (Toplam {faqs.length} SSS)
        </p>
      )}
    </div>
  );
}
