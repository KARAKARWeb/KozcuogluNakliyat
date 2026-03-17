"use client";

import { useState } from "react";
import { Package, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface BundleInfo {
  name: string;
  size: number;
  gzipSize: number;
  modules: number;
  percentage: number;
}

export function BundleAnalyzer() {
  const [bundles] = useState<BundleInfo[]>([
    { name: "main", size: 245000, gzipSize: 89000, modules: 156, percentage: 35 },
    { name: "framework", size: 180000, gzipSize: 65000, modules: 89, percentage: 26 },
    { name: "commons", size: 120000, gzipSize: 45000, modules: 67, percentage: 17 },
    { name: "admin", size: 95000, gzipSize: 34000, modules: 45, percentage: 14 },
    { name: "vendors", size: 60000, gzipSize: 22000, modules: 23, percentage: 8 },
  ]);

  const totalSize = bundles.reduce((sum, b) => sum + b.size, 0);
  const totalGzipSize = bundles.reduce((sum, b) => sum + b.gzipSize, 0);
  const compressionRatio = ((totalSize - totalGzipSize) / totalSize) * 100;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const getSizeStatus = (size: number) => {
    if (size < 100000) return { color: "text-green-600", label: "İyi", icon: CheckCircle };
    if (size < 200000) return { color: "text-yellow-600", label: "Orta", icon: AlertCircle };
    return { color: "text-red-600", label: "Büyük", icon: AlertCircle };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Bundle Analizi</h2>
        <Badge variant="outline">
          Toplam: {formatBytes(totalGzipSize)} (gzip)
        </Badge>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Toplam Boyut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(totalSize)}</div>
            <p className="text-xs text-muted-foreground">Sıkıştırılmamış</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Gzip Boyut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(totalGzipSize)}</div>
            <p className="text-xs text-muted-foreground">Sıkıştırılmış</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sıkıştırma</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {compressionRatio.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Tasarruf</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bundle Sayısı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bundles.length}</div>
            <p className="text-xs text-muted-foreground">Chunk</p>
          </CardContent>
        </Card>
      </div>

      {/* Bundle List */}
      <Card>
        <CardHeader>
          <CardTitle>Bundle Detayları</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bundles.map((bundle) => {
              const status = getSizeStatus(bundle.size);
              const StatusIcon = status.icon;

              return (
                <div key={bundle.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">{bundle.name}.js</div>
                        <div className="text-xs text-muted-foreground">
                          {bundle.modules} modül
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold">{formatBytes(bundle.size)}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatBytes(bundle.gzipSize)} gzip
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-4 w-4 ${status.color}`} />
                        <Badge variant="outline" className={status.color}>
                          {status.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Progress value={bundle.percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">
                    {bundle.percentage}% of total
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Optimizasyon Önerileri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900">Code Splitting</p>
                <p className="text-sm text-blue-800">
                  Admin bundle'ı dynamic import ile yükleyin
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">Tree Shaking</p>
                <p className="text-sm text-green-800">
                  Kullanılmayan kod başarıyla temizlendi
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-900">Vendor Bundle</p>
                <p className="text-sm text-yellow-800">
                  Büyük kütüphaneleri CDN'den yükleyebilirsiniz
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function TreeShakingReport() {
  const unusedExports = [
    { module: "lucide-react", exports: ["Zap", "Wifi", "Wind"], size: 12000 },
    { module: "date-fns", exports: ["formatDistance", "formatRelative"], size: 8500 },
    { module: "lodash", exports: ["debounce", "throttle"], size: 6200 },
  ];

  const formatBytes = (bytes: number) => {
    return (bytes / 1024).toFixed(1) + " KB";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tree Shaking Raporu</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {unusedExports.map((item) => (
            <div key={item.module} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{item.module}</span>
                <Badge variant="destructive">{formatBytes(item.size)}</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Kullanılmayan: {item.exports.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
