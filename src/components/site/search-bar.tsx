"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  type: "blog" | "service" | "solution" | "region";
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchContent = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.results || []);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(searchContent, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  const typeLabels = {
    blog: "Blog",
    service: "Hizmet",
    solution: "Çözüm",
    region: "Bölge",
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Blog, hizmet veya bölge ara..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setShowResults(true)}
          className="pl-10 pr-10"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        )}
        {query && !loading && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full rounded-lg border bg-white shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <Link
              key={result.id}
              href={result.url}
              onClick={() => {
                setShowResults(false);
                setQuery("");
              }}
              className="block border-b last:border-0 p-4 hover:bg-accent transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{result.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {result.excerpt}
                  </p>
                </div>
                <span className="text-xs bg-secondary px-2 py-1 rounded">
                  {typeLabels[result.type]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {showResults && query.length >= 2 && results.length === 0 && !loading && (
        <div className="absolute top-full mt-2 w-full rounded-lg border bg-white shadow-lg z-50 p-8 text-center">
          <p className="text-sm text-muted-foreground">Sonuç bulunamadı</p>
        </div>
      )}
    </div>
  );
}

export function SearchAutocomplete({ onSelect }: { onSelect: (value: string) => void }) {
  const [suggestions] = useState([
    "Ankara nakliyat",
    "Ev taşıma fiyatları",
    "Ofis taşıma",
    "Şehirler arası nakliyat",
  ]);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Popüler Aramalar</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSelect(suggestion)}
            className="text-xs bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded-full transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
