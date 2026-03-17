"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save, Check } from "lucide-react";

const HIZMET_TIPLERI = [
  { value: "evden-eve", label: "Evden Eve Nakliyat", icon: "🏠" },
  { value: "ofis", label: "Ofis Taşıma", icon: "🏢" },
  { value: "villa", label: "Villa Taşıma", icon: "🏡" },
  { value: "parca", label: "Parça Eşya Taşıma", icon: "📦" },
  { value: "depolama", label: "Eşya Depolama", icon: "🏪" },
  { value: "sehirlerarasi", label: "Şehirler Arası Nakliyat", icon: "🚛" },
];

const SERVICE_MAP: Record<string, string> = {
  "evden-eve": "ev",
  "ofis": "ofis",
  "villa": "villa",
  "parca": "parcaEsya",
  "depolama": "esyaDepolama",
  "sehirlerarasi": "sehirlerArasi",
};

export default function AdminPricingPage() {
  const [selectedService, setSelectedService] = useState("evden-eve");
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [priceType, setPriceType] = useState<"percentage" | "fixed">("percentage");
  const [priceValue, setPriceValue] = useState(0);

  async function fetchConfig() {
    setLoading(true);
    const res = await fetch("/api/advanced-pricing-config");
    const json = await res.json();
    if (json.success) {
      setConfig(json.data);
      // Seçili hizmet tipinin mevcut değerlerini yükle
      const serviceKey = SERVICE_MAP[selectedService];
      const serviceTolerance = json.data.serviceTolerance?.[serviceKey];
      if (serviceTolerance) {
        setPriceType(serviceTolerance.type);
        setPriceValue(serviceTolerance.value);
      }
    }
    setLoading(false);
  }

  useEffect(() => { fetchConfig(); }, []);

  useEffect(() => {
    if (config) {
      const serviceKey = SERVICE_MAP[selectedService];
      const serviceTolerance = config.serviceTolerance?.[serviceKey];
      if (serviceTolerance) {
        setPriceType(serviceTolerance.type);
        setPriceValue(serviceTolerance.value);
      }
    }
  }, [selectedService, config]);

  async function handleSave() {
    if (!config) return;
    setSaving(true);
    
    const serviceKey = SERVICE_MAP[selectedService];
    const updatedConfig = {
      ...config,
      serviceTolerance: {
        ...config.serviceTolerance,
        [serviceKey]: {
          type: priceType,
          value: priceValue,
        },
      },
    };

    try {
      const response = await fetch("/api/advanced-pricing-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedConfig),
      });
      const result = await response.json();
      if (result.success) {
        setConfig(result.data);
        alert("✅ Fiyat başarıyla kaydedildi!");
      } else {
        alert("❌ Kaydetme hatası!");
      }
    } catch (error) {
      alert("❌ Kaydetme sırasında hata oluştu!");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hizmet Tipi Fiyatlandırma"
        description="Her hizmet tipi için tolerans fiyatı belirleyin"
      />

      {/* Hizmet Tipi Seçimi */}
      <div>
        <h3 className="mb-4 text-sm font-semibold text-[#122032]">Taşıma Tipi Seçin</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {HIZMET_TIPLERI.map((hizmet) => (
            <button
              key={hizmet.value}
              type="button"
              onClick={() => setSelectedService(hizmet.value)}
              className={`group relative rounded-xl border-2 p-5 text-left transition-all ${
                selectedService === hizmet.value
                  ? "border-[#e3000f] bg-gradient-to-br from-[#fef2f2] to-white shadow-lg ring-2 ring-[#e3000f]/20"
                  : "border-gray-100 bg-gray-50/50 hover:border-[#e3000f]/30 hover:bg-white hover:shadow-md"
              }`}
            >
              <span className="mb-2 block text-2xl">{hizmet.icon}</span>
              <span className={`block text-sm font-bold ${selectedService === hizmet.value ? "text-[#e3000f]" : "text-[#122032]"}`}>
                {hizmet.label}
              </span>
              {selectedService === hizmet.value && (
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#e3000f] shadow-sm">
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Fiyat Ayarları */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-[#122032]">
          {HIZMET_TIPLERI.find(h => h.value === selectedService)?.label} - Tolerans Fiyatı
        </h3>
        
        <div className="max-w-md space-y-4">
          <div className="space-y-2">
            <Label>Fiyat Tipi</Label>
            <Select value={priceType} onValueChange={(v: "percentage" | "fixed") => setPriceType(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Yüzde (%)</SelectItem>
                <SelectItem value="fixed">Sabit (₺)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Değer</Label>
            <Input
              type="number"
              value={priceValue}
              onChange={(e) => setPriceValue(parseFloat(e.target.value) || 0)}
              placeholder={priceType === "percentage" ? "0-100" : "0"}
            />
            <p className="text-xs text-muted-foreground">
              {priceType === "percentage" 
                ? `Toplam fiyatın %${priceValue}'i eklenecek` 
                : `${priceValue} ₺ sabit ücret eklenecek`}
            </p>
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
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

        {/* Mevcut Değerler Özeti */}
        {config && (
          <div className="mt-6 border-t pt-6">
            <h4 className="mb-3 text-sm font-semibold text-[#122032]">Tüm Hizmet Tipleri - Mevcut Değerler</h4>
            <div className="grid gap-2 text-sm">
              {HIZMET_TIPLERI.map((hizmet) => {
                const serviceKey = SERVICE_MAP[hizmet.value];
                const tolerance = config.serviceTolerance?.[serviceKey];
                return (
                  <div key={hizmet.value} className="flex items-center justify-between rounded-lg border bg-gray-50 px-3 py-2">
                    <span className="flex items-center gap-2">
                      <span>{hizmet.icon}</span>
                      <span className="font-medium">{hizmet.label}</span>
                    </span>
                    <span className="text-muted-foreground">
                      {tolerance ? (
                        tolerance.type === "percentage" 
                          ? `%${tolerance.value}` 
                          : `${tolerance.value} ₺`
                      ) : "Ayarlanmamış"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
