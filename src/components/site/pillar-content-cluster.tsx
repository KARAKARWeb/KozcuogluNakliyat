"use client";

import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";

interface ClusterArticle {
  title: string;
  url: string;
  excerpt: string;
  category: string;
}

interface PillarContentClusterProps {
  pillarTitle: string;
  clusterArticles: ClusterArticle[];
  peopleAlsoAsk?: { question: string; answer: string }[];
}

export function PillarContentCluster({ pillarTitle, clusterArticles, peopleAlsoAsk }: PillarContentClusterProps) {
  return (
    <div className="my-12 space-y-8">
      {/* Cluster Articles */}
      <div className="rounded-2xl border-2 border-[#e3000f]/10 bg-gradient-to-br from-[#f5f5f5] to-white p-8">
        <div className="mb-6 flex items-center gap-3">
          <FileText className="h-6 w-6 text-[#e3000f]" />
          <h2 className="text-2xl font-bold text-[#122032]">{pillarTitle} Hakkında Detaylı Rehberler</h2>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clusterArticles.map((article, idx) => (
            <Link
              key={idx}
              href={article.url}
              className="group rounded-xl border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-2 inline-block rounded-full bg-[#e3000f]/10 px-3 py-1 text-xs font-medium text-[#e3000f]">
                {article.category}
              </div>
              <h3 className="font-semibold text-[#122032] group-hover:text-[#e3000f]">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {article.excerpt}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#e3000f]">
                Devamını Oku <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* People Also Ask */}
      {peopleAlsoAsk && peopleAlsoAsk.length > 0 && (
        <div className="rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8">
          <h2 className="mb-6 text-2xl font-bold text-[#122032]">İnsanlar Ayrıca Soruyor</h2>
          <div className="space-y-4">
            {peopleAlsoAsk.map((item, idx) => (
              <details key={idx} className="group rounded-xl border bg-white">
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-[#122032]">
                  <span className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      {idx + 1}
                    </span>
                    {item.question}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition group-open:rotate-90" />
                </summary>
                <div className="border-t px-5 pb-5 pt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
