"use client";

import { useState, useEffect } from "react";
import { Calculator, MapPin, Home, Phone, MessageCircle } from "lucide-react";

interface HomeSize {
  id: string;
  label: string;
  basePrice: number;
  order: number;
  isActive: boolean;
}

interface PricingConfig {
  homeSizes: HomeSize[];
  districts: string[];
  extraCharges: {
    differentDistrict: number;
    weekendMultiplier: number;
  };
}

export default function HeroPriceCalculator() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [homeSize, setHomeSize] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [config, setConfig] = useState<PricingConfig | null>(null);

  useEffect(() => {
    fetch("/api/pricing-config")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setConfig(json.data);
      });
  }, []);

  function calculatePrice() {
    if (!from || !to || !homeSize || !config) return;

    const sizeData = config.homeSizes.find((h) => h.id === homeSize);
    if (!sizeData) return;

    let basePrice = sizeData.basePrice;
    
    if (from !== to) {
      basePrice += config.extraCharges.differentDistrict;
    }

    setPrice(Math.round(basePrice));
  }

  if (!config) return null;

  return (
    <div className="w-full rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e3000f]">
          <Calculator className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="font-bold text-white">Hızlı Fiyat Hesapla</div>
          <p className="text-xs text-white/70">Anında tahmini fiyat</p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Nereden - Nereye (Yan Yana) */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/90">
              <MapPin className="mb-0.5 inline h-3.5 w-3.5" /> Nereden
            </label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              aria-label="Nereden - Başlangıç ilçesi seçin"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-3.5 text-sm text-white backdrop-blur-sm focus:border-[#e3000f] focus:outline-none focus:ring-1 focus:ring-[#e3000f]"
            >
              <option value="" className="bg-[#122032] text-white">İlçe seçin</option>
              {config.districts.map((d) => (
                <option key={d} value={d} className="bg-[#122032] text-white">{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-white/90">
              <MapPin className="mb-0.5 inline h-3.5 w-3.5" /> Nereye
            </label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              aria-label="Nereye - Varış ilçesi seçin"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-3.5 text-sm text-white backdrop-blur-sm focus:border-[#e3000f] focus:outline-none focus:ring-1 focus:ring-[#e3000f]"
            >
              <option value="" className="bg-[#122032] text-white">İlçe seçin</option>
              {config.districts.map((d) => (
                <option key={d} value={d} className="bg-[#122032] text-white">{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Oda Sayısı */}
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/90">
            <Home className="mb-0.5 inline h-3.5 w-3.5" /> Oda Sayısı
          </label>
          <select
            value={homeSize}
            onChange={(e) => setHomeSize(e.target.value)}
            aria-label="Ev tipi - Oda sayısı seçin"
            className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-3.5 text-sm text-white backdrop-blur-sm focus:border-[#e3000f] focus:outline-none focus:ring-1 focus:ring-[#e3000f]"
          >
            <option value="" className="bg-[#122032] text-white">Seçin</option>
            {config.homeSizes.filter(h => h.isActive).sort((a, b) => a.order - b.order).map((h) => (
              <option key={h.id} value={h.id} className="bg-[#122032] text-white">{h.label}</option>
            ))}
          </select>
        </div>

        {/* Hesapla Butonu */}
        <button
          onClick={calculatePrice}
          disabled={!from || !to || !homeSize}
          className="w-full rounded-lg bg-[#e3000f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c5000d] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Calculator className="mr-1.5 inline h-4 w-4" />
          Fiyat Hesapla
        </button>

        {/* Sonuç */}
        {price !== null && (
          <div className="animate-in fade-in slide-in-from-top-2 rounded-lg border border-[#e3000f]/30 bg-[#e3000f]/20 p-4">
            <p className="text-xs text-white/80">Tahmini Fiyat</p>
            <p className="mt-1 text-2xl font-bold text-white">
              ₺{price.toLocaleString('tr-TR')}
            </p>
            <p className="mt-2 text-xs text-white/70">
              * Kesin fiyat için ücretsiz keşif yapılır
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href="https://wa.me/905321384979?text=Merhaba"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
              <a
                href="tel:4447436"
                className="flex items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#e3000f] transition hover:bg-white/90"
              >
                <Phone className="h-3.5 w-3.5" /> Ara
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
