"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle, MessageCircle, User, Phone as PhoneIcon, Mail, Home, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";

const EV_TIPLERI = ["Stüdyo (1+0)", "1+1", "2+1", "3+1", "4+1", "5+1 ve üzeri", "Villa / Müstakil"];
const ASANSOR = ["Var", "Yok"];

export default function KesifTalepForm() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    homeType: "", moveDate: "",
    fromAddress: "", fromFloor: "", fromElevator: "",
    toAddress: "", toFloor: "", toElevator: "",
    notes: "", honeypot: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.honeypot) return;
    
    if (!form.name || !form.phone || !form.fromAddress || !form.toAddress) {
      setError("Lütfen zorunlu alanları doldurun");
      toast.error("Lütfen zorunlu alanları doldurun");
      return;
    }

    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/surveys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          fromAddress: form.fromAddress,
          fromFloor: form.fromFloor,
          fromElevator: form.fromElevator,
          toAddress: form.toAddress,
          toFloor: form.toFloor,
          toElevator: form.toElevator,
          homeType: form.homeType,
          moveDate: form.moveDate,
          note: form.notes,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSent(true);
        toast.success("Keşif talebiniz alındı!");
      } else {
        setError(json.error || "Bir hata oluştu");
        toast.error(json.error || "Bir hata oluştu");
      }
    } catch {
      setError("Bağlantı hatası");
      toast.error("Bağlantı hatası");
    }
    setSending(false);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h3 className="mt-4 text-2xl font-bold text-[#122032]">Talebiniz Alındı!</h3>
        <p className="mt-2 text-muted-foreground">
          En kısa sürede sizinle iletişime geçeceğiz.
        </p>
        <a
          href={`https://wa.me/905321384979?text=Merhaba%2C%20ke%C5%9Fif%20talebi%20olu%C5%9Fturdum.%20${encodeURIComponent(form.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-medium text-white transition hover:bg-[#20bd5a]"
        >
          <MessageCircle className="h-5 w-5" /> WhatsApp ile Onaylayın
        </a>
        <Button onClick={() => setSent(false)} variant="outline" className="mt-3">
          Yeni Talep Oluştur
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="text" name="website" value={form.honeypot} onChange={(e) => setForm({ ...form, honeypot: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />

      {/* İletişim Bilgileri */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b pb-2">
          <User className="h-5 w-5 text-[#e3000f]" />
          <h3 className="font-bold text-[#122032]">İletişim Bilgileri</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Ad Soyad *</Label>
            <Input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Adınız Soyadınız"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon *</Label>
            <Input
              id="phone"
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="05XX XXX XX XX"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">E-Posta</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="ornek@mail.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="homeType">Ev Tipi</Label>
            <Select value={form.homeType} onValueChange={(v) => setForm({ ...form, homeType: v })}>
              <SelectTrigger id="homeType">
                <SelectValue placeholder="Seçin" />
              </SelectTrigger>
              <SelectContent>
                {EV_TIPLERI.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="moveDate">Taşıma Tarihi</Label>
          <Input
            id="moveDate"
            type="date"
            value={form.moveDate}
            onChange={(e) => setForm({ ...form, moveDate: e.target.value })}
          />
        </div>
      </div>

      {/* Çıkış Adresi */}
      <div className="space-y-4 rounded-xl border-2 border-[#e3000f]/20 bg-[#fef2f2] p-5">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-[#e3000f]" />
          <h3 className="font-bold text-[#122032]">Çıkış Adresi (Mevcut Adres)</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromAddress">Adres *</Label>
          <Input
            id="fromAddress"
            required
            value={form.fromAddress}
            onChange={(e) => setForm({ ...form, fromAddress: e.target.value })}
            placeholder="İl, İlçe, Mahalle, Sokak, Bina No"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fromFloor">Kat</Label>
            <Input
              id="fromFloor"
              type="number"
              min="0"
              max="30"
              value={form.fromFloor}
              onChange={(e) => setForm({ ...form, fromFloor: e.target.value })}
              placeholder="Örn: 5"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fromElevator">Asansör</Label>
            <Select value={form.fromElevator} onValueChange={(v) => setForm({ ...form, fromElevator: v })}>
              <SelectTrigger id="fromElevator">
                <SelectValue placeholder="Seçin" />
              </SelectTrigger>
              <SelectContent>
                {ASANSOR.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Varış Adresi */}
      <div className="space-y-4 rounded-xl border-2 border-green-200 bg-green-50 p-5">
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5 text-green-600" />
          <h3 className="font-bold text-[#122032]">Varış Adresi (Yeni Adres)</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="toAddress">Adres *</Label>
          <Input
            id="toAddress"
            required
            value={form.toAddress}
            onChange={(e) => setForm({ ...form, toAddress: e.target.value })}
            placeholder="İl, İlçe, Mahalle, Sokak, Bina No"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="toFloor">Kat</Label>
            <Input
              id="toFloor"
              type="number"
              min="0"
              max="30"
              value={form.toFloor}
              onChange={(e) => setForm({ ...form, toFloor: e.target.value })}
              placeholder="Örn: 3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="toElevator">Asansör</Label>
            <Select value={form.toElevator} onValueChange={(v) => setForm({ ...form, toElevator: v })}>
              <SelectTrigger id="toElevator">
                <SelectValue placeholder="Seçin" />
              </SelectTrigger>
              <SelectContent>
                {ASANSOR.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Notlar */}
      <div className="space-y-2">
        <Label htmlFor="notes">Özel Notlar / Talepleriniz</Label>
        <Textarea
          id="notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={4}
          placeholder="Özel eşyalarınız, ek talepleriniz veya sorularınız varsa buraya yazabilirsiniz..."
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600" role="alert">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={sending}
        className="w-full bg-[#e3000f] py-6 text-lg font-bold hover:bg-[#c5000d]"
      >
        {sending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Gönderiliyor...
          </>
        ) : (
          <>
            <Calendar className="mr-2 h-5 w-5" />
            Ücretsiz Keşif Talep Et
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Bilgileriniz gizli tutulur ve sadece keşif randevusu için kullanılır.
      </p>
    </form>
  );
}
