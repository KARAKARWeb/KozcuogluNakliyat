"use client";

import { CheckCircle } from "lucide-react";

interface PassageOptimizedSectionProps {
  id: string;
  question: string;
  directAnswer: string;
  children: React.ReactNode;
}

export function PassageOptimizedSection({ id, question, directAnswer, children }: PassageOptimizedSectionProps) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="mb-4 text-2xl font-bold text-[#122032] md:text-3xl">{question}</h2>
      
      {/* Direct Answer Box - Featured Snippet Optimization */}
      <div className="direct-answer-box mb-6 rounded-xl border-l-4 border-[#e3000f] bg-gradient-to-br from-[#fef2f2] to-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e3000f] text-white">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#e3000f]">
              Kısa Cevap
            </div>
            <p className="text-base leading-relaxed text-[#122032]">{directAnswer}</p>
          </div>
        </div>
      </div>

      {/* Detailed Content */}
      <div className="prose max-w-none prose-headings:text-[#122032] prose-p:text-[#122032]/80 prose-p:leading-relaxed">
        {children}
      </div>
    </section>
  );
}
