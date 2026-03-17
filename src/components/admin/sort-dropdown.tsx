"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  order: 'asc' | 'desc';
  onChange: (value: string, order: 'asc' | 'desc') => void;
}

export function SortDropdown({ options, value, order, onChange }: SortDropdownProps) {
  const toggleOrder = () => {
    onChange(value, order === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={value} onValueChange={(v) => onChange(v, order)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sırala" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon" onClick={toggleOrder} title={order === 'asc' ? 'Artan' : 'Azalan'}>
        {order === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
      </Button>
    </div>
  );
}
