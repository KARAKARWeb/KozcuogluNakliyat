"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, Plus, Trash2, FileText } from "lucide-react";
import PageHeader from "@/components/admin/page-header";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface FooterData {
  ctaBar: { title: string; description: string; button1Text: string; button1Link: string; button2Text: string; button2Link: string };
  company: { name: string; description: string };
  copyright: string;
  legalLinks: { label: string; href: string }[];
  regionsTitle: string;
}

const DEFAULT: FooterData = {
  ctaBar: { title: "", description: "", button1Text: "", button1Link: "", button2Text: "", button2Link: "" },
  company: { name: "", description: "" },
  copyright: "",
  legalLinks: [],
  regionsTitle: "",
};

export default function AdminFooterPage() {
  const [data, setData] = useState<FooterData>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/footer");
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch { /* ignore */ }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    await fetch("/api/footer", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function updateCtaBar(field: string, value: string) {
    setData((prev) => ({ ...prev, ctaBar: { ...prev.ctaBar, [field]: value } }));
  }

  function updateCompany(field: string, value: string) {
    setData((prev) => ({ ...prev, company: { ...prev.company, [field]: value } }));
  }

  function updateLegalLink(index: number, field: string, value: string) {
    setData((prev) => {
      const links = [...prev.legalLinks];
      links[index] = { ...links[index], [field]: value };
      return { ...prev, legalLinks: links };
    });
  }

  function addLegalLink() {
    setData((prev) => ({ ...prev, legalLinks: [...prev.legalLinks, { label: "", href: "" }] }));
  }

  function removeLegalLink(index: number) {
    setData((prev) => ({ ...prev, legalLinks: prev.legalLinks.filter((_, i) => i !== index) }));
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Footer Düzenle" description="Alt bilgi alanının tüm bölümlerini düzenleyin" />
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm font-medium text-green-600">Kaydedildi ✓</span>}
          <Button onClick={handleSave} disabled={saving} className="gap-2 bg-[#e3000f] hover:bg-[#c5000d]">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Kaydet
          </Button>
        </div>
      </div>

      {/* CTA Bar */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-[#122032] uppercase tracking-wider flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#e3000f]" /> CTA Bar (Kırmızı Üst Bant)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Başlık</Label>
            <Input value={data.ctaBar.title} onChange={(e) => updateCtaBar("title", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Açıklama</Label>
            <Input value={data.ctaBar.description} onChange={(e) => updateCtaBar("description", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Buton 1 Metni</Label>
            <Input value={data.ctaBar.button1Text} onChange={(e) => updateCtaBar("button1Text", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Buton 1 Linki</Label>
            <Input value={data.ctaBar.button1Link} onChange={(e) => updateCtaBar("button1Link", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Buton 2 Metni</Label>
            <Input value={data.ctaBar.button2Text} onChange={(e) => updateCtaBar("button2Text", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Buton 2 Linki</Label>
            <Input value={data.ctaBar.button2Link} onChange={(e) => updateCtaBar("button2Link", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Firma Bilgisi */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-[#122032] uppercase tracking-wider flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#e3000f]" /> Firma Bilgisi
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Firma Adı</Label>
            <Input value={data.company.name} onChange={(e) => updateCompany("name", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Firma Açıklaması</Label>
            <Textarea value={data.company.description} onChange={(e) => updateCompany("description", e.target.value)} rows={3} />
          </div>
        </div>
      </div>

      {/* Bölgeler Başlığı */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-[#122032] uppercase tracking-wider flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#e3000f]" /> Hizmet Bölgeleri Bant
        </h2>
        <div className="space-y-2">
          <Label>Bölgeler Başlığı</Label>
          <Input value={data.regionsTitle} onChange={(e) => setData((prev) => ({ ...prev, regionsTitle: e.target.value }))} />
        </div>
      </div>

      {/* Copyright & Hukuki Linkler */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-[#122032] uppercase tracking-wider flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#e3000f]" /> Alt Bar (Copyright & Hukuki Linkler)
        </h2>
        <div className="space-y-2">
          <Label>Copyright Metni</Label>
          <Input value={data.copyright} onChange={(e) => setData((prev) => ({ ...prev, copyright: e.target.value }))} />
        </div>
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase">Hukuki Linkler ({data.legalLinks.length})</p>
            <Button variant="outline" size="sm" className="h-7 gap-1 text-xs" onClick={addLegalLink}>
              <Plus className="h-3 w-3" /> Ekle
            </Button>
          </div>
          {data.legalLinks.map((link, i) => (
            <div key={i} className="flex gap-2 items-center rounded-lg border bg-gray-50 p-3">
              <Input value={link.label} onChange={(e) => updateLegalLink(i, "label", e.target.value)} placeholder="Etiket" className="h-8 text-sm flex-1" />
              <Input value={link.href} onChange={(e) => updateLegalLink(i, "href", e.target.value)} placeholder="/sayfa-slug" className="h-8 text-sm flex-1" />
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-red-500 hover:text-red-700" onClick={() => removeLegalLink(i)}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Alt kaydet */}
      <div className="flex items-center justify-end rounded-xl border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm font-medium text-green-600">Kaydedildi ✓</span>}
          <Button onClick={handleSave} disabled={saving} className="gap-2 bg-[#e3000f] hover:bg-[#c5000d]">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
}
