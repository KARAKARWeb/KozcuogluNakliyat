"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/admin/page-header";
import DeleteDialog from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Loader2, ArrowRight } from "lucide-react";
import type { Redirect, Log404 } from "@/types";

export default function AdminRedirectsPage() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [logs, setLogs] = useState<Log404[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteType, setDeleteType] = useState<"redirect" | "log">("redirect");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<Redirect | null>(null);
  const [form, setForm] = useState({ source: "", destination: "", type: "301" as "301" | "302", note: "" });
  const [selectedLogs, setSelectedLogs] = useState<Set<string>>(new Set());
  const [bulkRedirectOpen, setBulkRedirectOpen] = useState(false);
  const [bulkDestination, setBulkDestination] = useState("");

  async function fetchData() {
    setLoading(true);
    const [rRes, lRes] = await Promise.all([fetch("/api/redirects"), fetch("/api/404-logs")]);
    const rJson = await rRes.json();
    const lJson = await lRes.json();
    if (rJson.success) setRedirects(rJson.data);
    if (lJson.success) setLogs(lJson.data);
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  function openNew() { setEditItem(null); setForm({ source: "", destination: "", type: "301", note: "" }); setDialogOpen(true); }
  function openEdit(item: Redirect) { setEditItem(item); setForm({ source: item.source, destination: item.destination, type: item.type, note: item.note }); setDialogOpen(true); }
  function convertToRedirect(log: Log404) { setEditItem(null); setForm({ source: log.url, destination: "", type: "301", note: "404 logdan donusturuldu" }); setDialogOpen(true); }

  async function handleSave() {
    setSaving(true);
    if (editItem) { await fetch(`/api/redirects/${editItem.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); }
    else { await fetch("/api/redirects", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); }
    setSaving(false); setDialogOpen(false); fetchData();
  }

  async function handleDelete() {
    setDeleteLoading(true);
    if (deleteType === "redirect") { await fetch(`/api/redirects/${deleteId}`, { method: "DELETE" }); }
    else { await fetch(`/api/404-logs/${deleteId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "ignored" }) }); }
    setDeleteLoading(false); setDeleteOpen(false); fetchData();
  }

  async function bulkDeleteLogs() {
    const ids = logs.filter((l) => l.status === "ignored").map((l) => l.id);
    if (ids.length === 0) return;
    await fetch("/api/404-logs/bulk", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ids }) });
    fetchData();
  }

  function toggleLogSelection(id: string) {
    const newSet = new Set(selectedLogs);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedLogs(newSet);
  }

  function toggleAllLogs() {
    if (selectedLogs.size === logs.length) setSelectedLogs(new Set());
    else setSelectedLogs(new Set(logs.map(l => l.id)));
  }

  async function handleBulkRedirect() {
    if (!bulkDestination || selectedLogs.size === 0) return;
    setSaving(true);
    for (const logId of selectedLogs) {
      const log = logs.find(l => l.id === logId);
      if (log) {
        await fetch("/api/redirects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ source: log.url, destination: bulkDestination, type: "301", note: "Toplu yönlendirme" })
        });
      }
    }
    setSaving(false);
    setBulkRedirectOpen(false);
    setBulkDestination("");
    setSelectedLogs(new Set());
    fetchData();
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Redirects & 404" description="301 yönlendirmeleri ve 404 hatalarını yönetin" />

      <Tabs defaultValue="redirects" className="rounded-xl border bg-white p-5 shadow-sm">
        <TabsList>
          <TabsTrigger value="redirects">301 Yönlendirmeler ({redirects.length})</TabsTrigger>
          <TabsTrigger value="logs">404 Loglar ({logs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="redirects" className="pt-4">
          <div className="mb-4 flex justify-end">
            <Button onClick={openNew} className="bg-[#e3000f] hover:bg-[#c5000d]">Yönlendirme Ekle</Button>
          </div>
          {loading ? <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div> : (
            <Table>
              <TableHeader><TableRow><TableHead>Kaynak</TableHead><TableHead></TableHead><TableHead>Hedef</TableHead><TableHead>Tip</TableHead><TableHead>Hit</TableHead><TableHead className="text-right">İşlemler</TableHead></TableRow></TableHeader>
              <TableBody>
                {redirects.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-sm">{r.source}</TableCell>
                    <TableCell><ArrowRight className="h-4 w-4 text-muted-foreground" /></TableCell>
                    <TableCell className="font-mono text-sm">{r.destination}</TableCell>
                    <TableCell><Badge variant="outline">{r.type}</Badge></TableCell>
                    <TableCell className="text-sm">{r.hitCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(r)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => { setDeleteId(r.id); setDeleteType("redirect"); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {redirects.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">Henüz yönlendirme yok</TableCell></TableRow>}
              </TableBody>
            </Table>
          )}
        </TabsContent>

        <TabsContent value="logs" className="pt-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {selectedLogs.size > 0 && (
                <>
                  <span className="text-sm text-muted-foreground">{selectedLogs.size} seçildi</span>
                  <Button size="sm" onClick={() => setBulkRedirectOpen(true)} className="bg-[#e3000f] hover:bg-[#c5000d]">Toplu Yönlendir</Button>
                  <Button size="sm" variant="outline" onClick={() => setSelectedLogs(new Set())}>Seçimi Temizle</Button>
                </>
              )}
            </div>
            <Button variant="outline" onClick={bulkDeleteLogs}>Yoksayılanları Temizle</Button>
          </div>
          {loading ? <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" checked={selectedLogs.size === logs.length && logs.length > 0} onChange={toggleAllLogs} className="cursor-pointer" />
                  </TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Hit</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Son Görülme</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell>
                      <input type="checkbox" checked={selectedLogs.has(l.id)} onChange={() => toggleLogSelection(l.id)} className="cursor-pointer" />
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate font-mono text-sm">{l.url}</TableCell>
                    <TableCell>{l.hitCount}</TableCell>
                    <TableCell><Badge variant={l.status === "new" ? "default" : "secondary"}>{l.status === "new" ? "Yeni" : l.status === "ignored" ? "Yoksayıldı" : "Yönlendirildi"}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(l.lastSeen).toLocaleDateString("tr-TR")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => convertToRedirect(l)} className="text-xs">301 Yap</Button>
                        <Button variant="ghost" size="icon" onClick={() => { setDeleteId(l.id); setDeleteType("log"); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {logs.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">Henüz 404 logu yok</TableCell></TableRow>}
              </TableBody>
            </Table>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editItem ? "Yönlendirme Düzenle" : "Yeni Yönlendirme"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Kaynak URL</Label><Input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="/eski-sayfa" /></div>
            <div className="space-y-2"><Label>Hedef URL</Label><Input value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} placeholder="/yeni-sayfa" /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Tip</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as "301" | "302" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="301">301 (Kalıcı)</SelectItem><SelectItem value="302">302 (Geçici)</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Not</Label><Input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></div>
            </div>
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>İptal</Button>
              <Button onClick={handleSave} disabled={saving || !form.source || !form.destination} className="bg-[#e3000f] hover:bg-[#c5000d]">{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}{editItem ? "Güncelle" : "Kaydet"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={bulkRedirectOpen} onOpenChange={setBulkRedirectOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Toplu Yönlendirme ({selectedLogs.size} URL)</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Hedef URL</Label>
              <Input value={bulkDestination} onChange={(e) => setBulkDestination(e.target.value)} placeholder="/yeni-sayfa" />
              <p className="text-xs text-muted-foreground">Seçili tüm URL'ler bu hedefe yönlendirilecek</p>
            </div>
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setBulkRedirectOpen(false)}>İptal</Button>
              <Button onClick={handleBulkRedirect} disabled={saving || !bulkDestination} className="bg-[#e3000f] hover:bg-[#c5000d]">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Yönlendir
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} loading={deleteLoading} />
    </div>
  );
}
