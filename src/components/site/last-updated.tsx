"use client";

import { Calendar } from "lucide-react";

interface LastUpdatedProps {
  date: string | Date;
  className?: string;
}

export function LastUpdated({ date, className = "" }: LastUpdatedProps) {
  const formattedDate = typeof date === "string" 
    ? new Date(date).toLocaleDateString("tr-TR", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      })
    : date.toLocaleDateString("tr-TR", { 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      });

  return (
    <div className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-600 ${className}`}>
      <Calendar className="h-3.5 w-3.5" />
      <span>Son Güncelleme: <time dateTime={typeof date === "string" ? date : date.toISOString()}>{formattedDate}</time></span>
    </div>
  );
}
