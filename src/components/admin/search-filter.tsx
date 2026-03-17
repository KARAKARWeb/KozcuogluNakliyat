"use client";

import { useState } from "react";
import { Search, X, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  categoryFilter?: string;
  onCategoryChange?: (value: string) => void;
  statusFilter?: string;
  onStatusChange?: (value: string) => void;
  dateRange?: { from: string; to: string };
  onDateRangeChange?: (range: { from: string; to: string }) => void;
  categories?: { value: string; label: string }[];
  statuses?: { value: string; label: string }[];
  placeholder?: string;
}

export default function SearchFilter({
  searchValue,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  statusFilter,
  onStatusChange,
  dateRange,
  onDateRangeChange,
  categories = [],
  statuses = [],
  placeholder = "Ara...",
}: SearchFilterProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasActiveFilters =
    categoryFilter ||
    statusFilter ||
    (dateRange?.from && dateRange?.to);

  const clearAllFilters = () => {
    onCategoryChange?.("");
    onStatusChange?.("");
    onDateRangeChange?.({ from: "", to: "" });
    onSearchChange("");
  };

  const activeFilterCount = [
    categoryFilter,
    statusFilter,
    dateRange?.from && dateRange?.to,
  ].filter(Boolean).length;

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="pl-9 pr-9"
          />
          {searchValue && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Advanced Filter Toggle */}
        {(categories.length > 0 || statuses.length > 0 || onDateRangeChange) && (
          <Popover open={showAdvanced} onOpenChange={setShowAdvanced}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="mr-2 h-4 w-4" />
                Filtrele
                {activeFilterCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Gelişmiş Filtreler</h4>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                    >
                      Temizle
                    </Button>
                  )}
                </div>

                {/* Category Filter */}
                {categories.length > 0 && onCategoryChange && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Kategori</label>
                    <Select
                      value={categoryFilter}
                      onValueChange={onCategoryChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tümü" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tümü</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Status Filter */}
                {statuses.length > 0 && onStatusChange && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Durum</label>
                    <Select value={statusFilter} onValueChange={onStatusChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tümü" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tümü</SelectItem>
                        {statuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Date Range Filter */}
                {onDateRangeChange && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      <Calendar className="mr-1 inline h-4 w-4" />
                      Tarih Aralığı
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        value={dateRange?.from || ""}
                        onChange={(e) =>
                          onDateRangeChange({
                            from: e.target.value,
                            to: dateRange?.to || "",
                          })
                        }
                        placeholder="Başlangıç"
                      />
                      <Input
                        type="date"
                        value={dateRange?.to || ""}
                        onChange={(e) =>
                          onDateRangeChange({
                            from: dateRange?.from || "",
                            to: e.target.value,
                          })
                        }
                        placeholder="Bitiş"
                      />
                    </div>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Clear All Button */}
        {(searchValue || hasActiveFilters) && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="mr-1 h-4 w-4" />
            Temizle
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {categoryFilter && (
            <Badge variant="secondary" className="gap-1">
              Kategori: {categories.find((c) => c.value === categoryFilter)?.label}
              <button
                onClick={() => onCategoryChange?.("")}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {statusFilter && (
            <Badge variant="secondary" className="gap-1">
              Durum: {statuses.find((s) => s.value === statusFilter)?.label}
              <button
                onClick={() => onStatusChange?.("")}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {dateRange?.from && dateRange?.to && (
            <Badge variant="secondary" className="gap-1">
              {new Date(dateRange.from).toLocaleDateString("tr-TR")} -{" "}
              {new Date(dateRange.to).toLocaleDateString("tr-TR")}
              <button
                onClick={() => onDateRangeChange?.({ from: "", to: "" })}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
