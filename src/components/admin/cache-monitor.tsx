"use client";

import { useState, useEffect } from "react";
import { Database, Trash2, RefreshCw, HardDrive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { checkCacheQuota, invalidateCache } from "@/lib/caching";

export function CacheMonitor() {
  const [cacheInfo, setCacheInfo] = useState({
    usage: 0,
    quota: 0,
    percentage: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCacheInfo();
  }, []);

  const loadCacheInfo = async () => {
    setLoading(true);
    const info = await checkCacheQuota();
    setCacheInfo(info);
    setLoading(false);
  };

  const handleClearCache = async () => {
    if (confirm("Tüm cache temizlensin mi?")) {
      invalidateCache();
      await loadCacheInfo();
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const getStatusColor = (percentage: number) => {
    if (percentage < 50) return "text-green-600";
    if (percentage < 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Cache Yönetimi</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadCacheInfo} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Yenile
          </Button>
          <Button variant="destructive" onClick={handleClearCache}>
            <Trash2 className="mr-2 h-4 w-4" />
            Cache Temizle
          </Button>
        </div>
      </div>

      {/* Cache Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Kullanılan Alan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(cacheInfo.usage)}</div>
            <p className="text-xs text-muted-foreground">Cache boyutu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kota</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(cacheInfo.quota)}</div>
            <p className="text-xs text-muted-foreground">Maksimum alan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Kullanım Oranı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getStatusColor(cacheInfo.percentage)}`}>
              {cacheInfo.percentage.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Dolu</p>
          </CardContent>
        </Card>
      </div>

      {/* Cache Usage Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Depolama Kullanımı
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={cacheInfo.percentage} className="h-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatBytes(cacheInfo.usage)} kullanıldı</span>
              <span>{formatBytes(cacheInfo.quota - cacheInfo.usage)} boş</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cache Types */}
      <Card>
        <CardHeader>
          <CardTitle>Cache Türleri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-semibold">Service Worker Cache</p>
                  <p className="text-sm text-muted-foreground">
                    Statik dosyalar ve API yanıtları
                  </p>
                </div>
              </div>
              <Badge>Aktif</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-semibold">API Response Cache</p>
                  <p className="text-sm text-muted-foreground">
                    5 dakika TTL
                  </p>
                </div>
              </div>
              <Badge>Aktif</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="font-semibold">Browser Storage</p>
                  <p className="text-sm text-muted-foreground">
                    LocalStorage & SessionStorage
                  </p>
                </div>
              </div>
              <Badge>Aktif</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-semibold">CDN Cache</p>
                  <p className="text-sm text-muted-foreground">
                    Statik asset'ler için
                  </p>
                </div>
              </div>
              <Badge variant="outline">Yapılandırılmış</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cache Strategies */}
      <Card>
        <CardHeader>
          <CardTitle>Cache Stratejileri</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-semibold text-blue-900 mb-1">Cache First</p>
              <p className="text-sm text-blue-800">
                Statik dosyalar için - Önce cache kontrol edilir
              </p>
            </div>

            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-semibold text-green-900 mb-1">Network First</p>
              <p className="text-sm text-green-800">
                API istekleri için - Önce network denenir
              </p>
            </div>

            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-semibold text-purple-900 mb-1">Stale While Revalidate</p>
              <p className="text-sm text-purple-800">
                Dinamik içerik için - Cache'den hızlı yanıt, arka planda güncelleme
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
