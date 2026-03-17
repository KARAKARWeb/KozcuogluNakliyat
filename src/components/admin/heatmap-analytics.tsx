"use client";

import { useState } from "react";
import { MousePointer, Eye, MousePointerClick, TrendingDown, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HeatmapData {
  page: string;
  clicks: number;
  scrollDepth: number;
  avgTimeOnPage: number;
  exitRate: number;
}

export function HeatmapAnalytics() {
  const [selectedPage, setSelectedPage] = useState("/");
  const [heatmapType, setHeatmapType] = useState<"click" | "scroll" | "move">("click");

  const pages = [
    { value: "/", label: "Ana Sayfa" },
    { value: "/ev-tasima", label: "Ev Taşıma" },
    { value: "/ofis-tasima", label: "Ofis Taşıma" },
    { value: "/iletisim", label: "İletişim" },
    { value: "/blog", label: "Blog" },
  ];

  const heatmapData: HeatmapData[] = [
    {
      page: "/",
      clicks: 1543,
      scrollDepth: 75,
      avgTimeOnPage: 145,
      exitRate: 35.2,
    },
    {
      page: "/ev-tasima",
      clicks: 987,
      scrollDepth: 82,
      avgTimeOnPage: 198,
      exitRate: 28.5,
    },
    {
      page: "/ofis-tasima",
      clicks: 765,
      scrollDepth: 68,
      avgTimeOnPage: 167,
      exitRate: 42.1,
    },
  ];

  const clickHotspots = [
    { element: "Teklif Al Butonu", clicks: 543, percentage: 35.2 },
    { element: "Telefon Numarası", clicks: 321, percentage: 20.8 },
    { element: "WhatsApp Butonu", clicks: 287, percentage: 18.6 },
    { element: "Hizmetler Menü", clicks: 198, percentage: 12.8 },
    { element: "Blog Linki", clicks: 194, percentage: 12.6 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Heatmap Analizi</h2>
        <div className="flex gap-3">
          <Select value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pages.map((page) => (
                <SelectItem key={page.value} value={page.value}>
                  {page.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={heatmapType === "click" ? "default" : "outline"}
              size="sm"
              onClick={() => setHeatmapType("click")}
            >
              <MousePointerClick className="mr-2 h-4 w-4" />
              Tıklama
            </Button>
            <Button
              variant={heatmapType === "scroll" ? "default" : "outline"}
              size="sm"
              onClick={() => setHeatmapType("scroll")}
            >
              <TrendingDown className="mr-2 h-4 w-4" />
              Scroll
            </Button>
            <Button
              variant={heatmapType === "move" ? "default" : "outline"}
              size="sm"
              onClick={() => setHeatmapType("move")}
            >
              <MousePointer className="mr-2 h-4 w-4" />
              Hareket
            </Button>
          </div>
        </div>
      </div>

      {/* Page Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Toplam Tıklama</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,543</div>
            <p className="text-xs text-muted-foreground">Bu sayfada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scroll Derinliği</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">Ortalama</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sayfa Süresi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2:25</div>
            <p className="text-xs text-muted-foreground">Ortalama</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Çıkış Oranı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">35.2%</div>
            <p className="text-xs text-muted-foreground">Bu sayfadan</p>
          </CardContent>
        </Card>
      </div>

      {/* Click Hotspots */}
      <Card>
        <CardHeader>
          <CardTitle>En Çok Tıklanan Elementler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clickHotspots.map((hotspot, index) => (
              <div key={hotspot.element}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="font-medium">{hotspot.element}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{hotspot.clicks} tıklama</div>
                    <div className="text-sm text-muted-foreground">
                      {hotspot.percentage}%
                    </div>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${hotspot.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Heatmap Visualization Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Heatmap Görselleştirme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gradient-to-br from-blue-50 to-red-50 rounded-lg flex items-center justify-center border-2 border-dashed">
            <div className="text-center">
              <Eye className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Hotjar heatmap buraya yüklenecek
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Hotjar entegrasyonu aktif olduğunda gerçek zamanlı heatmap görüntülenecek
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function SessionRecordings() {
  const [filter, setFilter] = useState<"all" | "converted" | "bounced">("all");

  const recordings = [
    {
      id: "rec_001",
      date: "2024-02-14 15:30",
      duration: "4:32",
      pages: 5,
      converted: true,
      device: "Desktop",
      location: "Ankara",
    },
    {
      id: "rec_002",
      date: "2024-02-14 14:15",
      duration: "1:45",
      pages: 2,
      converted: false,
      device: "Mobile",
      location: "İstanbul",
    },
    {
      id: "rec_003",
      date: "2024-02-14 13:20",
      duration: "6:18",
      pages: 8,
      converted: true,
      device: "Desktop",
      location: "İzmir",
    },
  ];

  const filteredRecordings = recordings.filter((rec) => {
    if (filter === "converted") return rec.converted;
    if (filter === "bounced") return !rec.converted && rec.pages === 1;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Session Kayıtları</h2>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            Tümü ({recordings.length})
          </Button>
          <Button
            variant={filter === "converted" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("converted")}
          >
            Dönüşenler ({recordings.filter((r) => r.converted).length})
          </Button>
          <Button
            variant={filter === "bounced" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("bounced")}
          >
            Hemen Çıkanlar ({recordings.filter((r) => !r.converted && r.pages === 1).length})
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredRecordings.map((recording) => (
          <Card key={recording.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{recording.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {recording.device} • {recording.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Süre</div>
                    <div className="font-semibold">{recording.duration}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Sayfa</div>
                    <div className="font-semibold">{recording.pages}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Durum</div>
                    <div
                      className={`font-semibold ${
                        recording.converted ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {recording.converted ? "Dönüştü" : "Çıktı"}
                    </div>
                  </div>
                  <Button size="sm">İzle</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function FunnelAnalysis() {
  const funnelData = [
    { step: "Ana Sayfa Ziyareti", users: 10000, dropoff: 0 },
    { step: "Hizmet Sayfası", users: 6500, dropoff: 35 },
    { step: "Teklif Formu", users: 2800, dropoff: 57 },
    { step: "Form Doldurma", users: 1200, dropoff: 57 },
    { step: "Form Gönderme", users: 850, dropoff: 29 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dönüşüm Hunisi Analizi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {funnelData.map((step, index) => (
            <div key={step.step}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="font-medium">{step.step}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{step.users.toLocaleString()} kullanıcı</div>
                  {step.dropoff > 0 && (
                    <div className="text-sm text-red-600">-%{step.dropoff} kayıp</div>
                  )}
                </div>
              </div>
              <div className="relative h-16 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/70 flex items-center px-4 text-white font-medium"
                  style={{ width: `${(step.users / funnelData[0].users) * 100}%` }}
                >
                  {((step.users / funnelData[0].users) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
