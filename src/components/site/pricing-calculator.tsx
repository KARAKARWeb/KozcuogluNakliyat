"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Calculator, Phone, MessageCircle, ArrowRight, ArrowLeft, Home, MapPin,
  Package, CheckCircle, User, Camera, X, Download, Share2, FileText, Check, Code, Copy,
} from "lucide-react";
import { getIller, getIlceler } from "@/lib/turkey-locations";

const STORAGE_KEY = "kozcuoglu-fiyat-form";

const STEPS = [
  { id: 1, label: "Hizmet", icon: Package },
  { id: 2, label: "Adresler", icon: MapPin },
  { id: 3, label: "Detaylar", icon: Home },
  { id: 4, label: "Fotoğraf", icon: Camera },
  { id: 5, label: "İletişim", icon: User },
  { id: 6, label: "Sonuç", icon: CheckCircle },
];

const HIZMET_TIPLERI = [
  { value: "evden-eve", label: "Evden Eve Nakliyat", icon: "🏠" },
  { value: "ofis", label: "Ofis Taşıma", icon: "🏢" },
  { value: "villa", label: "Villa Taşıma", icon: "🏡" },
  { value: "parca", label: "Parça Eşya Taşıma", icon: "📦" },
  { value: "depolama", label: "Eşya Depolama", icon: "🏪" },
  { value: "sehirlerarasi", label: "Şehirler Arası Nakliyat", icon: "🚛" },
];

const EV_TIPLERI = [
  { value: "1+0", label: "Stüdyo (1+0)", rooms: ["Oda", "Mutfak", "Banyo"] },
  { value: "1+1", label: "1+1", rooms: ["Salon", "Yatak Odası", "Mutfak", "Banyo"] },
  { value: "2+1", label: "2+1", rooms: ["Salon", "Yatak Odası 1", "Yatak Odası 2", "Mutfak", "Banyo"] },
  { value: "3+1", label: "3+1", rooms: ["Salon", "Yatak Odası 1", "Yatak Odası 2", "Yatak Odası 3", "Mutfak", "Banyo"] },
  { value: "4+1", label: "4+1", rooms: ["Salon", "Yatak Odası 1", "Yatak Odası 2", "Yatak Odası 3", "Yatak Odası 4", "Mutfak", "Banyo"] },
  { value: "5+1", label: "5+1 ve üzeri", rooms: ["Salon", "Yatak Odası 1", "Yatak Odası 2", "Yatak Odası 3", "Yatak Odası 4", "Yatak Odası 5", "Mutfak", "Banyo"] },
  { value: "villa", label: "Villa / Müstakil", rooms: ["Salon", "Yatak Odası 1", "Yatak Odası 2", "Yatak Odası 3", "Mutfak", "Banyo", "Bahçe", "Garaj"] },
];

const DEPO_ESYA_TIPLERI = [
  "1+0 Ev Eşyası", "1+1 Ev Eşyası", "2+1 Ev Eşyası", "3+1 Ev Eşyası",
  "4+1 Ev Eşyası", "Ofis Eşyası", "Villa Eşyası", "Sanat Eseri",
  "Antika Eşya", "Arşiv", "Koli", "Diğer",
];

const DEPO_SURELERI = ["1 Ay", "3 Ay", "6 Ay", "1 Yıl", "1 Yıl+"];

interface FormState {
  hizmetTipi: string;
  cikisIl: string;
  cikisIlce: string;
  cikisAdres: string;
  varisIl: string;
  varisIlce: string;
  varisAdres: string;
  evTipi: string;
  cikisKat: string;
  varisKat: string;
  cikisAsansor: string;
  varisAsansor: string;
  asansorIhtiyac: string;
  esyaListesi: string;
  ozelNotlar: string;
  ad: string;
  telefon: string;
  email: string;
  tercihTarih: string;
  depoYaka: string;
  depoEsyaTipi: string;
  depoSure: string;
  depoAmbalaj: string;
  depoNakliye: string;
}

const INITIAL_FORM: FormState = {
  hizmetTipi: "", cikisIl: "", cikisIlce: "", cikisAdres: "",
  varisIl: "", varisIlce: "", varisAdres: "", evTipi: "",
  cikisKat: "", varisKat: "", cikisAsansor: "Var", varisAsansor: "Var",
  asansorIhtiyac: "Hayır", esyaListesi: "", ozelNotlar: "",
  ad: "", telefon: "", email: "", tercihTarih: "",
  depoYaka: "", depoEsyaTipi: "", depoSure: "", depoAmbalaj: "", depoNakliye: "",
};

interface PricingCalculatorProps {
  isEmbed?: boolean;
}

