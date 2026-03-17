"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import PageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Trash2 } from "lucide-react";

interface PriceItem {
  title: string;
  price: string;
  description?: string;
}

interface PricingPageData {
  id: string;
  slug: string;
  title: string;
  description: string;
  prices: PriceItem[];
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export default function EditPricingPage() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === "new";
  
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<PricingPageData>({
    id: "",
    slug: "",
    title: "",
    description: "",
    prices: [{ title: "", price: "", description: "" }],
    isActive: true,
    seoTitle: "",
    seoDescription: "",
  });

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/pricing-pages/${params.id}`)
        .then(res => res.json())
        .then(json => {
          if (json.success) setData(json.data);
          setLoading(false);
        });
    }
  }, [params.id, isNew]);

  const addPrice = () => {
    setData(prev => ({
      ...prev,
      prices: [...prev.prices, { title: "", price: "", description: "" }]
    }));
  };

  const removePrice = (index: number) => {
    setData(prev => ({
      ...prev,
      prices: prev.prices.filter((_, i) => i !== index)
    }));
  };

  const updatePrice = (index: number, field: keyof PriceItem, value: string) => {
    setData(prev => ({
      ...prev,
      prices: prev.prices.map((p, i) => i === index ? { ...p, [field]: value } : p)
    }));
  };

  const handleSave = async () => {
    console.log("💾 Kaydetme başladı:", data);
    setSaving(true);
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? "/api/pricing-pages" : `/api/pricing-pages/${params.id}`;
    
    console.log("📡 API isteği:", { method, url, data });
    
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      console.log("📥 API yanıtı:", json);

      if (res.ok && json.success) {
        console.log("✅ Kayıt başarılı!");
        alert("✅ Fiyat sayfası başarıyla kaydedildi!");
        router.push("/admin/pricing-pages");
      } else {
        console.error("❌ Kayıt başarısız:", json);
        alert("❌ Kayıt başarısız: " + (json.error || "Bilinmeyen hata"));
      }
    } catch (error) {
      console.error("❌ Kayıt hatası:", error);
      alert("❌ Kayıt hatası: " + error);
    }
    
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title={isNew ? "Yeni Fiyat Sayfası" : "Fiyat Sayfası Düzenle"}
        description="Fiyat bilgilerini ve SEO ayarlarını düzenleyin"
      />

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="space-y-6">
          {/* Temel Bilgiler */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Başlık *</Label>
              <Input 
                value={data.title}
                onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Evden Eve Nakliyat Fiyatları"
              />
            </div>
            <div className="space-y-2">
              <Label>Slug *</Label>
              <Input 
                value={data.slug}
                onChange={(e) => setData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="evden-eve-nakliyat-fiyatlari"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Açıklama</Label>
            <Textarea 
              value={data.description}
              onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Sayfa açıklaması..."
              rows={3}
            />
          </div>

          {/* Fiyatlar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Fiyatlar</Label>
              <Button onClick={addPrice} size="sm">
                <Plus className="mr-2 h-4 w-4" /> Fiyat Ekle
              </Button>
            </div>

            {data.prices.map((price, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Fiyat #{index + 1}
                  </span>
                  {data.prices.length > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removePrice(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Başlık</Label>
                    <Input 
                      value={price.title}
                      onChange={(e) => updatePrice(index, 'title', e.target.value)}
                      placeholder="1+1 Daire"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Fiyat</Label>
                    <Input 
                      value={price.price}
                      onChange={(e) => updatePrice(index, 'price', e.target.value)}
                      placeholder="5.000 - 8.000 ₺"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Açıklama (Opsiyonel)</Label>
                    <Input 
                      value={price.description || ""}
                      onChange={(e) => updatePrice(index, 'description', e.target.value)}
                      placeholder="Ek bilgi..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SEO */}
          <div className="space-y-4 border-t pt-6">
            <Label className="text-lg font-semibold">SEO Ayarları</Label>
            <div className="space-y-2">
              <Label>SEO Başlık</Label>
              <Input 
                value={data.seoTitle || ""}
                onChange={(e) => setData(prev => ({ ...prev, seoTitle: e.target.value }))}
                placeholder="Evden Eve Nakliyat Fiyatları 2026 | Kozcuoğlu"
              />
            </div>
            <div className="space-y-2">
              <Label>SEO Açıklama</Label>
              <Textarea 
                value={data.seoDescription || ""}
                onChange={(e) => setData(prev => ({ ...prev, seoDescription: e.target.value }))}
                placeholder="Meta description..."
                rows={2}
              />
            </div>
          </div>

          {/* Durum */}
          <div className="flex items-center justify-between border-t pt-6">
            <div>
              <Label>Aktif</Label>
              <p className="text-sm text-muted-foreground">Sayfayı yayınla</p>
            </div>
            <Switch 
              checked={data.isActive}
              onCheckedChange={(checked) => setData(prev => ({ ...prev, isActive: checked }))}
            />
          </div>

          {/* Kaydet */}
          <div className="flex justify-end gap-3 border-t pt-6">
            <Button variant="outline" onClick={() => router.push("/admin/pricing-pages")}>
              İptal
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Kaydet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
