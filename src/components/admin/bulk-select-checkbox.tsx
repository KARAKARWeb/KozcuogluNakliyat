"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface BulkSelectCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  indeterminate?: boolean;
}

export function BulkSelectCheckbox({ checked, onCheckedChange, indeterminate }: BulkSelectCheckboxProps) {
  return (
    <Checkbox
      checked={indeterminate ? "indeterminate" : checked}
      onCheckedChange={onCheckedChange}
      aria-label="Seç"
    />
  );
}

interface BulkSelectAllCheckboxProps {
  isAllSelected: boolean;
  isSomeSelected: boolean;
  onToggleAll: () => void;
}

export function BulkSelectAllCheckbox({ isAllSelected, isSomeSelected, onToggleAll }: BulkSelectAllCheckboxProps) {
  return (
    <Checkbox
      checked={isSomeSelected ? "indeterminate" : isAllSelected}
      onCheckedChange={onToggleAll}
      aria-label="Tümünü Seç"
    />
  );
}
