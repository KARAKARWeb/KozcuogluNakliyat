"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  showSearch?: boolean;
}

export function FAQAccordion({ faqs, showSearch = true }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      {showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="SSS içinde ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      <div className="space-y-2">
        {filteredFAQs.map((faq, index) => (
          <div key={index} className="rounded-lg border bg-card">
            <button
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-accent"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-semibold">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="border-t p-4 text-muted-foreground">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          Aradığınız kriterlere uygun soru bulunamadı.
        </p>
      )}
    </div>
  );
}
