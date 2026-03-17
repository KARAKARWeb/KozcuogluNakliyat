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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import type { Campaign } from "@/types";

export default function AdminCampaignsPage() {
  const [items, setItems] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<Campaign | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", description: "", content: "", image: "", discountType: "percentage" as Campaign["discountType"], discountValue: 0, validFrom: "", validThrough: "", isActive: true });

  async function fetchData() { setLoading(true); const res = await fetch("/api/campaigns"); const json = await res.json(); if (json.success) setItems(json.data); setLoading(false); }
  useEffect(() => { fetchData(); }, []);

  function openNew() { setEditItem(null); setForm({ title: "", slug: "", description: "", content: "", image: "", discountType: "percentage", discountValue: 0, validFrom: "", validThrough: "", isActive: true }); setDialogOpen(true); }
  function openEdit(item: Campaign) { setEditItem(item); setForm({ title: item.title, slug: item.slug, description: item.description, content: item.content, image: item.image, discountType: item.discountType, discountValue: item.discountValue, validFrom: item.validFrom.slice(0, 10), validThrough: item.validThrough?.slice(0, 10) || "", isActive: item.isActive }); setDialogOpen(true); }

  async function handleSave() {
    setSaving(true);
    const payload = { ...form };
    if (editItem) { await fetch(`/api/campaigns/${editItem.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); }
    else { await fetch("/api/campaigns", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); }
    setSaving(false); setDialogOpen(false); fetchData();
  }

  async function handleDelete() { setDeleteLoading(true); await fetch(`/api/campaigns/${deleteId}`, { method: "DELETE" }); setDeleteLoading(false); setDeleteOpen(false); fetchData(); }

  return (
    <div className="space-y-6">
      <PageHeader title="Kampanyalar" description="Kampanyalarınızı yönetin" actionLabel="Kampanya Ekle" onAction={openNew} />
      {loading ? <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div> : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader><TableRow><TableHead>Başlık</TableHead><TableHead>İndirim</TableHead><TableHead>Başlangıç</TableHead><TableHead>Bitiş</TableHead><TableHead>Durum</TableHead><TableHead className="text-right">İşlemler</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell>{c.discountType === "percentage" ? `%${c.discountValue}` : c.discountType === "fixed" ? `${c.discountValue} TL` : "Ücretsiz"}</TableCell>
                  <TableCell className="text-sm">{c.validFrom ? new Date(c.validFrom).toLocaleDateString("tr-TR") : "-"}</TableCell>
                  <TableCell className="text-sm">{c.validThrough ? new Date(c.validThrough).toLocaleDateString("tr-TR") : "-"}</TableCell>
                  <TableCell><Badge variant={c.isActive ? "default" : "secondary"}>{c.isActive ? "Aktif" : "Pasif"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => { setDeleteId(c.id); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">Henüz kampanya yok</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
          <DialogHeader><DialogTitle>{editItem ? "Kampanya Düzenle" : "Yeni Kampanya"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Başlık</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div className="space-y-2"><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Açıklama</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} /></div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label>İndirim Tipi</Label>
                <Select value={form.discountType} onValueChange={(v) => setForm({ ...form, discountType: v as Campaign["discountType"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Yüzde</SelectItem>
                    <SelectItem value="fixed">Sabit TL</SelectItem>
                    <SelectItem value="free-service">Ücretsiz Hizmet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Değer</Label><Input type="number" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })} /></div>
              <div className="space-y-2"><Label>Görsel URL</Label><Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Başlangıç</Label><Input type="date" value={form.validFrom} onChange={(e) => setForm({ ...form, validFrom: e.target.value })} /></div>
              <div className="space-y-2"><Label>Bitiş</Label><Input type="date" value={form.validThrough} onChange={(e) => setForm({ ...form, validThrough: e.target.value })} /></div>
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
