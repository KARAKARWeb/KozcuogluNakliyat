"use client";

import { ArrowRight } from "lucide-react";

interface TableRow {
  [key: string]: string | number;
}

interface SnippetOptimizedTableProps {
  title: string;
  headers: string[];
  rows: TableRow[];
  ctaText?: string;
  ctaLink?: string;
  caption?: string;
}

export function SnippetOptimizedTable({ 
  title, 
  headers, 
  rows, 
  ctaText, 
  ctaLink,
  caption 
}: SnippetOptimizedTableProps) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border-2 border-emerald-100 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-emerald-50 to-white p-6">
        <h3 className="text-xl font-bold text-[#122032] md:text-2xl">{title}</h3>
        {caption && <p className="mt-2 text-sm text-gray-600">{caption}</p>}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, idx) => (
                <th 
                  key={idx}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-700 first:pl-6 last:pr-6"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="transition hover:bg-gray-50">
                {headers.map((header, cellIdx) => (
                  <td 
                    key={cellIdx}
                    className="px-4 py-3 text-sm text-gray-600 first:pl-6 last:pr-6"
                  >
                    {cellIdx === 0 ? (
                      <strong className="font-semibold text-[#122032]">{row[header]}</strong>
                    ) : (
                      row[header]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {ctaText && ctaLink && (
        <div className="border-t bg-gradient-to-r from-emerald-50/50 to-white p-4 text-center">
          <p className="mb-3 text-sm font-medium text-gray-700">
            Detaylı fiyat teklifi için bizimle iletişime geçin
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
