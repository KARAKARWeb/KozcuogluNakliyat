"use client";

import { useState } from "react";
import { Filter, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface FilterSortProps {
  categories?: string[];
  onCategoryChange?: (category: string) => void;
  onSortChange?: (sort: string) => void;
  showFilters?: boolean;
}

export function FilterSort({
  categories = [],
  onCategoryChange,
  onSortChange,
  showFilters = true,
}: FilterSortProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onCategoryChange?.(value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange?.(value);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {showFilters && categories.length > 0 && (
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kategori Seç" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tümü</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">En Yeni</SelectItem>
            <SelectItem value="date-asc">En Eski</SelectItem>
            <SelectItem value="title-asc">A-Z</SelectItem>
            <SelectItem value="title-desc">Z-A</SelectItem>
            <SelectItem value="popular">Popüler</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedCategory && (
        <Badge variant="secondary" className="gap-1">
          {selectedCategory}
          <button
            onClick={() => handleCategoryChange("")}
            className="ml-1 hover:text-destructive"
          >
            ×
          </button>
        </Badge>
      )}
    </div>
  );
}

export function AdvancedFilters({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) {
  const [filters, setFilters] = useState({
    priceRange: "",
    location: "",
    serviceType: "",
  });

  const handleChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4 rounded-lg border bg-white p-4">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4" />
        <h3 className="font-semibold">Gelişmiş Filtreler</h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium mb-2 block">Fiyat Aralığı</label>
          <Select
            value={filters.priceRange}
            onValueChange={(v) => handleChange("priceRange", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tümü</SelectItem>
              <SelectItem value="0-1000">0 - 1.000 TL</SelectItem>
              <SelectItem value="1000-3000">1.000 - 3.000 TL</SelectItem>
              <SelectItem value="3000-5000">3.000 - 5.000 TL</SelectItem>
              <SelectItem value="5000+">5.000 TL+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Konum</label>
          <Select
            value={filters.location}
            onValueChange={(v) => handleChange("location", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tümü</SelectItem>
              <SelectItem value="ankara">Ankara</SelectItem>
              <SelectItem value="istanbul">İstanbul</SelectItem>
              <SelectItem value="izmir">İzmir</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Hizmet Tipi</label>
          <Select
            value={filters.serviceType}
            onValueChange={(v) => handleChange("serviceType", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tümü</SelectItem>
              <SelectItem value="residential">Bireysel</SelectItem>
              <SelectItem value="commercial">Kurumsal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setFilters({ priceRange: "", location: "", serviceType: "" });
          onFilterChange({ priceRange: "", location: "", serviceType: "" });
        }}
        className="w-full"
      >
        Filtreleri Temizle
      </Button>
    </div>
  );
}
