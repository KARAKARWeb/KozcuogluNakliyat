"use client";

import { FileText } from "lucide-react";

interface ExecutiveSummaryProps {
  summary: string;
  keyTakeaways?: string[];
}

export function ExecutiveSummary({ summary, keyTakeaways }: ExecutiveSummaryProps) {
  return (
    <div className="my-8 rounded-xl border-2 border-[#e3000f]/20 bg-gradient-to-br from-[#e3000f]/5 to-transparent p-6">
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-[#e3000f]" />
        <h2 className="text-lg font-bold text-[#122032]">Özet</h2>
      </div>
      <p className="leading-relaxed text-[#122032]/80">{summary}</p>
      
      {keyTakeaways && keyTakeaways.length > 0 && (
        <div className="mt-4 border-t border-[#e3000f]/10 pt-4">
          <p className="mb-2 text-sm font-semibold text-[#122032]">Önemli Noktalar:</p>
          <ul className="space-y-2">
            {keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-[#122032]/80">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e3000f] text-xs font-bold text-white">
                  {idx + 1}
                </span>
                {takeaway}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
