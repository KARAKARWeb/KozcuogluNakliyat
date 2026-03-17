"use client";

import { CheckCircle, ArrowRight } from "lucide-react";

interface SnippetListItem {
  title: string;
  description?: string;
}

interface SnippetOptimizedListProps {
  title: string;
  items: SnippetListItem[];
  type?: "ordered" | "unordered";
  ctaText?: string;
  ctaLink?: string;
}

export function SnippetOptimizedList({ 
  title, 
  items, 
  type = "ordered",
  ctaText,
  ctaLink 
}: SnippetOptimizedListProps) {
  const ListTag = type === "ordered" ? "ol" : "ul";
  
  return (
    <div className="my-8 rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50/50 to-white p-6 md:p-8">
      <h3 className="mb-6 text-xl font-bold text-[#122032] md:text-2xl">{title}</h3>
      
      <ListTag className={`space-y-4 ${type === "ordered" ? "list-decimal list-inside" : ""}`}>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-base leading-relaxed">
            {type === "unordered" && (
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
            )}
            <div className="flex-1">
              <strong className="font-semibold text-[#122032]">{item.title}</strong>
              {item.description && (
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ListTag>
      
      {ctaText && ctaLink && (
        <div className="mt-6 rounded-lg bg-blue-100/50 p-4 text-center">
          <p className="mb-3 text-sm font-medium text-gray-700">
            Detaylı bilgi için tam rehberimizi okuyun
          </p>
          <a 
            href={ctaLink}
            className="inline-flex items-center gap-2 rounded-lg bg-[#e3000f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#c5000d]"
          >
            {ctaText} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}
