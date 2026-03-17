"use client";

import { useState } from "react";
import { Plus, Play, Pause, Trophy, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ABTest, ABTestResult } from "@/lib/ab-testing";
import { determineWinner, calculateSignificance } from "@/lib/ab-testing";

export function ABTestDashboard() {
  const [tests, setTests] = useState<ABTest[]>([
    {
      id: "test_001",
      name: "Teklif Butonu Rengi",
      description: "Kırmızı vs Yeşil buton testi",
      status: "running",
      variants: [
        { id: "control", name: "Kırmızı Buton", weight: 50, config: { color: "red" } },
        { id: "variant_a", name: "Yeşil Buton", weight: 50, config: { color: "green" } },
      ],
      startDate: "2024-02-01",
      targetMetric: "conversion_rate",
      sampleSize: 1000,
      confidenceLevel: 95,
    },
    {
      id: "test_002",
      name: "Ana Sayfa Başlık",
      description: "Farklı başlık metinleri",
      status: "running",
      variants: [
        { id: "control", name: "Mevcut Başlık", weight: 33.33, config: {} },
        { id: "variant_a", name: "Başlık A", weight: 33.33, config: {} },
        { id: "variant_b", name: "Başlık B", weight: 33.34, config: {} },
      ],
      startDate: "2024-02-05",
      targetMetric: "click_through_rate",
      sampleSize: 2000,
      confidenceLevel: 95,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusColor = (status: ABTest["status"]) => {
    switch (status) {
      case "running":
        return "bg-green-500";
      case "paused":
        return "bg-yellow-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">A/B Test Yönetimi</h2>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Test Oluştur
        </Button>
      </div>

      {/* Active Tests Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Aktif Testler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tests.filter((t) => t.status === "running").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tests.filter((t) => t.status === "completed").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Toplam Katılımcı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,456</div>
          </CardContent>
        </Card>
      </div>

      {/* Tests List */}
      <div className="space-y-4">
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </div>
    </div>
  );
}

function TestCard({ test }: { test: ABTest }) {
  const mockResults: ABTestResult[] = test.variants.map((variant) => ({
    variantId: variant.id,
    impressions: Math.floor(Math.random() * 1000) + 500,
    conversions: Math.floor(Math.random() * 100) + 20,
    conversionRate: 0,
  }));

  mockResults.forEach((result) => {
    result.conversionRate = (result.conversions / result.impressions) * 100;
  });

  const winner = determineWinner(mockResults);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CardTitle>{test.name}</CardTitle>
              <Badge
                variant={test.status === "running" ? "default" : "secondary"}
                className="capitalize"
              >
                {test.status === "running" ? "Aktif" : test.status === "paused" ? "Duraklatıldı" : "Tamamlandı"}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{test.description}</p>
          </div>
          <div className="flex gap-2">
            {test.status === "running" ? (
              <Button variant="outline" size="sm">
                <Pause className="mr-2 h-4 w-4" />
                Duraklat
              </Button>
            ) : (
              <Button variant="outline" size="sm">
                <Play className="mr-2 h-4 w-4" />
                Başlat
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Variants */}
          {test.variants.map((variant) => {
            const result = mockResults.find((r) => r.variantId === variant.id);
            if (!result) return null;

            const isWinner = winner?.variantId === variant.id;

            return (
              <div
                key={variant.id}
                className={`rounded-lg border p-4 ${isWinner ? "border-green-500 bg-green-50" : ""}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{variant.name}</h4>
                    {isWinner && (
                      <Badge className="bg-green-600">
                        <Trophy className="mr-1 h-3 w-3" />
                        Kazanan
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">{variant.weight}% trafik</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Görüntülenme</div>
                    <div className="text-lg font-semibold">{result.impressions.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Dönüşüm</div>
                    <div className="text-lg font-semibold">{result.conversions}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Oran</div>
                    <div className="text-lg font-semibold">{result.conversionRate.toFixed(2)}%</div>
                  </div>
                </div>

                <Progress value={(result.impressions / test.sampleSize) * 100} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">
                  {((result.impressions / test.sampleSize) * 100).toFixed(1)}% hedef tamamlandı
                </div>
              </div>
            );
          })}

          {/* Statistical Significance */}
          {winner && (
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-blue-900">İstatistiksel Önem</span>
              </div>
              <p className="text-sm text-blue-800">
                {winner.confidence?.toFixed(1)}% güven seviyesi ile <strong>{test.variants.find(v => v.id === winner.variantId)?.name}</strong> kazanıyor.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function CreateABTestModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    targetMetric: "conversion_rate",
    sampleSize: 1000,
    confidenceLevel: 95,
  });

  const [variants, setVariants] = useState([
    { id: "control", name: "Control", weight: 50 },
    { id: "variant_a", name: "Variant A", weight: 50 },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save test logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Yeni A/B Test Oluştur</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Test Adı</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sampleSize">Hedef Katılımcı</Label>
                <Input
                  id="sampleSize"
                  type="number"
                  value={formData.sampleSize}
                  onChange={(e) => setFormData({ ...formData, sampleSize: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="confidence">Güven Seviyesi (%)</Label>
                <Input
                  id="confidence"
                  type="number"
                  value={formData.confidenceLevel}
                  onChange={(e) => setFormData({ ...formData, confidenceLevel: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <Label>Varyantlar</Label>
              <div className="space-y-2 mt-2">
                {variants.map((variant, index) => (
                  <div key={variant.id} className="flex gap-2">
                    <Input
                      placeholder="Varyant adı"
                      value={variant.name}
                      onChange={(e) => {
                        const newVariants = [...variants];
                        newVariants[index].name = e.target.value;
                        setVariants(newVariants);
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="Ağırlık %"
                      value={variant.weight}
                      onChange={(e) => {
                        const newVariants = [...variants];
                        newVariants[index].weight = parseInt(e.target.value);
                        setVariants(newVariants);
                      }}
                      className="w-32"
                    />
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  setVariants([
                    ...variants,
                    { id: `variant_${variants.length}`, name: `Variant ${String.fromCharCode(64 + variants.length)}`, weight: 0 },
                  ]);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Varyant Ekle
              </Button>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                İptal
              </Button>
              <Button type="submit">Test Oluştur</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export function ABTestReporting({ testId }: { testId: string }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Test Raporu</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dönüşüm Oranı Karşılaştırması</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
              <p className="text-sm text-muted-foreground">Grafik buraya gelecek</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Zaman İçinde Performans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
              <p className="text-sm text-muted-foreground">Grafik buraya gelecek</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
