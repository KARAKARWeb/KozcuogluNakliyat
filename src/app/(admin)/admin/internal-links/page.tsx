"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/admin/page-header";
import DeleteDialog from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Loader2, Play, RotateCcw } from "lucide-react";
import type { InternalLink } from "@/types";

export default function AdminInternalLinksPage() {
  const [items, setItems] = useState<InternalLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<InternalLink | null>(null);
  const [form, setForm] = useState({ keyword: "", targetUrl: "", maxLinks: 3, style: "text" as "text" | "bold" | "underline", isActive: true });
  const [executing, setExecuting] = useState(false);

  async function fetchData() { setLoading(true); const res = await fetch("/api/internal-links"); const json = await res.json(); if (json.success) setItems(json.data); setLoading(false); }
  useEffect(() => { fetchData(); }, []);

  function openNew() { setEditItem(null); setForm({ keyword: "", targetUrl: "", maxLinks: 3, style: "text", isActive: true }); setDialogOpen(true); }
  function openEdit(item: InternalLink) { setEditItem(item); setForm({ keyword: item.keyword, targetUrl: item.targetUrl, maxLinks: item.maxLinks, style: item.style, isActive: item.isActive }); setDialogOpen(true); }

  async function handleSave() {
    setSaving(true);
    if (editItem) { await fetch(`/api/internal-links/${editItem.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); }
    else { await fetch("/api/internal-links", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); }
    setSaving(false); setDialogOpen(false); fetchData();
  }

  async function handleDelete() { setDeleteLoading(true); await fetch(`/api/internal-links/${deleteId}`, { method: "DELETE" }); setDeleteLoading(false); setDeleteOpen(false); fetchData(); }

  async function handleExecute() { setExecuting(true); await fetch("/api/internal-links/execute", { method: "POST" }); setExecuting(false); }
  async function handleRollback() { setExecuting(true); await fetch("/api/internal-links/rollback", { method: "POST" }); setExecuting(false); }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="İç Linkleme" description="Otomatik iç linkleme kurallarını yönetin" actionLabel="Kural Ekle" onAction={openNew} />
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExecute} disabled={executing}>{executing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Play className="mr-2 h-4 w-4" />}Başlat</Button>
          <Button variant="outline" onClick={handleRollback} disabled={executing}><RotateCcw className="mr-2 h-4 w-4" />Geri Al</Button>
        </div>
      </div>
      {loading ? <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div> : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader><TableRow><TableHead>Anahtar Kelime</TableHead><TableHead>Hedef URL</TableHead><TableHead>Max Link</TableHead><TableHead>Stil</TableHead><TableHead>Durum</TableHead><TableHead className="text-right">İşlemler</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">{l.keyword}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{l.targetUrl}</TableCell>
                  <TableCell>{l.maxLinks}</TableCell>
                  <TableCell><Badge variant="outline">{l.style}</Badge></TableCell>
                  <TableCell><Badge variant={l.isActive ? "default" : "secondary"}>{l.isActive ? "Aktif" : "Pasif"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(l)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => { setDeleteId(l.id); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">Henüz kural yok</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editItem ? "Kural Düzenle" : "Yeni Kural"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Anahtar Kelime</Label><Input value={form.keyword} onChange={(e) => setForm({ ...form, keyword: e.target.value })} placeholder="evden eve nakliyat" /></div>
            <div className="space-y-2"><Label>Hedef URL</Label><Input value={form.targetUrl} onChange={(e) => setForm({ ...form, targetUrl: e.target.value })} placeholder="/evden-eve-nakliyat" /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Max Link</Label><Input type="number" min={1} max={10} value={form.maxLinks} onChange={(e) => setForm({ ...form, maxLinks: Number(e.target.value) })} /></div>
              <div className="space-y-2">
                <Label>Stil</Label>
                <Select value={form.style} onValueChange={(v) => setForm({ ...form, style: v as "text" | "bold" | "underline" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="text">Normal</SelectItem><SelectItem value="bold">Kalın</SelectItem><SelectItem value="underline">Altçizgili</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2"><Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} /><Label>Aktif</Label></div>
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>İptal</Button>
              <Button onClick={handleSave} disabled={saving || !form.keyword} className="bg-[#e3000f] hover:bg-[#c5000d]">{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}{editItem ? "Güncelle" : "Kaydet"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} loading={deleteLoading} />
    </div>
  );
}
