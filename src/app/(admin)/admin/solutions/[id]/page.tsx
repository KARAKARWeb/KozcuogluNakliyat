"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Loader2, ExternalLink } from "lucide-react";
import type { Solution } from "@/types";
import MediaPicker from "@/components/admin/media-picker";
import RichTextEditor from "@/components/admin/rich-text-editor";

export default function AdminSolutionEditPage() {
  const params = useParams();
  const router = useRouter();
  const solutionId = params.id as string;
  const isNew = solutionId === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [originalSlug, setOriginalSlug] = useState("");
  const [form, setForm] = useState({
    title: "", slug: "", description: "", shortDescription: "", icon: "Wrench",
    image: "", content: "", isActive: true, seoTitle: "", seoDescription: "",
  });

  useEffect(() => {
    if (isNew) return;
    async function load() {
      setLoading(true);
      const res = await fetch("/api/solutions");
      const json = await res.json();
      if (json.success) {
        const found = (json.data as Solution[]).find((s) => s.id === solutionId || s.slug === solutionId);
        if (found) {
          setOriginalSlug(found.slug);
          setForm({
            title: found.title, slug: found.slug, description: found.description,
            shortDescription: found.shortDescription, icon: found.icon, image: found.image,
            content: found.content, isActive: found.isActive,
            seoTitle: found.seo.title, seoDescription: found.seo.description,
          });
        }
      }
      setLoading(false);
    }
    load();
  }, [solutionId, isNew]);

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
      title: form.title, slug: form.slug, description: form.description,
      shortDescription: form.shortDescription, icon: form.icon, image: form.image,
      content: form.content, isActive: form.isActive,
      seo: { title: form.seoTitle, description: form.seoDescription, ogImage: "", robots: "index, follow", canonical: "" },
    };
    if (isNew) {
      await fetch("/api/solutions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch(`/api/solutions/${originalSlug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    if (isNew) router.push("/admin/solutions");
  }

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/admin/solutions")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-[#122032]">{isNew ? "Yeni Çözüm" : form.title}</h1>
            <p className="text-sm text-muted-foreground">{isNew ? "Yeni çözüm sayfası ekleyin" : "Çözüm bilgilerini düzenleyin"}</p>
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

      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-5">
        <h2 className="text-sm font-bold text-[#122032] uppercase tracking-wider">Temel Bilgiler</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Başlık *</Label>
            <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} />
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
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>İkon (Lucide)</Label>
            <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          </div>
          <div>
            <MediaPicker value={form.image} onChange={(url) => setForm({ ...form, image: url })} folder="solutions" label="Görsel" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} />
          <Label>Aktif</Label>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-[#122032] uppercase tracking-wider">Sayfa İçeriği</h2>
        <RichTextEditor
          content={form.content}
          onChange={(html) => setForm({ ...form, content: html })}
        />
      </div>

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

      <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
        <Button variant="outline" onClick={() => router.push("/admin/solutions")} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Çözümlere Dön
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
