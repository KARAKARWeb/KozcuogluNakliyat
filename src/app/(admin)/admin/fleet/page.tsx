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
import type { Vehicle } from "@/types";

export default function AdminFleetPage() {
  const [items, setItems] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<Vehicle | null>(null);
  const [form, setForm] = useState({ name: "", type: "", capacity: "", description: "", image: "", features: "", isActive: true });

  async function fetchData() { setLoading(true); const res = await fetch("/api/fleet"); const json = await res.json(); if (json.success) setItems(json.data); setLoading(false); }
  useEffect(() => { fetchData(); }, []);

  function openNew() { setEditItem(null); setForm({ name: "", type: "", capacity: "", description: "", image: "", features: "", isActive: true }); setDialogOpen(true); }
  function openEdit(item: Vehicle) { setEditItem(item); setForm({ name: item.name, type: item.type, capacity: item.capacity, description: item.description, image: item.image, features: item.features.join(", "), isActive: item.isActive }); setDialogOpen(true); }

  async function handleSave() {
    setSaving(true);
    const payload = { ...form, features: form.features.split(",").map((f) => f.trim()).filter(Boolean) };
    if (editItem) { await fetch(`/api/fleet/${editItem.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); }
    else { await fetch("/api/fleet", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); }
    setSaving(false); setDialogOpen(false); fetchData();
  }

  async function handleDelete() { setDeleteLoading(true); await fetch(`/api/fleet/${deleteId}`, { method: "DELETE" }); setDeleteLoading(false); setDeleteOpen(false); fetchData(); }

  return (
    <div className="space-y-6">
      <PageHeader title="Araç Filosu" description="Araç filonuzu yönetin" actionLabel="Araç Ekle" onAction={openNew} />
      {loading ? <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div> : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader><TableRow><TableHead>Ad</TableHead><TableHead>Tip</TableHead><TableHead>Kapasite</TableHead><TableHead>Durum</TableHead><TableHead className="text-right">İşlemler</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map((v) => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell>{v.type}</TableCell>
                  <TableCell>{v.capacity}</TableCell>
                  <TableCell><Badge variant={v.isActive ? "default" : "secondary"}>{v.isActive ? "Aktif" : "Pasif"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(v)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => { setDeleteId(v.id); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">Henüz araç yok</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editItem ? "Araç Düzenle" : "Yeni Araç"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Ad</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div className="space-y-2"><Label>Tip</Label><Input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} /></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Kapasite</Label><Input value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} /></div>
              <div className="space-y-2"><Label>Görsel URL</Label><Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Açıklama</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} /></div>
            <div className="space-y-2"><Label>Özellikler (virgül ile)</Label><Input value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} /></div>
            <div className="flex items-center gap-2"><Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} /><Label>Aktif</Label></div>
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>İptal</Button>
              <Button onClick={handleSave} disabled={saving || !form.name} className="bg-[#e3000f] hover:bg-[#c5000d]">{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}{editItem ? "Güncelle" : "Kaydet"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} loading={deleteLoading} />
    </div>
  );
}
