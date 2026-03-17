"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/admin/page-header";
import DeleteDialog from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import type { Client } from "@/types";

const MediaPicker = dynamic(() => import("@/components/admin/media-picker"), { ssr: false });

export default function AdminClientsPage() {
  const [items, setItems] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<Client | null>(null);
  const [form, setForm] = useState({ name: "", logo: "", website: "", isActive: true });

  async function fetchData() { setLoading(true); const res = await fetch("/api/clients"); const json = await res.json(); if (json.success) setItems(json.data); setLoading(false); }
  useEffect(() => { fetchData(); }, []);

  function openNew() { setEditItem(null); setForm({ name: "", logo: "", website: "", isActive: true }); setDialogOpen(true); }
  function openEdit(item: Client) { setEditItem(item); setForm({ name: item.name, logo: item.logo, website: item.website, isActive: item.isActive }); setDialogOpen(true); }

  async function handleSave() {
    setSaving(true);
    if (editItem) { await fetch(`/api/clients/${editItem.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); }
    else { await fetch("/api/clients", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); }
    setSaving(false); setDialogOpen(false); fetchData();
  }

  async function handleDelete() { setDeleteLoading(true); await fetch(`/api/clients/${deleteId}`, { method: "DELETE" }); setDeleteLoading(false); setDeleteOpen(false); fetchData(); }

  return (
    <div className="space-y-6">
      <PageHeader title="Müşteri Logoları" description="Referans müşteri logolarını yönetin" actionLabel="Logo Ekle" onAction={openNew} />
      {loading ? <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div> : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader><TableRow><TableHead>Firma</TableHead><TableHead>Website</TableHead><TableHead>Durum</TableHead><TableHead className="text-right">İşlemler</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{c.website || "-"}</TableCell>
                  <TableCell><Badge variant={c.isActive ? "default" : "secondary"}>{c.isActive ? "Aktif" : "Pasif"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(c)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => { setDeleteId(c.id); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && <TableRow><TableCell colSpan={4} className="py-8 text-center text-muted-foreground">Henüz müşteri logosu yok</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editItem ? "Logo Düzenle" : "Yeni Logo"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Firma Adı</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="space-y-2">
              <Label>Logo URL</Label>
              <div className="flex gap-2">
                <Input value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} placeholder="Logo URL'si" />
                <MediaPicker value={form.logo} onChange={(url: string) => setForm({ ...form, logo: url })} label="" />
              </div>
            </div>
            <div className="space-y-2"><Label>Website</Label><Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></div>
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
