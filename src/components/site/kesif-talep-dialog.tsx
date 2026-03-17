"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Loader2, CheckCircle, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const EV_TIPLERI = ["1+1", "2+1", "3+1", "4+1", "Villa"];

interface KesifTalepDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function KesifTalepDialog({ open, onClose }: KesifTalepDialogProps) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    fromAddress: "", fromFloor: "", fromElevator: "",
    toAddress: "", toFloor: "", toElevator: "",
    homeType: "", moveDate: "", notes: "", honeypot: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.honeypot) return;
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
    }
    setSending(false);
  }

  function handleClose() {
    setSent(false);
    setError("");
    setForm({ name: "", phone: "", email: "", fromAddress: "", fromFloor: "", fromElevator: "", toAddress: "", toFloor: "", toElevator: "", homeType: "", moveDate: "", notes: "", honeypot: "" });
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleClose}>
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className="absolute right-4 top-4 text-muted-foreground hover:text-[#122032]" aria-label="Kapat">
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold text-[#122032]">Ücretsiz Keşif Talep Et</h2>
        <p className="mt-1 text-sm text-muted-foreground">Formu doldurun, ekibimiz adresinize gelsin</p>

        {sent ? (
          <div className="mt-8 flex flex-col items-center py-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <p className="mt-3 text-lg font-semibold text-[#122032]">Talebiniz Alındı!</p>
            <p className="mt-1 text-sm text-muted-foreground">En kısa sürede sizinle iletişime geçeceğiz.</p>
            <a
              href={`https://wa.me/905321384979?text=Merhaba%2C%20ke%C5%9Fif%20talebi%20olu%C5%9Fturdum.%20${encodeURIComponent(form.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#20bd5a]"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp ile Onaylayın
            </a>
            <Button onClick={handleClose} variant="outline" className="mt-3">Kapat</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input type="text" name="website" value={form.honeypot} onChange={(e) => setForm({ ...form, honeypot: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Ad Soyad *</Label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Telefon *</Label>
                <Input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>E-Posta</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Ev Tipi *</Label>
                <Select value={form.homeType} onValueChange={(v) => setForm({ ...form, homeType: v })}>
                  <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                  <SelectContent>
                    {EV_TIPLERI.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <p className="mb-3 text-sm font-semibold text-[#122032]">Mevcut Adres</p>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Adres *</Label>
                  <Input required value={form.fromAddress} onChange={(e) => setForm({ ...form, fromAddress: e.target.value })} placeholder="İl, İlçe, Mahalle" />
                </div>
                <div className="grid gap-3 grid-cols-2">
                  <div className="space-y-2">
                    <Label>Kat</Label>
                    <Input type="number" min="0" value={form.fromFloor} onChange={(e) => setForm({ ...form, fromFloor: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Asansör</Label>
                    <Select value={form.fromElevator} onValueChange={(v) => setForm({ ...form, fromElevator: v })}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Var">Var</SelectItem>
                        <SelectItem value="Yok">Yok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <p className="mb-3 text-sm font-semibold text-[#122032]">Yeni Adres</p>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Adres *</Label>
                  <Input required value={form.toAddress} onChange={(e) => setForm({ ...form, toAddress: e.target.value })} placeholder="İl, İlçe, Mahalle" />
                </div>
                <div className="grid gap-3 grid-cols-2">
                  <div className="space-y-2">
                    <Label>Kat</Label>
                    <Input type="number" min="0" value={form.toFloor} onChange={(e) => setForm({ ...form, toFloor: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Asansör</Label>
                    <Select value={form.toElevator} onValueChange={(v) => setForm({ ...form, toElevator: v })}>
                      <SelectTrigger><SelectValue placeholder="Seçin" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Var">Var</SelectItem>
                        <SelectItem value="Yok">Yok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Taşıma Tarihi</Label>
                <Input type="date" value={form.moveDate} onChange={(e) => setForm({ ...form, moveDate: e.target.value })} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notlar</Label>
              <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Özel istekleriniz..." />
            </div>

            {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

            <Button type="submit" disabled={sending} className="w-full bg-[#e3000f] hover:bg-[#c5000d]">
              {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Keşif Talep Et
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