export default function PricingCalculator({ isEmbed = false }: PricingCalculatorProps = {}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [result, setResult] = useState<{ min: number; max: number } | null>(null);
  const [roomPhotos, setRoomPhotos] = useState<Record<string, string[]>>({});
  const [kesifPopup, setKesifPopup] = useState(false);
  const [aramaForm, setAramaForm] = useState({ ad: "", telefon: "" });
  const [aramaSent, setAramaSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeRoom, setActiveRoom] = useState("");
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [embedPopup, setEmbedPopup] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);
  const [pricingConfig, setPricingConfig] = useState<any>(null);

  const iller = getIller();
  const isDepolama = form.hizmetTipi === "depolama";

  useEffect(() => {
    fetch("/api/advanced-pricing-config")
      .then(res => res.json())
      .then(json => {
        if (json.success) setPricingConfig(json.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.form) setForm(parsed.form);
        if (parsed.step) setStep(parsed.step);
        if (parsed.roomPhotos) setRoomPhotos(parsed.roomPhotos);
        if (parsed.result) setResult(parsed.result);
      }
    } catch {}
  }, []);

  const saveToStorage = useCallback((f: FormState, s: number, rp: Record<string, string[]>, r: { min: number; max: number } | null) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ form: f, step: s, roomPhotos: rp, result: r }));
    } catch {}
  }, []);

  function updateForm(patch: Partial<FormState>) {
    const next = { ...form, ...patch };
    setForm(next);
    saveToStorage(next, step, roomPhotos, result);
  }

  function goStep(s: number) {
    setStep(s);
    saveToStorage(form, s, roomPhotos, result);
  }

  async function hesapla() {
    if (!pricingConfig) {
      console.log("⚠️ Pricing config yüklenmedi, varsayılan fiyat kullanılıyor");
      const min = 5000;
      const max = 7500;
      setResult({ min, max });
      setStep(6);
      saveToStorage(form, 6, roomPhotos, { min, max });
      return;
    }

    const config = pricingConfig;
    let totalPrice = 0;
    console.log("🎯 Fiyat Hesaplama Başladı");
    console.log("📋 Config:", config);

    // 1. Oda Sayısı Temel Fiyatı
    const roomKey = form.evTipi === "1+0" ? "1-0" : form.evTipi;
    const roomPrice = config.roomPricing?.[roomKey];
    if (roomPrice) {
      const roomCharge = roomPrice.type === 'fixed' ? roomPrice.value : 0;
      totalPrice += roomCharge;
      console.log(`1️⃣ Oda Sayısı (${roomKey}): +${roomCharge} ₺ → Toplam: ${totalPrice} ₺`);
    }

    // 2. Hizmet Tipi Toleransı
    const serviceMap: Record<string, string> = {
      "evden-eve": "ev",
      "ofis": "ofis",
      "villa": "villa",
      "parca": "parcaEsya",
      "depolama": "esyaDepolama",
      "sehirlerarasi": "sehirlerArasi",
    };
    const serviceTolerance = config.serviceTolerance?.[serviceMap[form.hizmetTipi]];
    if (serviceTolerance) {
      let serviceCharge = 0;
      if (serviceTolerance.type === 'percentage') {
        serviceCharge = totalPrice * (serviceTolerance.value / 100);
      } else {
        serviceCharge = serviceTolerance.value;
      }
      totalPrice += serviceCharge;
      console.log(`2️⃣ Hizmet Tipi (${form.hizmetTipi}): +${serviceCharge} ₺ (${serviceTolerance.type}: ${serviceTolerance.value}) → Toplam: ${totalPrice} ₺`);
    }

    // 3. KM Hesaplama (şehirler arası ise)
    if (form.cikisIl && form.varisIl && form.cikisIl !== form.varisIl) {
      console.log(`3️⃣ KM Hesaplama: ${form.cikisIl} → ${form.varisIl}`);
      try {
        const distRes = await fetch("/api/calculate-distance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from: form.cikisIl, to: form.varisIl }),
        });
        const distJson = await distRes.json();
        console.log("   API Response:", distJson);
        if (distJson.success && distJson.data.distance) {
          const kmPrice = config.pricePerKm || 15;
          const kmCharge = distJson.data.distance * kmPrice;
          totalPrice += kmCharge;
          console.log(`   Mesafe: ${distJson.data.distance} km × ${kmPrice} ₺/km = +${kmCharge} ₺ → Toplam: ${totalPrice} ₺`);
        } else {
          console.log("   ⚠️ Mesafe hesaplanamadı");
        }
      } catch (err) {
        console.error("   ❌ KM API Hatası:", err);
      }
    } else {
      console.log("3️⃣ KM Hesaplama: Atlandı (aynı il veya eksik bilgi)");
    }

    // 4. Çıkış Katı Fiyatlandırması
    const cikisKat = parseInt(form.cikisKat) || 0;
    if (cikisKat > 0) {
      const floorConfig = config.floorPricing?.departure;
      if (floorConfig) {
        // Kat başı ücret
        const perFloor = floorConfig.perFloor;
        if (perFloor) {
          const floorCharge = perFloor.type === 'fixed' 
            ? perFloor.value * cikisKat 
            : totalPrice * (perFloor.value / 100);
          totalPrice += floorCharge;
          console.log(`4️⃣ Çıkış Kat (${cikisKat}. kat): +${floorCharge} ₺ → Toplam: ${totalPrice} ₺`);
        }
        
        // Asansör durumu
        const elevatorConfig = form.cikisAsansor === "Var" 
          ? floorConfig.withElevator 
          : floorConfig.withoutElevator;
        if (elevatorConfig) {
          const elevatorCharge = elevatorConfig.type === 'percentage'
            ? totalPrice * (elevatorConfig.value / 100)
            : elevatorConfig.value;
          totalPrice += elevatorCharge;
          console.log(`   Çıkış Asansör (${form.cikisAsansor}): +${elevatorCharge} ₺ → Toplam: ${totalPrice} ₺`);
        }
      }
    }

    // 5. Varış Katı Fiyatlandırması
    const varisKat = parseInt(form.varisKat) || 0;
    if (varisKat > 0) {
      const floorConfig = config.floorPricing?.arrival;
      if (floorConfig) {
        // Kat başı ücret
        const perFloor = floorConfig.perFloor;
        if (perFloor) {
          const floorCharge = perFloor.type === 'fixed' 
            ? perFloor.value * varisKat 
            : totalPrice * (perFloor.value / 100);
          totalPrice += floorCharge;
        }
        
        // Asansör durumu
        const elevatorConfig = form.varisAsansor === "Var" 
          ? floorConfig.withElevator 
          : floorConfig.withoutElevator;
        if (elevatorConfig) {
          const elevatorCharge = elevatorConfig.type === 'percentage'
            ? totalPrice * (elevatorConfig.value / 100)
            : elevatorConfig.value;
          totalPrice += elevatorCharge;
        }
      }
    }

    // 6. Ekstra Asansörlü Taşıma
    if (form.asansorIhtiyac === "Evet") {
      const extraElevator = config.extraElevatorService;
      if (extraElevator) {
        const extraCharge = extraElevator.type === 'percentage'
          ? totalPrice * (extraElevator.value / 100)
          : extraElevator.value;
        totalPrice += extraCharge;
      }
    }

    const min = Math.round(totalPrice);
    const max = Math.round(totalPrice * 1.5);
    const r = { min, max };
    console.log(`\n💰 FİNAL SONUÇ:`);
    console.log(`   Toplam: ${totalPrice} ₺`);
    console.log(`   Min: ${min} ₺`);
    console.log(`   Max: ${max} ₺`);
    setResult(r);
    setStep(6);
    saveToStorage(form, 6, roomPhotos, r);
  }

  function canNext() {
    if (step === 1) return !!form.hizmetTipi;
    if (step === 2) {
      if (isDepolama) return !!form.cikisIl && !!form.depoYaka;
      return !!form.cikisIl && !!form.varisIl;
    }
    if (step === 3) {
      if (isDepolama) return !!form.depoEsyaTipi && !!form.depoSure;
      return !!form.evTipi;
    }
    if (step === 4) return true;
    if (step === 5) {
      const adParts = form.ad.trim().split(/\s+/);
      const adValid = adParts.length >= 2 && adParts.every((p) => p.length >= 2);
      const telDigits = form.telefon.replace(/\D/g, "");
      const telValid = telDigits.length >= 10 && telDigits.length <= 12;
      return adValid && telValid;
    }
    return true;
  }

  function getSummaryText() {
    const hizmet = HIZMET_TIPLERI.find((h) => h.value === form.hizmetTipi)?.label || "";
    const evTip = EV_TIPLERI.find((e) => e.value === form.evTipi)?.label || "";
    const lines = [
      `🚛 Kozcuoğlu Nakliyat - Fiyat Teklifi`,
      ``,
      `📋 Hizmet: ${hizmet}`,
    ];
    if (isDepolama) {
      lines.push(`📦 Eşya Tipi: ${form.depoEsyaTipi}`);
      lines.push(`📍 Alınacak Adres: ${form.cikisIl}${form.cikisIlce ? "/" + form.cikisIlce : ""} ${form.cikisAdres ? "- " + form.cikisAdres : ""}`);
      lines.push(`🏢 Kat: ${form.cikisKat || "-"} | Asansör: ${form.cikisAsansor}`);
      lines.push(`📍 Depo: ${form.depoYaka}`);
      lines.push(`⏱️ Süre: ${form.depoSure}`);
      if (form.depoAmbalaj) lines.push(`📦 Ambalaj: ${form.depoAmbalaj}`);
      if (form.depoNakliye) lines.push(`🚛 Nakliye: ${form.depoNakliye}`);
    } else {
      lines.push(`🏠 Ev Tipi: ${evTip}`);
      lines.push(`📍 Çıkış: ${form.cikisIl}${form.cikisIlce ? "/" + form.cikisIlce : ""} ${form.cikisAdres ? "- " + form.cikisAdres : ""}`);
      lines.push(`📍 Varış: ${form.varisIl}${form.varisIlce ? "/" + form.varisIlce : ""} ${form.varisAdres ? "- " + form.varisAdres : ""}`);
      lines.push(`🏢 Çıkış Kat: ${form.cikisKat || "-"} | Asansör: ${form.cikisAsansor}`);
      lines.push(`🏢 Varış Kat: ${form.varisKat || "-"} | Asansör: ${form.varisAsansor}`);
      if (form.asansorIhtiyac === "Evet") lines.push(`🔧 Asansörlü taşıma isteniyor`);
      if (form.esyaListesi) lines.push(`📦 Özel Eşyalar: ${form.esyaListesi}`);
    }
    if (form.ozelNotlar) lines.push(`📝 Notlar: ${form.ozelNotlar}`);
    if (form.tercihTarih) lines.push(`📅 Tercih Tarihi: ${form.tercihTarih}`);
    lines.push(``, `👤 ${form.ad}`, `📞 ${form.telefon}`);
    if (form.email) lines.push(`✉️ ${form.email}`);
    if (result) lines.push(``, `💰 Tahmini: ${result.min.toLocaleString("tr-TR")} ₺ — ${result.max.toLocaleString("tr-TR")} ₺`);
    return lines.join("\n");
  }

  async function uploadPhotosToServer(): Promise<string[]> {
    const allPhotos = Object.values(roomPhotos).flat();
    if (allPhotos.length === 0) return [];

    const formData = new FormData();
    for (const dataUrl of allPhotos) {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      formData.append("photos", blob, `photo-${Date.now()}.jpg`);
    }

    try {
      const uploadRes = await fetch("/api/media/upload-photos", { method: "POST", body: formData });
      const json = await uploadRes.json();
      if (json.success) return json.urls as string[];
    } catch {}
    return [];
  }

  async function shareWhatsApp() {
    setUploadingPhotos(true);
    let photoLinks = "";
    try {
      const urls = await uploadPhotosToServer();
      if (urls.length > 0) {
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        photoLinks = "\n\n📸 Eşya Görüntüleri:\n" + urls.map((u) => origin + u).join("\n");
      }
    } catch {}
    setUploadingPhotos(false);
    const text = encodeURIComponent(getSummaryText() + photoLinks);
    window.open(`https://wa.me/905321384979?text=${text}`, "_blank");
  }

  function downloadPDF() {
    const content = getSummaryText();
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kozcuoglu-nakliyat-teklif-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function shareNative() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Kozcuoğlu Nakliyat Teklif", text: getSummaryText() });
      } catch {}
    }
  }

  function handlePhotoUpload(room: string, files: FileList | null) {
    if (!files) return;
    const newPhotos = { ...roomPhotos };
    if (!newPhotos[room]) newPhotos[room] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newPhotos[room] = [...(newPhotos[room] || []), reader.result as string];
        setRoomPhotos({ ...newPhotos });
        saveToStorage(form, step, newPhotos, result);
      };
      reader.readAsDataURL(file);
    });
  }

  function removePhoto(room: string, idx: number) {
    const newPhotos = { ...roomPhotos };
    newPhotos[room] = newPhotos[room].filter((_, i) => i !== idx);
    setRoomPhotos(newPhotos);
    saveToStorage(form, step, newPhotos, result);
  }

  const currentEvTipi = EV_TIPLERI.find((e) => e.value === form.evTipi);
  const rooms = currentEvTipi?.rooms || [];

  function resetForm() {
    setForm(INITIAL_FORM);
    setStep(1);
    setResult(null);
    setRoomPhotos({});
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <>
      <div className="rounded-2xl border bg-white shadow-sm">
        {/* Step Indicator */}
        <div className="border-b px-3 py-4 md:px-8">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <button
                  type="button"
                  onClick={() => s.id < step && goStep(s.id)}
                  className={`flex items-center gap-1.5 ${step >= s.id ? "text-[#e3000f]" : "text-gray-300"} ${s.id < step ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                    step > s.id ? "bg-[#e3000f] text-white" : step === s.id ? "border-2 border-[#e3000f] text-[#e3000f]" : "border-2 border-gray-200 text-gray-400"
                  }`}>
                    {step > s.id ? <CheckCircle className="h-4 w-4" /> : s.id}
                  </div>
                  <span className="hidden text-xs font-medium sm:inline">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`mx-1 h-px w-4 sm:mx-2 sm:w-8 ${step > s.id ? "bg-[#e3000f]" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 md:p-8">
          {/* Step 1: Hizmet Tipi */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-[#122032]">Hangi hizmeti arıyorsunuz?</h3>
                <p className="mt-1 text-sm text-muted-foreground">Taşıma tipinizi seçin</p>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {HIZMET_TIPLERI.map((h) => (
                  <button
                    key={h.value}
                    type="button"
                    onClick={() => updateForm({ hizmetTipi: h.value })}
                    className={`group relative rounded-xl border-2 p-5 text-left transition-all ${
                      form.hizmetTipi === h.value
                        ? "border-[#e3000f] bg-gradient-to-br from-[#fef2f2] to-white shadow-lg ring-2 ring-[#e3000f]/20"
                        : "border-gray-100 bg-gray-50/50 hover:border-[#e3000f]/30 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <span className="mb-2 block text-2xl">{h.icon}</span>
                    <span className={`block text-sm font-bold ${form.hizmetTipi === h.value ? "text-[#e3000f]" : "text-[#122032]"}`}>{h.label}</span>
                    {form.hizmetTipi === h.value && (
                      <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#e3000f] shadow-sm">
                        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Adresler */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#122032]">
                  {isDepolama ? "Eşya Alınacak Adres & Depo Bilgisi" : "Adres Bilgileri"}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isDepolama ? "Eşyanızın alınacağı adres ve depo tercihini belirtin" : "Çıkış ve varış adreslerini belirtin"}
                </p>
              </div>
              <div className={`grid gap-6 ${isDepolama ? "" : "md:grid-cols-2"}`}>
                <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/80 p-5">
                  <p className="flex items-center gap-2 text-sm font-bold text-[#e3000f]"><MapPin className="h-4 w-4" /> {isDepolama ? "Eşya Alınacak Adres" : "Çıkış Adresi"}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>İl *</Label>
                      <Select value={form.cikisIl} onValueChange={(v) => updateForm({ cikisIl: v, cikisIlce: "" })}>
                        <SelectTrigger className="border border-gray-200 bg-white"><SelectValue placeholder="İl seçin" /></SelectTrigger>
                        <SelectContent className="max-h-60">
                          {iller.map((il) => <SelectItem key={il} value={il}>{il}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    {form.cikisIl && (
                      <div className="space-y-2">
                        <Label>İlçe</Label>
                        <Select value={form.cikisIlce} onValueChange={(v) => updateForm({ cikisIlce: v })}>
                          <SelectTrigger className="border border-gray-200 bg-white"><SelectValue placeholder="İlçe seçin" /></SelectTrigger>
                          <SelectContent className="max-h-60">
                            {getIlceler(form.cikisIl).map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Açık Adres (opsiyonel)</Label>
                    <Input value={form.cikisAdres} onChange={(e) => updateForm({ cikisAdres: e.target.value })} placeholder="Mahalle, sokak, bina no..." className="bg-white" />
                  </div>
                </div>
                {isDepolama ? (
                  <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/80 p-5">
                    <p className="flex items-center gap-2 text-sm font-bold text-[#122032]"><Package className="h-4 w-4" /> Gidilecek Depo</p>
                    <div className="space-y-2">
                      <Label>Depo Tercihi *</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Anadolu Yakası Depo", "Avrupa Yakası Depo"].map((v) => (
                          <button key={v} type="button" onClick={() => updateForm({ depoYaka: v })}
                            className={`rounded-xl border px-4 py-3 text-center text-sm font-medium transition-all ${form.depoYaka === v ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f] shadow-sm" : "border-gray-200 bg-white text-[#122032] hover:border-gray-300"}`}>
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/80 p-5">
                    <p className="flex items-center gap-2 text-sm font-bold text-[#25D366]"><MapPin className="h-4 w-4" /> Varış Adresi</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>İl *</Label>
                        <Select value={form.varisIl} onValueChange={(v) => updateForm({ varisIl: v, varisIlce: "" })}>
                          <SelectTrigger className="border border-gray-200 bg-white"><SelectValue placeholder="İl seçin" /></SelectTrigger>
                          <SelectContent className="max-h-60">
                            {iller.map((il) => <SelectItem key={il} value={il}>{il}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      {form.varisIl && (
                        <div className="space-y-2">
                          <Label>İlçe</Label>
                          <Select value={form.varisIlce} onValueChange={(v) => updateForm({ varisIlce: v })}>
                            <SelectTrigger className="border border-gray-200 bg-white"><SelectValue placeholder="İlçe seçin" /></SelectTrigger>
                            <SelectContent className="max-h-60">
                              {getIlceler(form.varisIl).map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Açık Adres (opsiyonel)</Label>
                      <Input value={form.varisAdres} onChange={(e) => updateForm({ varisAdres: e.target.value })} placeholder="Mahalle, sokak, bina no..." className="bg-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Detaylar */}
          {step === 3 && (
            <div className="space-y-6">
              {isDepolama ? (
                <>
                  <div>
                    <h3 className="text-lg font-bold text-[#122032]">Depolama Detayları</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Depolanacak eşya ve süre bilgilerini girin</p>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Depolanacak Eşya Tipi *</Label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {DEPO_ESYA_TIPLERI.map((t) => (
                        <button key={t} type="button" onClick={() => updateForm({ depoEsyaTipi: t, evTipi: t.includes("Ev") ? t.split(" ")[0] : "2+1" })}
                          className={`rounded-xl border px-3 py-3 text-center text-sm font-medium transition-all ${
                            form.depoEsyaTipi === t
                              ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f] shadow-sm"
                              : "border-gray-100 bg-gray-50/50 text-[#122032] hover:border-gray-300 hover:bg-white"
                          }`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50/80 p-4">
                      <Label className="text-sm font-semibold">Kaçıncı Kattan Alınacak?</Label>
                      <Input type="number" min="0" max="30" value={form.cikisKat} onChange={(e) => updateForm({ cikisKat: e.target.value })} placeholder="Örn: 3" className="bg-white" />
                      <Label className="text-sm font-semibold">Asansör Kurulacak Mı?</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Evet", "Hayır", "Bilemiyorum"].map((v) => (
                          <button key={v} type="button" onClick={() => updateForm({ cikisAsansor: v })}
                            className={`rounded-lg border px-3 py-2 text-center text-sm font-medium transition-all ${form.cikisAsansor === v ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-200 bg-white text-[#122032] hover:border-gray-300"}`}>
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50/80 p-4">
                      <Label className="text-sm font-semibold">Depolama Süresi *</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {DEPO_SURELERI.map((s) => (
                          <button key={s} type="button" onClick={() => updateForm({ depoSure: s })}
                            className={`rounded-lg border px-3 py-2 text-center text-sm font-medium transition-all ${form.depoSure === s ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-200 bg-white text-[#122032] hover:border-gray-300"}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Sıfır Ambalaj Paketleme</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["İstiyorum", "İstemiyorum"].map((v) => (
                          <button key={v} type="button" onClick={() => updateForm({ depoAmbalaj: v })}
                            className={`rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-all ${form.depoAmbalaj === v ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-200 bg-white text-[#122032] hover:border-gray-300"}`}>
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Nakliye İstiyor Musunuz?</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Evet", "Hayır"].map((v) => (
                          <button key={v} type="button" onClick={() => updateForm({ depoNakliye: v })}
                            className={`rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-all ${form.depoNakliye === v ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-200 bg-white text-[#122032] hover:border-gray-300"}`}>
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Notlarınız (opsiyonel)</Label>
                    <Textarea value={form.ozelNotlar} onChange={(e) => updateForm({ ozelNotlar: e.target.value })} rows={3} placeholder="Ek bilgi veya özel talepleriniz..." className="bg-white" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-lg font-bold text-[#122032]">Taşıma Detayları</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Ev tipi ve kat bilgilerini girin</p>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Ev Tipi *</Label>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {EV_TIPLERI.map((e) => (
                        <button
                          key={e.value}
                          type="button"
                          onClick={() => updateForm({ evTipi: e.value })}
                          className={`relative rounded-xl border px-3 py-3.5 text-center text-sm font-semibold transition-all ${
                            form.evTipi === e.value
                              ? "border-[#e3000f] bg-gradient-to-br from-[#fef2f2] to-white text-[#e3000f] shadow-md"
                              : "border-gray-100 bg-gray-50/50 text-[#122032] hover:border-gray-300 hover:bg-white hover:shadow-sm"
                          }`}
                        >
                          {e.label}
                          {form.evTipi === e.value && (
                            <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#e3000f]">
                              <Check className="h-3 w-3 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50/80 p-4">
                      <p className="text-sm font-bold text-[#122032]">Çıkış Binası</p>
                      <div className="space-y-2">
                        <Label>Kat</Label>
                        <Input type="number" min="0" max="30" value={form.cikisKat} onChange={(e) => updateForm({ cikisKat: e.target.value })} placeholder="Örn: 5" className="bg-white" />
                      </div>
                      <div className="space-y-2">
                        <Label>Asansör</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Var", "Yok"].map((v) => (
                            <button key={v} type="button" onClick={() => updateForm({ cikisAsansor: v })}
                              className={`rounded-lg border py-2 text-center text-sm font-medium transition-all ${form.cikisAsansor === v ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-200 bg-white text-[#122032] hover:border-gray-300"}`}>
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50/80 p-4">
                      <p className="text-sm font-bold text-[#122032]">Varış Binası</p>
                      <div className="space-y-2">
                        <Label>Kat</Label>
                        <Input type="number" min="0" max="30" value={form.varisKat} onChange={(e) => updateForm({ varisKat: e.target.value })} placeholder="Örn: 3" className="bg-white" />
                      </div>
                      <div className="space-y-2">
                        <Label>Asansör</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {["Var", "Yok"].map((v) => (
                            <button key={v} type="button" onClick={() => updateForm({ varisAsansor: v })}
                              className={`rounded-lg border py-2 text-center text-sm font-medium transition-all ${form.varisAsansor === v ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-200 bg-white text-[#122032] hover:border-gray-300"}`}>
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Asansörlü Taşıma İstiyor musunuz?</Label>
                    <div className="grid grid-cols-2 gap-2 sm:w-1/2">
                      {["Evet", "Hayır"].map((v) => (
                        <button key={v} type="button" onClick={() => updateForm({ asansorIhtiyac: v })}
                          className={`rounded-lg border py-2.5 text-center text-sm font-medium transition-all ${form.asansorIhtiyac === v ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-200 bg-white text-[#122032] hover:border-gray-300"}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Özel Eşya Listesi (opsiyonel)</Label>
                    <Textarea value={form.esyaListesi} onChange={(e) => updateForm({ esyaListesi: e.target.value })} rows={3} placeholder="Piyano, antika dolap, çelik kasa vb." className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label>Notlarınız (opsiyonel)</Label>
                    <Input value={form.ozelNotlar} onChange={(e) => updateForm({ ozelNotlar: e.target.value })} placeholder="Ek bilgi veya özel talepleriniz..." className="bg-white" />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 4: Fotoğraf */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#122032]">Oda Fotoğrafları</h3>
                <p className="mt-1 text-sm text-muted-foreground">Daha doğru fiyat için odalarınızın fotoğraflarını yükleyin (opsiyonel)</p>
              </div>
              {rooms.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {rooms.map((room) => (
                    <div key={room} className="rounded-xl border-2 border-dashed border-gray-200 p-4 transition hover:border-[#e3000f]/40">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-semibold text-[#122032]">{room}</p>
                        <span className="text-xs text-muted-foreground">{roomPhotos[room]?.length || 0} fotoğraf</span>
                      </div>
                      {roomPhotos[room]?.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {roomPhotos[room].map((photo, idx) => (
                            <div key={idx} className="group relative h-16 w-16 overflow-hidden rounded-lg border">
                              <img src={photo} alt={`${room} ${idx + 1}`} className="h-full w-full object-cover" />
                              <button type="button" onClick={() => removePhoto(room, idx)}
                                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                                <X className="h-4 w-4 text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => { setActiveRoom(room); fileInputRef.current?.click(); }}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 py-3 text-sm text-muted-foreground transition hover:border-[#e3000f] hover:text-[#e3000f]"
                      >
                        <Camera className="h-4 w-4" /> Fotoğraf Ekle
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border-2 border-dashed p-8 text-center text-muted-foreground">
                  <Camera className="mx-auto mb-2 h-8 w-8" />
                  <p className="text-sm">Lütfen önce ev tipini seçin</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                capture="environment"
                className="hidden"
                onChange={(e) => { handlePhotoUpload(activeRoom, e.target.files); e.target.value = ""; }}
              />
            </div>
          )}

          {/* Step 5: İletişim */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#122032]">İletişim Bilgileri</h3>
                <p className="mt-1 text-sm text-muted-foreground">Size ulaşabilmemiz için bilgilerinizi girin</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Ad Soyad *</Label>
                  <Input value={form.ad} onChange={(e) => updateForm({ ad: e.target.value })} placeholder="Adınız Soyadınız" className={`border-2${form.ad && form.ad.trim().split(/\s+/).length < 2 ? " border-amber-400" : ""}`} />
                  {form.ad && form.ad.trim().split(/\s+/).length < 2 && (
                    <p className="text-[11px] text-amber-600">Ad ve soyadınızı yazın</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Telefon *</Label>
                  <Input type="tel" value={form.telefon} onChange={(e) => { const v = e.target.value.replace(/[^\d\s\-+()]/g, ""); updateForm({ telefon: v }); }} placeholder="05XX XXX XX XX" className={`border-2${form.telefon && form.telefon.replace(/\D/g, "").length < 10 ? " border-amber-400" : ""}`} />
                  {form.telefon && form.telefon.replace(/\D/g, "").length < 10 && (
                    <p className="text-[11px] text-amber-600">Geçerli bir telefon numarası girin</p>
                  )}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>E-posta (opsiyonel)</Label>
                  <Input type="email" value={form.email} onChange={(e) => updateForm({ email: e.target.value })} placeholder="ornek@email.com" className={`border-2${form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? " border-amber-400" : ""}`} />
                  {form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                    <p className="text-[11px] text-amber-600">Geçerli bir e-posta adresi girin</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Tercih Edilen Tarih (opsiyonel)</Label>
                  <Input type="date" value={form.tercihTarih} onChange={(e) => updateForm({ tercihTarih: e.target.value })} className="border-2" />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Sonuç */}
          {step === 6 && result && (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fef2f2]">
                <CheckCircle className="h-8 w-8 text-[#e3000f]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#122032]">Tahmini Fiyat Aralığı</h3>
                <p className="mt-4 text-4xl font-bold text-[#e3000f]">
                  {result.min.toLocaleString("tr-TR")} ₺ — {result.max.toLocaleString("tr-TR")} ₺
                </p>
                <p className="mt-2 text-xs text-muted-foreground">* Bu tahmini bir fiyattır. Kesin fiyat için ücretsiz keşif talep edin.</p>
              </div>

              <div className="mx-auto max-w-lg rounded-2xl border border-gray-100 bg-gray-50/80 p-5 text-left text-sm shadow-sm">
                <p className="mb-3 font-bold text-[#122032]">Teklif Özeti</p>
                <div className="space-y-1.5 text-muted-foreground">
                  <p><span className="font-medium text-[#122032]">Hizmet:</span> {HIZMET_TIPLERI.find((h) => h.value === form.hizmetTipi)?.label}</p>
                  {isDepolama ? (
                    <>
                      <p><span className="font-medium text-[#122032]">Eşya Tipi:</span> {form.depoEsyaTipi}</p>
                      <p><span className="font-medium text-[#122032]">Alınacak:</span> {form.cikisIl}{form.cikisIlce ? `/${form.cikisIlce}` : ""}, Kat {form.cikisKat || "-"}</p>
                      <p><span className="font-medium text-[#122032]">Depo:</span> {form.depoYaka}</p>
                      <p><span className="font-medium text-[#122032]">Süre:</span> {form.depoSure}</p>
                      {form.depoAmbalaj && <p><span className="font-medium text-[#122032]">Ambalaj:</span> {form.depoAmbalaj}</p>}
                      {form.depoNakliye && <p><span className="font-medium text-[#122032]">Nakliye:</span> {form.depoNakliye}</p>}
                    </>
                  ) : (
                    <>
                      <p><span className="font-medium text-[#122032]">Güzergah:</span> {form.cikisIl}{form.cikisIlce ? `/${form.cikisIlce}` : ""} → {form.varisIl}{form.varisIlce ? `/${form.varisIlce}` : ""}</p>
                      <p><span className="font-medium text-[#122032]">Ev Tipi:</span> {EV_TIPLERI.find((e) => e.value === form.evTipi)?.label}</p>
                      <p><span className="font-medium text-[#122032]">Çıkış:</span> Kat {form.cikisKat || "-"}, Asansör {form.cikisAsansor}</p>
                      <p><span className="font-medium text-[#122032]">Varış:</span> Kat {form.varisKat || "-"}, Asansör {form.varisAsansor}</p>
                      {form.asansorIhtiyac === "Evet" && <p><span className="font-medium text-[#122032]">Asansörlü taşıma:</span> Evet</p>}
                    </>
                  )}
                  <div className="my-2 border-t border-gray-200" />
                  <p><span className="font-medium text-[#122032]">Ad:</span> {form.ad}</p>
                  <p><span className="font-medium text-[#122032]">Telefon:</span> {form.telefon}</p>
                  {Object.keys(roomPhotos).filter((r) => roomPhotos[r]?.length > 0).length > 0 && (
                    <p><span className="font-medium text-[#122032]">Fotoğraf:</span> {Object.values(roomPhotos).flat().length} adet yüklendi</p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {!isEmbed && (
                  <>
                    <button onClick={shareWhatsApp} disabled={uploadingPhotos} className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#20bd5a] hover:shadow-lg disabled:opacity-70">
                      <MessageCircle className="h-4 w-4" /> {uploadingPhotos ? "Fotoğraflar yükleniyor..." : "WhatsApp ile Paylaş"}
                    </button>
                    <button onClick={() => setKesifPopup(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#e3000f] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#c5000d] hover:shadow-lg">
                      <Phone className="h-4 w-4" /> Keşif Talep Et
                    </button>
                  </>
                )}
                <button onClick={downloadPDF} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-[#122032] shadow-sm transition hover:bg-gray-50 hover:shadow-md">
                  <Download className="h-4 w-4" /> Teklifi İndir
                </button>
                {!isEmbed && typeof navigator !== "undefined" && typeof navigator.share === "function" && (
                  <button onClick={shareNative} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-[#122032] shadow-sm transition hover:bg-gray-50 hover:shadow-md">
                    <Share2 className="h-4 w-4" /> Paylaş
                  </button>
                )}
              </div>

              <Button variant="outline" onClick={resetForm} className="mx-auto rounded-xl">
                Yeni Hesaplama Yap
              </Button>
            </div>
          )}

          {/* Navigation */}
          {step < 6 && (
            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <Button variant="outline" onClick={() => goStep(step - 1)} disabled={step === 1} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Geri
              </Button>
              {step < 5 ? (
                <Button onClick={() => goStep(step + 1)} disabled={!canNext()} className="gap-2 bg-[#e3000f] hover:bg-[#c5000d]">
                  İleri <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={hesapla} disabled={!canNext()} className="gap-2 bg-[#e3000f] hover:bg-[#c5000d]">
                  <Calculator className="h-4 w-4" /> Fiyat Hesapla
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Web Sitene Ekle - Sadece normal sayfada göster */}
      {!isEmbed && (
        <div className="mt-8 rounded-xl border-2 border-dashed border-[#e3000f]/20 bg-gradient-to-r from-[#fef2f2] to-white p-4 text-center">
          <p className="mb-2 text-sm font-bold text-[#122032]">Bu formu kendi sitenize ekleyin!</p>
          <p className="mb-3 text-xs text-muted-foreground">Ziyaretçilerinize anında fiyat hesaplama imkanı sunun</p>
          <button onClick={() => setEmbedPopup(true)} className="inline-flex items-center gap-2 rounded-lg bg-[#e3000f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#c5000d]">
            <Code className="h-4 w-4" /> Ücretsiz Ekle
          </button>
        </div>
      )}

      {/* Embed Popup */}
      {embedPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setEmbedPopup(false)}>
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#122032]">Web Sitene Ekle</h3>
              <button onClick={() => setEmbedPopup(false)} className="rounded-lg p-1 text-muted-foreground hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">Nakliyat fiyat hesaplama formunu kendi web sitenize ekleyebilirsiniz. Aşağıdaki kodu formu eklemek istediğiniz yere yapıştırın:</p>

            <div className="mb-4">
              <div className="rounded-lg border bg-gray-50 p-3">
                <div className="relative">
                  <code className="block rounded bg-gray-100 p-2 pr-10 text-[11px] text-gray-800 break-all">
                    {`<div id="kozcuoglu-fiyat-hesaplama"></div>\n<script src="https://kozcuoglunakliyat.com.tr/embed/fiyat-hesaplama.js"></script>`}
                  </code>
                  <button onClick={() => {
                    navigator.clipboard.writeText(`<div id="kozcuoglu-fiyat-hesaplama"></div>\n<script src="https://kozcuoglunakliyat.com.tr/embed/fiyat-hesaplama.js"></script>`);
                    setEmbedCopied(true);
                    setTimeout(() => setEmbedCopied(false), 2000);
                  }} className="absolute right-1 top-1 rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600">
                    {embedCopied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
              <p className="text-xs text-green-800">Kodu yapıştırmanız yeterli. Form otomatik olarak sitenize entegre edilecektir.</p>
              <p className="mt-2 text-xs text-green-700">Formu sitenize eklediğinizde, sonuç sayfasındaki WhatsApp paylaş ve indirme butonları güvenlik nedeniyle otomatik olarak kaldırılacaktır. Güvenle kullanabilirsiniz.</p>
            </div>
          </div>
        </div>
      )}

      {/* Keşif Talep Popup */}
      {kesifPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setKesifPopup(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#122032]">Keşif Talep Et</h3>
              <button onClick={() => setKesifPopup(false)} className="rounded-lg p-1 text-muted-foreground hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>

            <div className="mb-6 flex gap-2">
              <a href="tel:4447436" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#122032] py-3 text-sm font-bold text-white transition hover:bg-[#1a2d45]">
                <Phone className="h-4 w-4" /> 444 7 436
              </a>
              <a href={`https://wa.me/905321384979?text=${encodeURIComponent(getSummaryText())}`} target="_blank" rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white transition hover:bg-[#20bd5a]">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>

            <div className="rounded-xl border-2 bg-gray-50 p-4">
              <p className="mb-3 text-center text-sm font-bold text-[#122032]">Sizi Biz Arayalım!</p>
              {aramaSent ? (
                <div className="py-4 text-center">
                  <CheckCircle className="mx-auto mb-2 h-8 w-8 text-[#25D366]" />
                  <p className="text-sm font-medium text-[#122032]">Talebiniz alındı!</p>
                  <p className="text-xs text-muted-foreground">En kısa sürede sizi arayacağız.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Input placeholder="Ad Soyad" value={aramaForm.ad || form.ad} onChange={(e) => setAramaForm({ ...aramaForm, ad: e.target.value })} className="border-2" />
                  <Input placeholder="Telefon" type="tel" value={aramaForm.telefon || form.telefon} onChange={(e) => setAramaForm({ ...aramaForm, telefon: e.target.value })} className="border-2" />
                  <Button
                    onClick={() => setAramaSent(true)}
                    disabled={!(aramaForm.ad || form.ad) || !(aramaForm.telefon || form.telefon)}
                    className="w-full bg-[#e3000f] hover:bg-[#c5000d]"
                  >
                    Gönder
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
