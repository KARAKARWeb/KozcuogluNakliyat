"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Send, CheckCircle, Loader2, Phone, Mail, User, MapPin, Calculator,
  Home, Building2, Truck, Package, Warehouse, ArrowRightLeft,
  ChevronDown, ChevronUp, AlertCircle,
} from "lucide-react";
import { getIller, getIlceler } from "@/lib/turkey-locations";

const HIZMET_TIPLERI = [
  { value: "evden-eve", label: "Evden Eve Nakliyat", icon: Home },
  { value: "ofis", label: "Ofis Taşıma", icon: Building2 },
  { value: "villa", label: "Villa Taşıma", icon: Home },
  { value: "parca", label: "Parça Eşya Taşıma", icon: Package },
  { value: "depolama", label: "Eşya Depolama", icon: Warehouse },
  { value: "sehirlerarasi", label: "Şehirler Arası Nakliyat", icon: Truck },
];

const EV_TIPLERI = [
  { value: "1+0", label: "Stüdyo (1+0)" },
  { value: "1+1", label: "1+1" },
  { value: "2+1", label: "2+1" },
  { value: "3+1", label: "3+1" },
  { value: "4+1", label: "4+1" },
  { value: "5+1", label: "5+1 ve üzeri" },
  { value: "villa", label: "Villa / Müstakil" },
];

const DEPO_ESYA_TIPLERI = [
  "1+0 Ev Eşyası", "1+1 Ev Eşyası", "2+1 Ev Eşyası", "3+1 Ev Eşyası",
  "4+1 Ev Eşyası", "Ofis Eşyası", "Villa Eşyası", "Sanat Eseri",
  "Antika Eşya", "Arşiv", "Koli", "Diğer",
];

const DEPO_SURELERI = ["1 Ay", "3 Ay", "6 Ay", "1 Yıl", "1 Yıl+"];

interface FormData {
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
  honeypot: string;
}

const INITIAL: FormData = {
  hizmetTipi: "", cikisIl: "", cikisIlce: "", cikisAdres: "",
  varisIl: "", varisIlce: "", varisAdres: "", evTipi: "",
  cikisKat: "", varisKat: "", cikisAsansor: "Var", varisAsansor: "Var",
  asansorIhtiyac: "Hayır", esyaListesi: "", ozelNotlar: "",
  ad: "", telefon: "", email: "", tercihTarih: "",
  depoYaka: "", depoEsyaTipi: "", depoSure: "", depoAmbalaj: "", depoNakliye: "",
  honeypot: "",
};

