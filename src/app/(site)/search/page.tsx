"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { calculateRelevance, highlightSearchTerms, extractExcerpt } from "@/lib/search";

interface SearchResult {
  id: string;
  type: 'blog' | 'service' | 'region';
  title: string;
  excerpt: string;
  url: string;
  relevance: number;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  async function performSearch(searchQuery: string) {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      
      if (data.success) {
        setResults(data.results);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    performSearch(query);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-[#122032]">Site İçi Arama</h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Blog yazıları, hizmetler, bölgeler ara..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading} className="bg-[#e3000f] hover:bg-[#c5000d]">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Aranıyor...
                </>
              ) : (
                'Ara'
              )}
            </Button>
          </div>
        </form>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#e3000f]" />
          </div>
        )}

        {!loading && searched && (
          <div>
            <p className="mb-4 text-sm text-muted-foreground">
              {results.length} sonuç bulundu
            </p>

            {results.length === 0 ? (
              <div className="rounded-lg border bg-gray-50 p-8 text-center">
                <p className="text-muted-foreground">
                  Aradığınız kriterlere uygun sonuç bulunamadı.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Farklı anahtar kelimeler deneyebilirsiniz.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    className="block rounded-lg border bg-white p-4 transition hover:shadow-md"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded bg-[#e3000f]/10 px-2 py-0.5 text-xs font-medium text-[#e3000f]">
                        {result.type === 'blog' ? 'Blog' : result.type === 'service' ? 'Hizmet' : 'Bölge'}
                      </span>
                      <h2 className="text-lg font-semibold text-[#122032]">
                        {result.title}
                      </h2>
                    </div>
                    <p 
                      className="text-sm text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: result.excerpt }}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {!searched && (
          <div className="rounded-lg border bg-gray-50 p-8 text-center">
            <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">
              Yukarıdaki arama kutusunu kullanarak blog yazıları, hizmetler ve bölgeler arasında arama yapabilirsiniz.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
