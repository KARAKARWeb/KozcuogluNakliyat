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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import type { GalleryItem } from "@/types";

const MediaPicker = dynamic(() => import("@/components/admin/media-picker"), { ssr: false });

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [bulkSaving, setBulkSaving] = useState(false);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState({ title: "", type: "image" as "image" | "video", url: "", thumbnail: "", description: "", category: "", isActive: true });
  const [bulkUrls, setBulkUrls] = useState("");

  async function fetchData() { setLoading(true); const res = await fetch("/api/gallery"); const json = await res.json(); if (json.success) setItems(json.data); setLoading(false); }
  useEffect(() => { fetchData(); }, []);

  function openNew() { setEditItem(null); setForm({ title: "", type: "image", url: "", thumbnail: "", description: "", category: "", isActive: true }); setDialogOpen(true); }
  function openEdit(item: GalleryItem) { setEditItem(item); setForm({ title: item.title, type: item.type, url: item.url, thumbnail: item.thumbnail, description: item.description, category: item.category, isActive: item.isActive }); setDialogOpen(true); }

  async function handleSave() {
    setSaving(true);
    if (editItem) { await fetch(`/api/gallery/${editItem.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); }
    else { await fetch("/api/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); }
    setSaving(false); setDialogOpen(false); fetchData();
  }

  async function handleDelete() { setDeleteLoading(true); await fetch(`/api/gallery/${deleteId}`, { method: "DELETE" }); setDeleteLoading(false); setDeleteOpen(false); fetchData(); }

  async function handleBulkAdd() {
    if (!bulkUrls.trim()) return;
    setBulkSaving(true);
    const urls = bulkUrls.split('\n').filter(u => u.trim());
    for (const url of urls) {
      await fetch("/api/gallery", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ 
          title: url.split('/').pop()?.split('.')[0] || "Resim",
          type: "image",
          url: url.trim(),
          thumbnail: url.trim(),
          description: "",
          category: "",
          isActive: true
        }) 
      });
    }
    setBulkSaving(false);
    setBulkDialogOpen(false);
    setBulkUrls("");
    fetchData();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#122032]">Galeri</h1>
          <p className="mt-1 text-sm text-muted-foreground">Görsel ve video galerisini yönetin</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setBulkDialogOpen(true)} variant="outline">Toplu Ekle</Button>
          <Button onClick={openNew} className="bg-[#e3000f] hover:bg-[#c5000d]">Öğe Ekle</Button>
        </div>
      </div>
      {loading ? <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div> : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader><TableRow><TableHead>Başlık</TableHead><TableHead>Tip</TableHead><TableHead>Kategori</TableHead><TableHead>Durum</TableHead><TableHead className="text-right">İşlemler</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map((g) => (
                <TableRow key={g.id}>
                  <TableCell className="font-medium">{g.title || g.url}</TableCell>
                  <TableCell><Badge variant="outline">{g.type === "image" ? "Görsel" : "Video"}</Badge></TableCell>
                  <TableCell className="text-sm">{g.category || "-"}</TableCell>
                  <TableCell><Badge variant={g.isActive ? "default" : "secondary"}>{g.isActive ? "Aktif" : "Pasif"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(g)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => { setDeleteId(g.id); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && <TableRow><TableCell colSpan={5} className="py-8 text-center text-muted-foreground">Henüz galeri öğesi yok</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editItem ? "Öğe Düzenle" : "Yeni Öğe"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Başlık</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div className="space-y-2">
                <Label>Tip</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as "image" | "video" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="image">Görsel</SelectItem><SelectItem value="video">Video</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>URL</Label>
              <div className="flex gap-2">
                <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="Resim URL'si" />
                <MediaPicker value={form.url} onChange={(url: string) => setForm({ ...form, url })} label="" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Thumbnail URL</Label>
              <div className="flex gap-2">
                <Input value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} placeholder="Thumbnail URL'si" />
                <MediaPicker value={form.thumbnail} onChange={(url: string) => setForm({ ...form, thumbnail: url })} label="" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Açıklama</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="space-y-2"><Label>Kategori</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
            </div>
            <div className="flex items-center gap-2"><Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} /><Label>Aktif</Label></div>
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>İptal</Button>
              <Button onClick={handleSave} disabled={saving} className="bg-[#e3000f] hover:bg-[#c5000d]">{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}{editItem ? "Güncelle" : "Kaydet"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} loading={deleteLoading} />
      
      {/* Toplu Ekleme Dialog */}
      <Dialog open={bulkDialogOpen} onOpenChange={setBulkDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Toplu Resim Ekle</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Resim URL'leri (Her satıra bir URL)</Label>
              <textarea
                value={bulkUrls}
                onChange={(e) => setBulkUrls(e.target.value)}
                placeholder="/uploads/gallery/resim1.jpg&#10;/uploads/gallery/resim2.jpg&#10;/uploads/gallery/resim3.jpg"
                rows={10}
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-[#e3000f] focus:outline-none focus:ring-1 focus:ring-[#e3000f]"
              />
              <p className="text-xs text-muted-foreground">
                Medya kütüphanesinden seçmek için aşağıdaki butonu kullanın veya URL'leri manuel olarak girin
              </p>
            </div>
            
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="mb-2 text-sm font-medium text-blue-900">Medya Kütüphanesinden Seç</p>
              <MediaPicker 
                value="" 
                onChange={(url: string) => {
                  setBulkUrls(prev => prev ? `${prev}\n${url}` : url);
                }} 
                label="Resim Seç ve Ekle" 
              />
              <p className="mt-2 text-xs text-blue-700">
                Her seçtiğiniz resim listeye eklenecektir. İstediğiniz kadar resim seçebilirsiniz.
              </p>
            </div>

            {bulkUrls && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                <p className="text-sm font-medium text-green-900">
                  {bulkUrls.split('\n').filter(u => u.trim()).length} resim eklenecek
                </p>
              </div>
            )}

            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => { setBulkDialogOpen(false); setBulkUrls(""); }}>İptal</Button>
              <Button 
                onClick={handleBulkAdd} 
                disabled={bulkSaving || !bulkUrls.trim()} 
                className="bg-[#e3000f] hover:bg-[#c5000d]"
              >
                {bulkSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {bulkSaving ? "Ekleniyor..." : "Toplu Ekle"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
