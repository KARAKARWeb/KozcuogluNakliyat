"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Save, Info } from "lucide-react";
import type { AdvancedPricingConfig, PriceConfig, PriceType } from "@/types/advanced-pricing";

export default function AdminPricingConfigPage() {
  const [config, setConfig] = useState<AdvancedPricingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  async function fetchConfig() {
    setLoading(true);
    const res = await fetch("/api/advanced-pricing-config");
    const json = await res.json();
    if (json.success) setConfig(json.data);
    setLoading(false);
  }

  async function handleSave() {
    if (!config) return;
    setSaving(true);
    console.log("💾 Kaydetme başladı...", config);
    try {
      const response = await fetch("/api/advanced-pricing-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const result = await response.json();
      console.log("📥 API Response:", result);
      if (result.success) {
        alert("✅ Ayarlar başarıyla kaydedildi!");
      } else {
        alert("❌ Kaydetme hatası: " + (result.error || "Bilinmeyen hata"));
      }
    } catch (error) {
      console.error("❌ Kaydetme hatası:", error);
      alert("❌ Kaydetme sırasında hata oluştu!");
    }
    setSaving(false);
  }

  function updateServiceTolerance(service: keyof AdvancedPricingConfig['serviceTolerance'], field: keyof PriceConfig, value: any) {
    if (!config) return;
    setConfig({
      ...config,
      serviceTolerance: {
        ...config.serviceTolerance,
        [service]: {
          ...config.serviceTolerance[service],
          [field]: field === 'type' ? value : parseFloat(value) || 0,
        },
      },
    });
  }

  function updateRoomPricing(room: keyof AdvancedPricingConfig['roomPricing'], field: keyof PriceConfig, value: any) {
    if (!config) return;
    setConfig({
      ...config,
      roomPricing: {
        ...config.roomPricing,
        [room]: {
          ...config.roomPricing[room],
          [field]: field === 'type' ? value : parseFloat(value) || 0,
        },
      },
    });
  }

  function updateFloorPricing(location: 'departure' | 'arrival', field: keyof AdvancedPricingConfig['floorPricing']['departure'], subfield: keyof PriceConfig, value: any) {
    if (!config) return;
    setConfig({
      ...config,
      floorPricing: {
        ...config.floorPricing,
        [location]: {
          ...config.floorPricing[location],
          [field]: {
            ...config.floorPricing[location][field],
            [subfield]: subfield === 'type' ? value : parseFloat(value) || 0,
          },
        },
      },
    });
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!config) return null;

  const PriceInput = ({ 
    priceConfig, 
    onTypeChange, 
    onValueChange, 
    label 
  }: { 
    priceConfig: PriceConfig; 
    onTypeChange: (type: PriceType) => void; 
    onValueChange: (value: number) => void;
    label: string;
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Select value={priceConfig.type} onValueChange={onTypeChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentage">Yüzde (%)</SelectItem>
            <SelectItem value="fixed">Sabit (₺)</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          value={priceConfig.value}
          onChange={(e) => onValueChange(parseFloat(e.target.value) || 0)}
          placeholder={priceConfig.type === 'percentage' ? '0-100' : '0'}
          className="flex-1"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {priceConfig.type === 'percentage' 
          ? `Toplam fiyatın %${priceConfig.value}'i eklenecek` 
          : `${priceConfig.value} ₺ sabit ücret eklenecek`}
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gelişmiş Fiyat Hesaplama Ayarları"
        description="Tüm fiyatlandırma parametrelerini detaylı olarak yönetin"
      />

      <Tabs defaultValue="services" className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="inline-flex w-full min-w-max lg:grid lg:grid-cols-5">
            <TabsTrigger value="services" className="flex-1 whitespace-nowrap">Hizmet Tipleri</TabsTrigger>
            <TabsTrigger value="km" className="flex-1 whitespace-nowrap">KM Fiyatı</TabsTrigger>
            <TabsTrigger value="rooms" className="flex-1 whitespace-nowrap">Oda Sayısı</TabsTrigger>
            <TabsTrigger value="floors" className="flex-1 whitespace-nowrap">Kat & Asansör</TabsTrigger>
            <TabsTrigger value="extra" className="flex-1 whitespace-nowrap">Ekstra Hizmetler</TabsTrigger>
          </TabsList>
        </div>

        {/* Hizmet Tipleri Toleransları */}
        <TabsContent value="services" className="space-y-4">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start gap-2">
              <Info className="mt-1 h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-semibold text-[#122032]">Hizmet Tipi Toleransları</h3>
                <p className="text-sm text-muted-foreground">
                  Her hizmet tipi için ekstra ücret belirleyin. Yüzde veya sabit fiyat olarak girebilirsiniz.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <PriceInput
                label="Ev Taşıma Toleransı"
                priceConfig={config.serviceTolerance.ev}
                onTypeChange={(type) => updateServiceTolerance('ev', 'type', type)}
                onValueChange={(value) => updateServiceTolerance('ev', 'value', value)}
              />
              <PriceInput
                label="Ofis Taşıma Toleransı"
                priceConfig={config.serviceTolerance.ofis}
                onTypeChange={(type) => updateServiceTolerance('ofis', 'type', type)}
                onValueChange={(value) => updateServiceTolerance('ofis', 'value', value)}
              />
              <PriceInput
                label="Villa Taşıma Toleransı"
                priceConfig={config.serviceTolerance.villa}
                onTypeChange={(type) => updateServiceTolerance('villa', 'type', type)}
                onValueChange={(value) => updateServiceTolerance('villa', 'value', value)}
              />
              <PriceInput
                label="Parça Eşya Toleransı"
                priceConfig={config.serviceTolerance.parcaEsya}
                onTypeChange={(type) => updateServiceTolerance('parcaEsya', 'type', type)}
                onValueChange={(value) => updateServiceTolerance('parcaEsya', 'value', value)}
              />
              <PriceInput
                label="Eşya Depolama Toleransı"
                priceConfig={config.serviceTolerance.esyaDepolama}
                onTypeChange={(type) => updateServiceTolerance('esyaDepolama', 'type', type)}
                onValueChange={(value) => updateServiceTolerance('esyaDepolama', 'value', value)}
              />
              <PriceInput
                label="Şehirler Arası Toleransı"
                priceConfig={config.serviceTolerance.sehirlerArasi}
                onTypeChange={(type) => updateServiceTolerance('sehirlerArasi', 'type', type)}
                onValueChange={(value) => updateServiceTolerance('sehirlerArasi', 'value', value)}
              />
            </div>
          </div>
        </TabsContent>

        {/* KM Başı Fiyat */}
        <TabsContent value="km" className="space-y-4">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start gap-2">
              <Info className="mt-1 h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-semibold text-[#122032]">KM Başı Fiyatlandırma</h3>
                <p className="text-sm text-muted-foreground">
                  Şehirler arası taşımalarda KM başına ücret. Sistem otomatik olarak mesafeyi hesaplayıp çarpacak.
                </p>
              </div>
            </div>

            <div className="max-w-md space-y-2">
              <Label>KM Başı Fiyat (₺)</Label>
              <Input
                type="number"
                value={config.pricePerKm}
                onChange={(e) => setConfig({ ...config, pricePerKm: parseFloat(e.target.value) || 0 })}
                placeholder="Örn: 15"
              />
              <p className="text-xs text-muted-foreground">
                Örnek: İstanbul-İzmir arası 500 km ise, {config.pricePerKm} × 500 = {config.pricePerKm * 500} ₺ eklenecek
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Oda Sayısı Fiyatlandırması */}
        <TabsContent value="rooms" className="space-y-4">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start gap-2">
              <Info className="mt-1 h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-semibold text-[#122032]">Oda Sayısı Fiyatlandırması</h3>
                <p className="text-sm text-muted-foreground">
                  Her oda sayısı için ayrı fiyat belirleyin. Yüzde veya sabit fiyat olarak girebilirsiniz.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <PriceInput
                label="1-0 (Stüdyo)"
                priceConfig={config.roomPricing['1-0']}
                onTypeChange={(type) => updateRoomPricing('1-0', 'type', type)}
                onValueChange={(value) => updateRoomPricing('1-0', 'value', value)}
              />
              <PriceInput
                label="1+1"
                priceConfig={config.roomPricing['1+1']}
                onTypeChange={(type) => updateRoomPricing('1+1', 'type', type)}
                onValueChange={(value) => updateRoomPricing('1+1', 'value', value)}
              />
              <PriceInput
                label="2+1"
                priceConfig={config.roomPricing['2+1']}
                onTypeChange={(type) => updateRoomPricing('2+1', 'type', type)}
                onValueChange={(value) => updateRoomPricing('2+1', 'value', value)}
              />
              <PriceInput
                label="3+1"
                priceConfig={config.roomPricing['3+1']}
                onTypeChange={(type) => updateRoomPricing('3+1', 'type', type)}
                onValueChange={(value) => updateRoomPricing('3+1', 'value', value)}
              />
              <PriceInput
                label="4+1"
                priceConfig={config.roomPricing['4+1']}
                onTypeChange={(type) => updateRoomPricing('4+1', 'type', type)}
                onValueChange={(value) => updateRoomPricing('4+1', 'value', value)}
              />
              <PriceInput
                label="5+1 ve Üzeri"
                priceConfig={config.roomPricing['5+1']}
                onTypeChange={(type) => updateRoomPricing('5+1', 'type', type)}
                onValueChange={(value) => updateRoomPricing('5+1', 'value', value)}
              />
              <PriceInput
                label="Villa & Müstakil"
                priceConfig={config.roomPricing.villa}
                onTypeChange={(type) => updateRoomPricing('villa', 'type', type)}
                onValueChange={(value) => updateRoomPricing('villa', 'value', value)}
              />
            </div>
          </div>
        </TabsContent>

        {/* Kat & Asansör */}
        <TabsContent value="floors" className="space-y-4">
          {/* Çıkış Katı */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-[#122032]">Çıkış Katı Fiyatlandırması</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <PriceInput
                label="Kat Başına Ücret"
                priceConfig={config.floorPricing.departure.perFloor}
                onTypeChange={(type) => updateFloorPricing('departure', 'perFloor', 'type', type)}
                onValueChange={(value) => updateFloorPricing('departure', 'perFloor', 'value', value)}
              />
              <PriceInput
                label="Asansör Var"
                priceConfig={config.floorPricing.departure.withElevator}
                onTypeChange={(type) => updateFloorPricing('departure', 'withElevator', 'type', type)}
                onValueChange={(value) => updateFloorPricing('departure', 'withElevator', 'value', value)}
              />
              <PriceInput
                label="Asansör Yok"
                priceConfig={config.floorPricing.departure.withoutElevator}
                onTypeChange={(type) => updateFloorPricing('departure', 'withoutElevator', 'type', type)}
                onValueChange={(value) => updateFloorPricing('departure', 'withoutElevator', 'value', value)}
              />
            </div>
          </div>

          {/* Varış Katı */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-semibold text-[#122032]">Varış Katı Fiyatlandırması</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <PriceInput
                label="Kat Başına Ücret"
                priceConfig={config.floorPricing.arrival.perFloor}
                onTypeChange={(type) => updateFloorPricing('arrival', 'perFloor', 'type', type)}
                onValueChange={(value) => updateFloorPricing('arrival', 'perFloor', 'value', value)}
              />
              <PriceInput
                label="Asansör Var"
                priceConfig={config.floorPricing.arrival.withElevator}
                onTypeChange={(type) => updateFloorPricing('arrival', 'withElevator', 'type', type)}
                onValueChange={(value) => updateFloorPricing('arrival', 'withElevator', 'value', value)}
              />
              <PriceInput
                label="Asansör Yok"
                priceConfig={config.floorPricing.arrival.withoutElevator}
                onTypeChange={(type) => updateFloorPricing('arrival', 'withoutElevator', 'type', type)}
                onValueChange={(value) => updateFloorPricing('arrival', 'withoutElevator', 'value', value)}
              />
            </div>
          </div>
        </TabsContent>

        {/* Ekstra Hizmetler */}
        <TabsContent value="extra" className="space-y-4">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start gap-2">
              <Info className="mt-1 h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-semibold text-[#122032]">Ekstra Hizmetler</h3>
                <p className="text-sm text-muted-foreground">
                  Kullanıcının talep edebileceği ekstra hizmetler için fiyatlandırma.
                </p>
              </div>
            </div>

            <div className="max-w-md">
              <PriceInput
                label="Ekstra Asansörlü Taşıma"
                priceConfig={config.extraElevatorService}
                onTypeChange={(type) => setConfig({ ...config, extraElevatorService: { ...config.extraElevatorService, type } })}
                onValueChange={(value) => setConfig({ ...config, extraElevatorService: { ...config.extraElevatorService, value } })}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Kaydet Butonu */}
      <div className="flex justify-end gap-3 border-t pt-6">
        <Button
          variant="outline"
          onClick={fetchConfig}
        >
          İptal / Sıfırla
        </Button>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#e3000f] hover:bg-[#c5000d]"
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Kaydet
        </Button>
      </div>
    </div>
  );
}
