"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Loader2, Star } from "lucide-react";
import type { Rating } from "@/types";

export default function AdminRatingsPage() {
  const [items, setItems] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<Rating | null>(null);
  const [form, setForm] = useState({ pageSlug: "", pageName: "", mode: "manual" as "auto" | "manual", ratingValue: 0, reviewCount: 0 });

  async function fetchData() { setLoading(true); const res = await fetch("/api/ratings"); const json = await res.json(); if (json.success) setItems(json.data); setLoading(false); }
  useEffect(() => { fetchData(); }, []);

  function openEdit(item: Rating) { setEditItem(item); setForm({ pageSlug: item.pageSlug, pageName: item.pageName, mode: item.mode, ratingValue: item.ratingValue, reviewCount: item.reviewCount }); setDialogOpen(true); }
  
  function openNew() { setEditItem(null); setForm({ pageSlug: "", pageName: "", mode: "manual", ratingValue: 5, reviewCount: 0 }); setDialogOpen(true); }

  async function handleSave() {
    setSaving(true);
    if (editItem) {
      await fetch(`/api/ratings/${editItem.pageSlug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    } else {
      await fetch("/api/ratings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    }
    setSaving(false); setDialogOpen(false); fetchData();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Rating Ayarları" description="Sayfa bazlı AggregateRating ayarlarını yönetin" />
        <Button onClick={openNew} className="bg-[#e3000f] hover:bg-[#c5000d]">Yeni Rating Ekle</Button>
      </div>
      {loading ? <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div> : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader><TableRow><TableHead>Sayfa</TableHead><TableHead>Slug</TableHead><TableHead>Mod</TableHead><TableHead>Puan</TableHead><TableHead>Yorum Sayısı</TableHead><TableHead className="text-right">İşlemler</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.pageName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.pageSlug}</TableCell>
                  <TableCell className="text-sm">{r.mode === "auto" ? "Otomatik" : "Manuel"}</TableCell>
                  <TableCell><div className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{r.ratingValue}</div></TableCell>
                  <TableCell>{r.reviewCount}</TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="icon" onClick={() => openEdit(r)}><Pencil className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
              {items.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">Henüz rating ayarı yok</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editItem ? `Rating Düzenle - ${editItem.pageName}` : "Yeni Rating Ekle"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            {!editItem && (
              <>
                <div className="space-y-2"><Label>Sayfa Slug *</Label><Input placeholder="ev-tasima" value={form.pageSlug} onChange={(e) => setForm({ ...form, pageSlug: e.target.value })} /></div>
                <div className="space-y-2"><Label>Sayfa Adı *</Label><Input placeholder="Ev Taşıma" value={form.pageName} onChange={(e) => setForm({ ...form, pageName: e.target.value })} /></div>
              </>
            )}
            <div className="flex items-center gap-2"><Switch checked={form.mode === "auto"} onCheckedChange={(v) => setForm({ ...form, mode: v ? "auto" : "manual" })} /><Label>{form.mode === "auto" ? "Otomatik (yorumlardan)" : "Manuel"}</Label></div>
            {form.mode === "manual" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Puan (1-5)</Label><Input type="number" min={1} max={5} step={0.1} value={form.ratingValue} onChange={(e) => setForm({ ...form, ratingValue: Number(e.target.value) })} /></div>
                <div className="space-y-2"><Label>Yorum Sayısı</Label><Input type="number" min={0} value={form.reviewCount} onChange={(e) => setForm({ ...form, reviewCount: Number(e.target.value) })} /></div>
              </div>
            )}
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>İptal</Button>
              <Button onClick={handleSave} disabled={saving} className="bg-[#e3000f] hover:bg-[#c5000d]">{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Güncelle</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
