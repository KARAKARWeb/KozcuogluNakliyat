"use client";

import { Trash2, CheckCircle, XCircle, Tag, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BulkActionsProps {
  selectedCount: number;
  onDelete?: () => void;
  onActivate?: () => void;
  onDeactivate?: () => void;
  onChangeCategory?: () => void;
  onAddTags?: () => void;
  onClearSelection: () => void;
}

export default function BulkActions({
  selectedCount,
  onDelete,
  onActivate,
  onDeactivate,
  onChangeCategory,
  onAddTags,
  onClearSelection,
}: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg border bg-blue-50 p-3">
      <span className="text-sm font-medium text-blue-900">
        {selectedCount} öğe seçildi
      </span>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Toplu İşlemler
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {onActivate && (
              <DropdownMenuItem onClick={onActivate}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Aktif Yap
              </DropdownMenuItem>
            )}
            {onDeactivate && (
              <DropdownMenuItem onClick={onDeactivate}>
                <XCircle className="mr-2 h-4 w-4" />
                Pasif Yap
              </DropdownMenuItem>
            )}
            {(onActivate || onDeactivate) && <DropdownMenuSeparator />}
            {onChangeCategory && (
              <DropdownMenuItem onClick={onChangeCategory}>
                <FolderOpen className="mr-2 h-4 w-4" />
                Kategori Değiştir
              </DropdownMenuItem>
            )}
            {onAddTags && (
              <DropdownMenuItem onClick={onAddTags}>
                <Tag className="mr-2 h-4 w-4" />
                Etiket Ekle
              </DropdownMenuItem>
            )}
            {(onChangeCategory || onAddTags) && <DropdownMenuSeparator />}
            {onDelete && (
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Sil
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" onClick={onClearSelection}>
          Seçimi Temizle
        </Button>
      </div>
    </div>
  );
}
