"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Loader2, ExternalLink, Plus, X } from "lucide-react";
import type { Service, PricingModule, Settings } from "@/types";
import MediaPicker from "@/components/admin/media-picker";
import RichTextEditor from "@/components/admin/rich-text-editor";

export default function AdminServiceEditPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id as string;
  const isNew = serviceId === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pricingModules, setPricingModules] = useState<PricingModule[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [originalSlug, setOriginalSlug] = useState("");
  const [form, setForm] = useState({
    title: "", slug: "", category: "bireysel", description: "", shortDescription: "", icon: "Package",
    image: "", content: "", isActive: true, showOnHomepage: true,
    seoTitle: "", seoDescription: "", pricingModuleId: "" as string | null,
  });
  const [faq, setFaq] = useState<{ question: string; answer: string }[]>([]);

  useEffect(() => {
    async function load() {
      const [pRes, sRes] = await Promise.all([fetch("/api/pricing"), fetch("/api/settings")]);
      const pJson = await pRes.json();
      if (pJson.success) setPricingModules(pJson.data);
      const sJson = await sRes.json();
      if (sJson.success && sJson.data?.serviceCategories) setCategories(sJson.data.serviceCategories);

      if (isNew) return;
      setLoading(true);
      const res = await fetch("/api/services");
      const json = await res.json();
      if (json.success) {
        const found = (json.data as Service[]).find((s) => s.id === serviceId || s.slug === serviceId);
        if (found) {
          setOriginalSlug(found.slug);
          setForm({
            title: found.title, slug: found.slug, category: found.category || "bireysel",
            description: found.description, shortDescription: found.shortDescription,
            icon: found.icon, image: found.image,
            content: found.content, isActive: found.isActive, showOnHomepage: found.showOnHomepage !== false,
            seoTitle: found.seo.title, seoDescription: found.seo.description,
            pricingModuleId: found.pricingModuleId || "",
          });
          setFaq(found.faq || []);
        }
      }
      setLoading(false);
    }
    load();
  }, [serviceId, isNew]);

  function handleTitleChange(title: string) {
    const slug = title.toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setForm((prev) => ({
      ...prev, title,
      slug: isNew ? slug : prev.slug,
      seoTitle: isNew ? `${title} | Kozcuoğlu Nakliyat` : prev.seoTitle,
    }));
  }

  async function handleSave() {
    setSaving(true);
    const payload = {
      title: form.title, slug: form.slug, category: form.category,
      description: form.description, shortDescription: form.shortDescription,
      icon: form.icon, image: form.image,
      content: form.content, isActive: form.isActive, showOnHomepage: form.showOnHomepage,
      pricingModuleId: form.pricingModuleId || null, faq,
      seo: { title: form.seoTitle, description: form.seoDescription, ogImage: "", robots: "index, follow", canonical: "" },
    };
    if (isNew) {
      await fetch("/api/services", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch(`/api/services/${originalSlug}/update`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    if (isNew) router.push("/admin/services");
  }

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/services")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-[#122032]">{isNew ? "Yeni Hizmet" : form.title}</h1>
            <p className="text-sm text-muted-foreground">{isNew ? "Yeni hizmet sayfası ekleyin" : "Hizmet bilgilerini düzenleyin"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isNew && form.slug && (
            <Link href={`/${form.slug}`} target="_blank">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs"><ExternalLink className="h-3.5 w-3.5" /> Sayfayı Gör</Button>
            </Link>
          )}
          {saved && <span className="text-sm font-medium text-green-600">Kaydedildi ✓</span>}
          <Button onClick={handleSave} disabled={saving || !form.title} className="gap-2 bg-[#e3000f] hover:bg-[#c5000d]">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isNew ? "Oluştur" : "Kaydet"}
          </Button>
        </div>
      </div>

      {/* Temel Bilgiler */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-5">
        <h2 className="text-sm font-bold text-[#122032] uppercase tracking-wider">Temel Bilgiler</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Başlık *</Label>
            <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Evden Eve Nakliyat" />
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Kısa Açıklama</Label>
          <Input value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Açıklama</Label>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label>Kategori</Label>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>İkon (Lucide)</Label>
            <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="Package" />
          </div>
          <div>
            <MediaPicker value={form.image} onChange={(url) => setForm({ ...form, image: url })} folder="services" label="Görsel" />
          </div>
          <div className="space-y-2">
            <Label>Fiyat Modülü</Label>
            <Select value={form.pricingModuleId || ""} onValueChange={(v) => setForm({ ...form, pricingModuleId: v === "none" ? "" : v })}>
              <SelectTrigger><SelectValue placeholder="Modül seçin" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Yok</SelectItem>
                {pricingModules.map((m) => <SelectItem key={m.id} value={m.slug}>{m.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} />
            <Label>Aktif</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.showOnHomepage} onCheckedChange={(v) => setForm({ ...form, showOnHomepage: v })} />
            <Label>Ana Sayfada Göster</Label>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-[#122032] uppercase tracking-wider">Sayfa İçeriği</h2>
        <RichTextEditor
          content={form.content}
          onChange={(html) => setForm({ ...form, content: html })}
        />
      </div>

      {/* SSS */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#122032] uppercase tracking-wider">SSS (Sıkça Sorulan Sorular)</h2>
          <Button variant="outline" size="sm" onClick={() => setFaq([...faq, { question: "", answer: "" }])} className="h-8 gap-1.5 text-xs">
            <Plus className="h-3.5 w-3.5" /> Soru Ekle
          </Button>
        </div>
        {faq.length === 0 && <p className="text-sm text-muted-foreground">Henüz SSS eklenmemiş</p>}
        <div className="space-y-3">
          {faq.map((item, i) => (
            <div key={i} className="relative rounded-lg border p-4">
              <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-7 w-7" onClick={() => setFaq(faq.filter((_, idx) => idx !== i))}>
                <X className="h-3.5 w-3.5" />
              </Button>
              <div className="space-y-3 pr-8">
                <div className="space-y-1">
                  <Label className="text-xs">Soru</Label>
                  <Input value={item.question} onChange={(e) => { const f = [...faq]; f[i] = { ...f[i], question: e.target.value }; setFaq(f); }} />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Cevap</Label>
                  <Textarea value={item.answer} onChange={(e) => { const f = [...faq]; f[i] = { ...f[i], answer: e.target.value }; setFaq(f); }} rows={2} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-5">
        <h2 className="text-sm font-bold text-[#122032] uppercase tracking-wider">SEO Ayarları</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>SEO Başlık</Label>
            <Input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
            <p className="text-xs text-muted-foreground">{form.seoTitle.length}/60 karakter</p>
          </div>
          <div className="space-y-2">
            <Label>SEO Açıklama</Label>
            <Textarea value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} rows={3} />
            <p className="text-xs text-muted-foreground">{form.seoDescription.length}/160 karakter</p>
          </div>
        </div>
      </div>

      {/* Alt kaydet */}
      <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
        <Button variant="outline" onClick={() => router.push("/admin/services")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Hizmetlere Dön
        </Button>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm font-medium text-green-600">Kaydedildi ✓</span>}
          <Button onClick={handleSave} disabled={saving || !form.title} className="gap-2 bg-[#e3000f] hover:bg-[#c5000d]">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isNew ? "Oluştur" : "Kaydet"}
          </Button>
        </div>
      </div>
    </div>
  );
}
