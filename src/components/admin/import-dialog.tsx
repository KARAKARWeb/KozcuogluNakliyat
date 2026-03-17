"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { bulkImport } from "@/lib/export-import";

interface ImportDialogProps {
  onImport: (data: any[]) => Promise<void>;
  validator?: (item: any) => boolean;
}

export function ImportDialog({ onImport, validator }: ImportDialogProps) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ success: any[]; errors: any[] } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    try {
      const { success, errors } = await bulkImport(file, validator);
      setResult({ success, errors });
      
      if (success.length > 0) {
        await onImport(success);
      }
    } catch (error) {
      alert('İçe aktarma hatası: ' + error);
    } finally {
      setImporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Upload className="h-4 w-4" />
          İçe Aktar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>İçe Aktar</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".json,.csv"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {file ? file.name : 'JSON veya CSV dosyası seçin'}
              </p>
            </label>
          </div>

          {result && (
            <div className="space-y-2">
              {result.success.length > 0 && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>{result.success.length} kayıt başarıyla içe aktarıldı</span>
                </div>
              )}
              {result.errors.length > 0 && (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>{result.errors.length} kayıtta hata oluştu</span>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleImport} disabled={!file || importing}>
              {importing ? 'İçe Aktarılıyor...' : 'İçe Aktar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