export default function QuoteForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const iller = getIller();
  const isDepo = form.hizmetTipi === "depolama";

  function update(patch: Partial<FormData>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.ad || !form.telefon || !form.hizmetTipi) {
      setError("Ad, telefon ve hizmet tipi zorunludur.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Bir hata oluştu");
      setSuccess(true);
      setForm(INITIAL);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border bg-white p-10 text-center shadow-sm">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[#122032]">Teklif Talebiniz Alındı!</h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          En kısa sürede sizinle iletişime geçeceğiz. Detaylı bilgi için bizi arayabilirsiniz.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="tel:+905321384979" className="inline-flex items-center gap-2 rounded-xl bg-[#122032] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1a2d45]">
            <Phone className="h-4 w-4" /> Hemen Ara
          </a>
          <Button variant="outline" onClick={() => setSuccess(false)} className="rounded-xl">
            Yeni Teklif Al
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
    {/* Fiyat Hesaplama Banner */}
    <div className="mb-4 rounded-xl border-2 border-dashed border-[#e3000f]/20 bg-gradient-to-r from-[#fef2f2] to-white p-4 text-center">
      <p className="mb-1 text-sm font-bold text-[#122032]">Hemen fiyat öğrenmek mi istiyorsunuz?</p>
      <p className="mb-3 text-xs text-muted-foreground">Online fiyat hesaplama aracımızla anında tahmini fiyat alın</p>
      <Link href="/nakliyat-fiyat-hesaplama" className="inline-flex items-center gap-2 rounded-lg bg-[#e3000f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#c5000d]">
        <Calculator className="h-4 w-4" /> Fiyat Hesapla
      </Link>
    </div>

    <form onSubmit={handleSubmit} className="space-y-0 rounded-2xl border bg-white shadow-sm overflow-hidden">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={(e) => update({ honeypot: e.target.value })} />
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-[#122032] to-[#1a2d45] px-6 py-6 md:px-8">
        <h3 className="text-lg font-bold text-white">Ücretsiz Teklif Alın</h3>
        <p className="mt-1 text-sm text-gray-300">Bilgilerinizi doldurun, size özel fiyat teklifi gönderelim</p>
      </div>

      <div className="space-y-6 p-6 md:p-8">

        {/* Hizmet Tipi */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-[#122032]">Hizmet Tipi *</Label>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {HIZMET_TIPLERI.map((h) => {
              const Icon = h.icon;
              return (
                <button
                  key={h.value}
                  type="button"
                  onClick={() => update({ hizmetTipi: h.value })}
                  className={`group relative flex items-center gap-2.5 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                    form.hizmetTipi === h.value
                      ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f] shadow-sm"
                      : "border-gray-100 bg-gray-50/50 text-[#122032] hover:border-gray-200 hover:bg-white"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${form.hizmetTipi === h.value ? "text-[#e3000f]" : "text-gray-400"}`} />
                  {h.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Kişisel Bilgiler */}
        <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50/50 p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-[#122032]">
            <User className="h-4 w-4 text-[#e3000f]" /> İletişim Bilgileri
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Ad Soyad *</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input value={form.ad} onChange={(e) => update({ ad: e.target.value })} placeholder="Adınız Soyadınız" className="bg-white pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Telefon *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="tel" value={form.telefon} onChange={(e) => update({ telefon: e.target.value })} placeholder="05XX XXX XX XX" className="bg-white pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>E-posta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input type="email" value={form.email} onChange={(e) => update({ email: e.target.value })} placeholder="ornek@mail.com" className="bg-white pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Tercih Edilen Tarih</Label>
              <Input type="date" value={form.tercihTarih} onChange={(e) => update({ tercihTarih: e.target.value })} className="bg-white" />
            </div>
          </div>
        </div>

        {/* Adres Bilgileri */}
        <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50/50 p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-[#122032]">
            <MapPin className="h-4 w-4 text-[#e3000f]" /> {isDepo ? "Eşya Alınacak Adres" : "Adres Bilgileri"}
          </p>

          <div className={`grid gap-5 ${isDepo ? "" : "lg:grid-cols-2"}`}>
            {/* Çıkış */}
            <div className="space-y-3">
              {!isDepo && <p className="text-xs font-semibold uppercase tracking-wider text-[#e3000f]">Çıkış Adresi</p>}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>İl</Label>
                  <Select value={form.cikisIl} onValueChange={(v) => update({ cikisIl: v, cikisIlce: "" })}>
                    <SelectTrigger className="bg-white"><SelectValue placeholder="İl seçin" /></SelectTrigger>
                    <SelectContent className="max-h-60">{iller.map((il) => <SelectItem key={il} value={il}>{il}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                {form.cikisIl && (
                  <div className="space-y-2">
                    <Label>İlçe</Label>
                    <Select value={form.cikisIlce} onValueChange={(v) => update({ cikisIlce: v })}>
                      <SelectTrigger className="bg-white"><SelectValue placeholder="İlçe seçin" /></SelectTrigger>
                      <SelectContent className="max-h-60">{getIlceler(form.cikisIl).map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Açık Adres</Label>
                <Input value={form.cikisAdres} onChange={(e) => update({ cikisAdres: e.target.value })} placeholder="Mahalle, sokak, bina no..." className="bg-white" />
              </div>
            </div>

            {/* Varış / Depo */}
            {isDepo ? (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Depo Tercihi</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Anadolu Yakası Depo", "Avrupa Yakası Depo"].map((v) => (
                      <button key={v} type="button" onClick={() => update({ depoYaka: v })}
                        className={`rounded-xl border-2 px-4 py-3 text-center text-sm font-medium transition-all ${form.depoYaka === v ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-100 bg-white text-[#122032] hover:border-gray-200"}`}>
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-600">Varış Adresi</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>İl</Label>
                    <Select value={form.varisIl} onValueChange={(v) => update({ varisIl: v, varisIlce: "" })}>
                      <SelectTrigger className="bg-white"><SelectValue placeholder="İl seçin" /></SelectTrigger>
                      <SelectContent className="max-h-60">{iller.map((il) => <SelectItem key={il} value={il}>{il}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  {form.varisIl && (
                    <div className="space-y-2">
                      <Label>İlçe</Label>
                      <Select value={form.varisIlce} onValueChange={(v) => update({ varisIlce: v })}>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="İlçe seçin" /></SelectTrigger>
                        <SelectContent className="max-h-60">{getIlceler(form.varisIl).map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Açık Adres</Label>
                  <Input value={form.varisAdres} onChange={(e) => update({ varisAdres: e.target.value })} placeholder="Mahalle, sokak, bina no..." className="bg-white" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detaylar Toggle */}
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 px-5 py-4 text-sm font-semibold text-[#122032] transition hover:bg-gray-100/50"
        >
          <span className="flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4 text-[#e3000f]" />
            Taşıma Detayları {isDepo ? "& Depolama Bilgileri" : ""}
          </span>
          {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showDetails && (
          <div className="space-y-5 rounded-xl border border-gray-100 bg-gray-50/50 p-5">
            {isDepo ? (
              <>
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Depolanacak Eşya Tipi</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {DEPO_ESYA_TIPLERI.map((t) => (
                      <button key={t} type="button" onClick={() => update({ depoEsyaTipi: t })}
                        className={`rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-all ${form.depoEsyaTipi === t ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-200 bg-white text-[#122032] hover:border-gray-300"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Depolama Süresi</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {DEPO_SURELERI.map((s) => (
                        <button key={s} type="button" onClick={() => update({ depoSure: s })}
                          className={`rounded-lg border px-3 py-2 text-center text-sm font-medium transition-all ${form.depoSure === s ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-200 bg-white text-[#122032] hover:border-gray-300"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold">Kat</Label>
                    <Input type="number" min="0" max="30" value={form.cikisKat} onChange={(e) => update({ cikisKat: e.target.value })} placeholder="Kaçıncı kat?" className="bg-white" />
                    <Label className="text-sm font-semibold">Ambalaj Paketleme</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["İstiyorum", "İstemiyorum"].map((v) => (
                        <button key={v} type="button" onClick={() => update({ depoAmbalaj: v })}
                          className={`rounded-lg border px-3 py-2 text-center text-sm font-medium transition-all ${form.depoAmbalaj === v ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-200 bg-white text-[#122032] hover:border-gray-300"}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Ev Tipi</Label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {EV_TIPLERI.map((e) => (
                      <button key={e.value} type="button" onClick={() => update({ evTipi: e.value })}
                        className={`rounded-lg border px-3 py-2.5 text-center text-sm font-semibold transition-all ${form.evTipi === e.value ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-200 bg-white text-[#122032] hover:border-gray-300"}`}>
                        {e.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#e3000f]">Çıkış Binası</p>
                    <div className="space-y-2">
                      <Label>Kat</Label>
                      <Input type="number" min="0" max="30" value={form.cikisKat} onChange={(e) => update({ cikisKat: e.target.value })} placeholder="Örn: 5" />
                    </div>
                    <div className="space-y-2">
                      <Label>Asansör</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Var", "Yok"].map((v) => (
                          <button key={v} type="button" onClick={() => update({ cikisAsansor: v })}
                            className={`rounded-lg border py-2 text-center text-sm font-medium transition-all ${form.cikisAsansor === v ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-200 text-[#122032] hover:border-gray-300"}`}>
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-600">Varış Binası</p>
                    <div className="space-y-2">
                      <Label>Kat</Label>
                      <Input type="number" min="0" max="30" value={form.varisKat} onChange={(e) => update({ varisKat: e.target.value })} placeholder="Örn: 3" />
                    </div>
                    <div className="space-y-2">
                      <Label>Asansör</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Var", "Yok"].map((v) => (
                          <button key={v} type="button" onClick={() => update({ varisAsansor: v })}
                            className={`rounded-lg border py-2 text-center text-sm font-medium transition-all ${form.varisAsansor === v ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-200 text-[#122032] hover:border-gray-300"}`}>
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Asansörlü Taşıma</Label>
                  <div className="grid grid-cols-2 gap-2 sm:w-1/2">
                    {["Evet", "Hayır"].map((v) => (
                      <button key={v} type="button" onClick={() => update({ asansorIhtiyac: v })}
                        className={`rounded-lg border py-2.5 text-center text-sm font-medium transition-all ${form.asansorIhtiyac === v ? "border-[#e3000f] bg-[#fef2f2] text-[#e3000f]" : "border-gray-200 bg-white text-[#122032] hover:border-gray-300"}`}>
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>Özel Eşya Listesi</Label>
              <Textarea value={form.esyaListesi} onChange={(e) => update({ esyaListesi: e.target.value })} rows={2} placeholder="Piyano, antika dolap, çelik kasa vb." className="bg-white" />
            </div>
          </div>
        )}

        {/* Notlar */}
        <div className="space-y-2">
          <Label>Notlarınız</Label>
          <Textarea value={form.ozelNotlar} onChange={(e) => update({ ozelNotlar: e.target.value })} rows={3} placeholder="Ek bilgi veya özel talepleriniz..." className="bg-white" />
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" /> {error}
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading || !form.hizmetTipi || !form.ad || !form.telefon}
          className="w-full rounded-xl bg-[#e3000f] py-6 text-base font-bold text-white shadow-lg transition hover:bg-[#c5000d] hover:shadow-xl disabled:opacity-50"
        >
          {loading ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Gönderiliyor...</>
          ) : (
            <><Send className="mr-2 h-5 w-5" /> Ücretsiz Teklif Al</>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Bilgileriniz gizli tutulur ve sadece teklif amacıyla kullanılır.
        </p>
      </div>
    </form>
    </>
  );
}
