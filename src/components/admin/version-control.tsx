"use client";

import { useState } from "react";
import { History, RotateCcw, GitCompare, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Version {
  id: string;
  version: number;
  timestamp: string;
  user: string;
  action: "created" | "updated" | "deleted";
  changes: string[];
}

export function VersionHistory({ itemId, itemType }: { itemId: string; itemType: string }) {
  const [versions] = useState<Version[]>([
    {
      id: "v3",
      version: 3,
      timestamp: "2024-02-14T20:00:00",
      user: "Admin",
      action: "updated",
      changes: ["Başlık güncellendi", "İçerik düzenlendi"],
    },
    {
      id: "v2",
      version: 2,
      timestamp: "2024-02-13T15:30:00",
      user: "Admin",
      action: "updated",
      changes: ["SEO açıklaması eklendi"],
    },
    {
      id: "v1",
      version: 1,
      timestamp: "2024-02-12T10:00:00",
      user: "Admin",
      action: "created",
      changes: ["İlk versiyon oluşturuldu"],
    },
  ]);

  const handleRestore = (versionId: string) => {
    if (confirm("Bu versiyona geri dönmek istediğinize emin misiniz?")) {
      console.log("Restoring version:", versionId);
    }
  };

  const handleCompare = (versionId: string) => {
    console.log("Comparing version:", versionId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <History className="h-5 w-5" />
          Versiyon Geçmişi
        </h3>
        <Badge variant="outline">
          {versions.length} versiyon
        </Badge>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Versiyon</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Kullanıcı</TableHead>
              <TableHead>İşlem</TableHead>
              <TableHead>Değişiklikler</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {versions.map((version, index) => (
              <TableRow key={version.id}>
                <TableCell className="font-medium">
                  v{version.version}
                  {index === 0 && (
                    <Badge variant="default" className="ml-2">
                      Güncel
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(version.timestamp).toLocaleString("tr-TR")}
                </TableCell>
                <TableCell>{version.user}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      version.action === "created"
                        ? "default"
                        : version.action === "updated"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {version.action === "created"
                      ? "Oluşturuldu"
                      : version.action === "updated"
                      ? "Güncellendi"
                      : "Silindi"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {version.changes.map((change, i) => (
                      <li key={i}>• {change}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {index !== 0 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRestore(version.id)}
                          title="Geri yükle"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCompare(version.id)}
                          title="Karşılaştır"
                        >
                          <GitCompare className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      title="İndir"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function DiffViewer({ oldContent, newContent }: { oldContent: string; newContent: string }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Eski Versiyon</h4>
        <div className="rounded-lg border bg-red-50 p-4">
          <pre className="text-sm whitespace-pre-wrap">{oldContent}</pre>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Yeni Versiyon</h4>
        <div className="rounded-lg border bg-green-50 p-4">
          <pre className="text-sm whitespace-pre-wrap">{newContent}</pre>
        </div>
      </div>
    </div>
  );
}
