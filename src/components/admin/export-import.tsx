"use client";

import { useState, useRef } from "react";
import { Download, Upload, FileJson, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportToJSON, exportToCSV, exportToExcel, readFileAsText, parseCSV, parseJSON } from "@/lib/export-import";

interface ExportImportProps<T extends Record<string, any>> {
  data: T[];
  filename: string;
  columns?: { key: keyof T; label: string }[];
  onImport?: (data: T[]) => void;
}

export default function ExportImport<T extends Record<string, any>>({
  data,
  filename,
  columns,
  onImport,
}: ExportImportProps<T>) {
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJSON = () => {
    exportToJSON(data, filename);
  };

  const handleExportCSV = () => {
    exportToCSV(data, filename, columns);
  };

  const handleExportExcel = () => {
    exportToExcel(data, filename, columns);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImport) return;

    setImporting(true);
    try {
      const text = await readFileAsText(file);
      let importedData: T[];

      if (file.name.endsWith(".json")) {
        importedData = parseJSON<T>(text);
      } else if (file.name.endsWith(".csv")) {
        importedData = parseCSV(text) as T[];
      } else {
        throw new Error("Desteklenmeyen dosya formatı");
      }

      onImport(importedData);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      alert(`İçe aktarma hatası: ${error instanceof Error ? error.message : "Bilinmeyen hata"}`);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Export Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Dışa Aktar
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleExportJSON}>
            <FileJson className="mr-2 h-4 w-4" />
            JSON (.json)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportCSV}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            CSV (.csv)
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleExportExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
            Excel (.csv)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Import Button */}
      {onImport && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={handleImportClick}
            disabled={importing}
          >
            <Upload className="mr-2 h-4 w-4" />
            {importing ? "İçe Aktarılıyor..." : "İçe Aktar"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}
