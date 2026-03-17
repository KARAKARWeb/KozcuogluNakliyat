"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, CheckCircle, XCircle, Tag, FolderOpen, Loader2 } from "lucide-react";
import { executeBulkOperation, type BulkOperationResult } from "@/lib/bulk-operations";

interface BulkActionsBarProps {
  selectedIds: string[];
  onClearSelection: () => void;
  onOperationComplete: () => void;
  categories?: string[];
  endpoint: string;
}

export default function BulkActionsBar({
  selectedIds,
  onClearSelection,
  onOperationComplete,
  categories = [],
  endpoint,
}: BulkActionsBarProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<BulkOperationResult | null>(null);

  const handleBulkDelete = async () => {
    if (!confirm(`${selectedIds.length} öğeyi silmek istediğinize emin misiniz?`)) return;

    setIsProcessing(true);
    setResult(null);

    try {
      const res = await executeBulkOperation({
        ids: selectedIds,
        operation: 'delete',
      });
      setResult(res);
      if (res.success) {
        onOperationComplete();
        onClearSelection();
      }
    } catch (error) {
      console.error('Bulk delete error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkActivate = async () => {
    setIsProcessing(true);
    setResult(null);

    try {
      const res = await executeBulkOperation({
        ids: selectedIds,
        operation: 'activate',
      });
      setResult(res);
      if (res.success) {
        onOperationComplete();
        onClearSelection();
      }
    } catch (error) {
      console.error('Bulk activate error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkDeactivate = async () => {
    setIsProcessing(true);
    setResult(null);

    try {
      const res = await executeBulkOperation({
        ids: selectedIds,
        operation: 'deactivate',
      });
      setResult(res);
      if (res.success) {
        onOperationComplete();
        onClearSelection();
      }
    } catch (error) {
      console.error('Bulk deactivate error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkCategoryChange = async (category: string) => {
    setIsProcessing(true);
    setResult(null);

    try {
      const res = await executeBulkOperation({
        ids: selectedIds,
        operation: 'updateCategory',
        data: { category },
      });
      setResult(res);
      if (res.success) {
        onOperationComplete();
        onClearSelection();
      }
    } catch (error) {
      console.error('Bulk category update error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (selectedIds.length === 0) return null;

  return (
    <div className="sticky top-0 z-10 border-b bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            {selectedIds.length} öğe seçildi
          </span>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleBulkActivate}
              disabled={isProcessing}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              Aktif Yap
            </Button>

            <Button
              onClick={handleBulkDeactivate}
              disabled={isProcessing}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              Pasif Yap
            </Button>

            {categories.length > 0 && (
              <Select onValueChange={handleBulkCategoryChange} disabled={isProcessing}>
                <SelectTrigger className="w-[180px]">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Kategori Değiştir" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Button
              onClick={handleBulkDelete}
              disabled={isProcessing}
              variant="destructive"
              size="sm"
              className="gap-2"
            >
              {isProcessing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Sil
            </Button>
          </div>
        </div>

        <Button onClick={onClearSelection} variant="ghost" size="sm">
          Seçimi Temizle
        </Button>
      </div>

      {result && (
        <div
          className={`border-t px-4 py-2 text-sm ${
            result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {result.success ? (
            <span>✅ {result.processed} öğe başarıyla işlendi</span>
          ) : (
            <span>
              ⚠️ {result.processed} başarılı, {result.failed} başarısız
            </span>
          )}
        </div>
      )}
    </div>
  );
}
