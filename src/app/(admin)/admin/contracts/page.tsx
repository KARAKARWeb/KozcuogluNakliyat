"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/admin/page-header";
import DeleteDialog from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import type { Contract } from "@/types";

export default function AdminContractsPage() {
  const [items, setItems] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<Contract | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", content: "", isActive: true, seoTitle: "", seoDescription: "" });

  async function fetchData() { setLoading(true); const res = await fetch("/api/contracts"); const json = await res.json(); if (json.success) setItems(json.data); setLoading(false); }
  useEffect(() => { fetchData(); }, []);

  function openNew() { setEditItem(null); setForm({ title: "", slug: "", content: "", isActive: true, seoTitle: "", seoDescription: "" }); setDialogOpen(true); }
  function openEdit(item: Contract) { setEditItem(item); setForm({ title: item.title, slug: item.slug, content: item.content, isActive: item.isActive, seoTitle: item.seo.title, seoDescription: item.seo.description }); setDialogOpen(true); }

  async function handleSave() {
    setSaving(true);
    const payload = { title: form.title, slug: form.slug, content: form.content, isActive: form.isActive, seo: { title: form.seoTitle, description: form.seoDescription, ogImage: "", robots: "index, follow", canonical: "" } };
    if (editItem) { await fetch(`/api/contracts/${editItem.slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); }
    else { await fetch("/api/contracts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); }
    setSaving(false); setDialogOpen(false); fetchData();
  }

  async function handleDelete() { setDeleteLoading(true); await fetch(`/api/contracts/${deleteId}`, { method: "DELETE" }); setDeleteLoading(false); setDeleteOpen(false); fetchData(); }

  return (
    <div className="space-y-6">
      <PageHeader title="Sözleşmeler" description="Hukuki sözleşmeleri yönetin" actionLabel="Sözleşme Ekle" onAction={openNew} />
      {loading ? <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div> : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader><TableRow><TableHead>Başlık</TableHead><TableHead>Slug</TableHead><TableHead>Durum</TableHead><TableHead className="text-right">İşlemler</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">/{c.slug}</TableCell>
                  <TableCell><Badge variant={c.isActive ? "default" : "secondary"}>{c.isActive ? "Aktif" : "Pasif"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => { setDeleteId(c.id); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">Henüz sözleşme yok</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader><DialogTitle>{editItem ? "Sözleşme Düzenle" : "Yeni Sözleşme"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Başlık</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>İçerik (HTML)</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} className="font-mono text-sm" /></div>
            <div className="border-t pt-4">
              <p className="mb-3 text-sm font-semibold">SEO</p>
              <div className="space-y-3">
                <div className="space-y-2"><Label>SEO Başlık</Label><Input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} /></div>
                <div className="space-y-2"><Label>SEO Açıklama</Label><Textarea value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} rows={2} /></div>
              </div>
            </div>
            <div className="flex items-center gap-2"><Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} /><Label>Aktif</Label></div>
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>İptal</Button>
              <Button onClick={handleSave} disabled={saving || !form.title} className="bg-[#e3000f] hover:bg-[#c5000d]">{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}{editItem ? "Güncelle" : "Kaydet"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} loading={deleteLoading} />
    </div>
  );
}
