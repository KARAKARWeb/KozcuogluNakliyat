"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Loader2, ExternalLink } from "lucide-react";
import type { Region } from "@/types";
import Link from "next/link";
import MediaPicker from "@/components/admin/media-picker";
import RichTextEditor from "@/components/admin/rich-text-editor";

export default function AdminRegionEditPage() {
  const params = useParams();
  const router = useRouter();
  const regionId = params.id as string;
  const isNew = regionId === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", district: "", city: "İstanbul", type: "district" as "district" | "intercity",
    description: "", content: "", image: "", isActive: true, seoTitle: "", seoDescription: "",
    latitude: 0, longitude: 0,
  });

  useEffect(() => {
    if (isNew) return;
    async function load() {
      setLoading(true);
      const res = await fetch("/api/regions");
      const json = await res.json();
      if (json.success) {
        const found = (json.data as Region[]).find((r) => r.id === regionId || r.slug === regionId);
        if (found) {
          setForm({
            title: found.title, slug: found.slug, district: found.district, city: found.city,
            type: found.type, description: found.description, content: found.content,
            image: found.image, isActive: found.isActive,
            seoTitle: found.seo.title, seoDescription: found.seo.description,
            latitude: found.geo.latitude, longitude: found.geo.longitude,
          });
        }
      }
      setLoading(false);
    }
    load();
  }, [regionId, isNew]);

  function handleTitleChange(title: string) {
    const slug = title
      .toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setForm((prev) => ({
      ...prev,
      title,
      slug: isNew ? slug : prev.slug,
      seoTitle: isNew ? `${title} | Kozcuoğlu Nakliyat` : prev.seoTitle,
    }));
  }

  async function handleSave() {
    setSaving(true);
    const payload = {
      title: form.title, slug: form.slug, district: form.district, city: form.city,
      type: form.type, description: form.description, content: form.content,
      image: form.image, isActive: form.isActive,
      geo: { latitude: form.latitude, longitude: form.longitude },
      seo: { title: form.seoTitle, description: form.seoDescription, ogImage: "", robots: "index, follow", canonical: "" },
    };
    if (isNew) {
      await fetch("/api/regions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch(`/api/regions/${regionId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    if (isNew) router.push("/admin/regions");
  }

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/regions")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-[#122032]">{isNew ? "Yeni Bölge" : form.title}</h1>
            <p className="text-sm text-muted-foreground">{isNew ? "Yeni hizmet bölgesi ekleyin" : "Bölge bilgilerini düzenleyin"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isNew && form.slug && (
            <Link href={`/${form.slug}`} target="_blank">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <ExternalLink className="h-3.5 w-3.5" /> Sayfayı Gör
              </Button>
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
            <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Örn: Kadıköy Evden Eve Nakliyat" />
          </div>
          <div className="space-y-2">
            <Label>Slug</Label>
            <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="kadikoy-evden-eve-nakliyat" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>{form.type === "intercity" ? "Nereden (Şehir)" : "İlçe / Bölge"}</Label>
            <Input value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} placeholder={form.type === "intercity" ? "İstanbul" : "Kadıköy"} />
          </div>
          <div className="space-y-2">
            <Label>{form.type === "intercity" ? "Nereye (Şehir)" : "Şehir"}</Label>
            <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder={form.type === "intercity" ? "İzmir" : "İstanbul"} />
          </div>
          <div className="space-y-2">
            <Label>Tip</Label>
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as "district" | "intercity" })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="district">İlçe</SelectItem>
                <SelectItem value="intercity">Şehirler Arası</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Kısa Açıklama</Label>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Bölge hakkında kısa açıklama..." />
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} />
          <Label>Aktif</Label>
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

      {/* Görsel & Konum */}
      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-5">
        <h2 className="text-sm font-bold text-[#122032] uppercase tracking-wider">Görsel & Konum</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <MediaPicker value={form.image} onChange={(url) => setForm({ ...form, image: url })} folder="regions" label="Görsel" />
          </div>
          <div className="space-y-2">
            <Label>Enlem</Label>
            <Input type="number" step="0.0001" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: Number(e.target.value) })} />
          </div>
          <div className="space-y-2">
            <Label>Boylam</Label>
            <Input type="number" step="0.0001" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: Number(e.target.value) })} />
          </div>
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
        <Button variant="outline" onClick={() => router.push("/admin/regions")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Bölgelere Dön
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
