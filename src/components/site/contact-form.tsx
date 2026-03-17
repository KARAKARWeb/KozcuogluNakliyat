"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "", honeypot: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.honeypot) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, service: form.service, message: form.message }),
      });
      const json = await res.json();
      if (json.success) { setSent(true); setForm({ name: "", phone: "", email: "", service: "", message: "", honeypot: "" }); toast.success("Mesajınız başarıyla gönderildi!"); }
      else { setError(json.error || "Bir hata oluştu"); toast.error(json.error || "Bir hata oluştu"); }
    } catch { setError("Bağlantı hatası"); toast.error("Bağlantı hatası"); }
    setSending(false);
  }

  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-[#122032]">Bize Yazın</h2>
      <p className="mt-2 text-muted-foreground">Formu doldurun, en kısa sürede dönelim</p>

      {sent ? (
        <div className="mt-8 flex flex-col items-center py-8 text-center">
          <CheckCircle className="h-12 w-12 text-green-500" />
          <p className="mt-3 text-lg font-semibold text-[#122032]">Mesajınız Alındı!</p>
          <p className="mt-1 text-sm text-muted-foreground">En kısa sürede sizinle iletişime geçeceğiz.</p>
          <Button onClick={() => setSent(false)} variant="outline" className="mt-4">Yeni Mesaj</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input type="text" name="website" value={form.honeypot} onChange={(e) => setForm({ ...form, honeypot: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Ad Soyad *</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-2"><Label>Telefon *</Label><Input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>E-Posta</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="space-y-2"><Label>Hizmet Tipi</Label><Input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} placeholder="Evden eve nakliyat" /></div>
          </div>
          <div className="space-y-2"><Label>Mesajınız *</Label><Textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} /></div>
          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
          <Button type="submit" disabled={sending} className="w-full bg-[#e3000f] hover:bg-[#c5000d]">
            {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Gönder
          </Button>
        </form>
      )}
    </div>
  );
}
