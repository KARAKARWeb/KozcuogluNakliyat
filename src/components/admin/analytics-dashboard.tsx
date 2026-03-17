"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Users, MousePointer, Clock, Target, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  avgTimeOnSite: number;
  bounceRate: number;
  conversions: number;
  conversionRate: number;
  topPages: Array<{ page: string; views: number }>;
  topSources: Array<{ source: string; visitors: number }>;
  goals: Array<{ name: string; completions: number; target: number }>;
  ecommerce: {
    revenue: number;
    transactions: number;
    avgOrderValue: number;
  };
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData>({
    pageViews: 12543,
    uniqueVisitors: 8234,
    avgTimeOnSite: 245,
    bounceRate: 42.5,
    conversions: 156,
    conversionRate: 1.89,
    topPages: [
      { page: "/", views: 3421 },
      { page: "/ev-tasima", views: 2156 },
      { page: "/ankara-nakliyat", views: 1876 },
      { page: "/blog", views: 1543 },
      { page: "/iletisim", views: 1234 },
    ],
    topSources: [
      { source: "Google Organic", visitors: 4521 },
      { source: "Direct", visitors: 2134 },
      { source: "Facebook", visitors: 876 },
      { source: "Instagram", visitors: 543 },
      { source: "Referral", visitors: 160 },
    ],
    goals: [
      { name: "Teklif Formu", completions: 89, target: 100 },
      { name: "Telefon Tıklama", completions: 234, target: 200 },
      { name: "WhatsApp Tıklama", completions: 156, target: 150 },
      { name: "Blog Okuma", completions: 543, target: 500 },
    ],
    ecommerce: {
      revenue: 45678,
      transactions: 23,
      avgOrderValue: 1986,
    },
  });

  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange("7d")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === "7d"
                ? "bg-primary text-white"
                : "bg-white border hover:bg-gray-50"
            }`}
          >
            Son 7 Gün
          </button>
          <button
            onClick={() => setTimeRange("30d")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === "30d"
                ? "bg-primary text-white"
                : "bg-white border hover:bg-gray-50"
            }`}
          >
            Son 30 Gün
          </button>
          <button
            onClick={() => setTimeRange("90d")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === "90d"
                ? "bg-primary text-white"
                : "bg-white border hover:bg-gray-50"
            }`}
          >
            Son 90 Gün
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sayfa Görüntüleme</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.pageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+12.5%</span> önceki döneme göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Benzersiz Ziyaretçi</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.uniqueVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+8.3%</span> önceki döneme göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ort. Süre</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(data.avgTimeOnSite)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-600">+15.2%</span> önceki döneme göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Dönüşüm Oranı</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.conversionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {data.conversions} dönüşüm
            </p>
          </CardContent>
        </Card>
      </div>

      {/* E-commerce Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₺{data.ecommerce.revenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {data.ecommerce.transactions} işlem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Sipariş</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₺{data.ecommerce.avgOrderValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Sipariş başına
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Hemen Çıkma</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.bounceRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-red-600">-3.2%</span> önceki döneme göre
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Goals Tracking */}
      <Card>
        <CardHeader>
          <CardTitle>Hedef Takibi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.goals.map((goal) => {
            const percentage = (goal.completions / goal.target) * 100;
            return (
              <div key={goal.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{goal.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {goal.completions} / {goal.target}
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Top Pages & Sources */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>En Çok Görüntülenen Sayfalar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">{page.page}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {page.views.toLocaleString()} görüntüleme
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trafik Kaynakları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.topSources.map((source, index) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium">{source.source}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {source.visitors.toLocaleString()} ziyaretçi
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ConversionFunnel() {
  const funnelSteps = [
    { name: "Sayfa Ziyareti", count: 10000, percentage: 100 },
    { name: "Hizmet Görüntüleme", count: 5000, percentage: 50 },
    { name: "Teklif Formu Açma", count: 1500, percentage: 15 },
    { name: "Form Doldurma", count: 500, percentage: 5 },
    { name: "Form Gönderme", count: 250, percentage: 2.5 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dönüşüm Hunisi</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {funnelSteps.map((step, index) => (
            <div key={step.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{step.name}</span>
                <span className="text-sm text-muted-foreground">
                  {step.count.toLocaleString()} ({step.percentage}%)
                </span>
              </div>
              <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center text-white text-sm font-medium"
                  style={{ width: `${step.percentage}%` }}
                >
                  {step.percentage}%
                </div>
              </div>
              {index < funnelSteps.length - 1 && (
                <div className="flex justify-center my-2">
                  <div className="text-xs text-muted-foreground">
                    ↓ {((funnelSteps[index + 1].count / step.count) * 100).toFixed(1)}% geçiş
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
