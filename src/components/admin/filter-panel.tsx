"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { X, Filter } from "lucide-react";

export interface FilterConfig {
  category?: string[];
  status?: string[];
  dateRange?: boolean;
  customFilters?: Array<{
    key: string;
    label: string;
    type: 'text' | 'select' | 'date';
    options?: string[];
  }>;
}

export interface FilterValues {
  [key: string]: any;
  category?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

interface FilterPanelProps {
  config: FilterConfig;
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onReset: () => void;
}

export function FilterPanel({ config, values, onChange, onReset }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: string, value: any) => {
    onChange({ ...values, [key]: value });
  };

  const activeFilterCount = Object.keys(values).filter(
    key => values[key] !== undefined && values[key] !== '' && values[key] !== null
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtrele
          {activeFilterCount > 0 && (
            <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="h-4 w-4 mr-1" />
            Temizle
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="rounded-lg border bg-card p-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Category Filter */}
            {config.category && config.category.length > 0 && (
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select
                  value={values.category || ''}
                  onValueChange={(value) => handleChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tümü" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tümü</SelectItem>
                    {config.category.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Status Filter */}
            {config.status && config.status.length > 0 && (
              <div className="space-y-2">
                <Label>Durum</Label>
                <Select
                  value={values.status || ''}
                  onValueChange={(value) => handleChange('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tümü" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tümü</SelectItem>
                    {config.status.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Date Range Filter */}
            {config.dateRange && (
              <>
                <div className="space-y-2">
                  <Label>Başlangıç Tarihi</Label>
                  <Input
                    type="date"
                    value={values.dateFrom ? new Date(values.dateFrom).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleChange('dateFrom', e.target.value ? new Date(e.target.value) : undefined)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bitiş Tarihi</Label>
                  <Input
                    type="date"
                    value={values.dateTo ? new Date(values.dateTo).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleChange('dateTo', e.target.value ? new Date(e.target.value) : undefined)}
                  />
                </div>
              </>
            )}

            {/* Custom Filters */}
            {config.customFilters?.map((filter) => (
              <div key={filter.key} className="space-y-2">
                <Label>{filter.label}</Label>
                {filter.type === 'text' && (
                  <Input
                    value={values[filter.key] || ''}
                    onChange={(e) => handleChange(filter.key, e.target.value)}
                    placeholder={filter.label}
                  />
                )}
                {filter.type === 'select' && filter.options && (
                  <Select
                    value={values[filter.key] || ''}
                    onValueChange={(value) => handleChange(filter.key, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Tümü</SelectItem>
                      {filter.options.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
