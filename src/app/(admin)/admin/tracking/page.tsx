"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/admin/page-header";
import DeleteDialog from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Loader2, CheckCircle2, Circle } from "lucide-react";
import type { TrackingItem, TrackingStep } from "@/types";

const STEPS: { step: TrackingStep; label: string }[] = [
  { step: "request-received", label: "Talep Alındı" },
  { step: "survey-scheduled", label: "Keşif Planlandı" },
  { step: "survey-completed", label: "Keşif Tamamlandı" },
  { step: "contract-signed", label: "Sözleşme İmzalandı" },
  { step: "packing-started", label: "Paketleme Başladı" },
  { step: "loading-started", label: "Yükleme Başladı" },
  { step: "in-transit", label: "Yolda" },
  { step: "delivered", label: "Teslim Edildi" },
];

export default function AdminTrackingPage() {
  const [items, setItems] = useState<TrackingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<TrackingItem | null>(null);
  const [form, setForm] = useState({ customerName: "", customerPhone: "", serviceType: "", fromAddress: "", toAddress: "" });

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/tracking");
    const json = await res.json();
    if (json.success) setItems(json.data);
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  function openNew() {
    setSelected(null);
    setForm({ customerName: "", customerPhone: "", serviceType: "", fromAddress: "", toAddress: "" });
    setDialogOpen(true);
  }

  async function handleCreate() {
    setSaving(true);
    await fetch("/api/tracking", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setSaving(false); setDialogOpen(false); fetchData();
  }

  async function advanceStep(item: TrackingItem) {
    const currentIdx = STEPS.findIndex((s) => s.step === item.currentStep);
    if (currentIdx >= STEPS.length - 1) return;
    const nextStep = STEPS[currentIdx + 1];
    const events = [...item.events, { step: nextStep.step, label: nextStep.label, date: new Date().toISOString(), note: "", isCompleted: true }];
    await fetch(`/api/tracking/${item.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentStep: nextStep.step, events, status: nextStep.step === "delivered" ? "completed" : "active" }),
    });
    fetchData();
  }

  async function handleDelete() {
    setDeleteLoading(true);
    await fetch(`/api/tracking/${deleteId}`, { method: "DELETE" });
    setDeleteLoading(false); setDeleteOpen(false); fetchData();
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Taşıma Takip" description="Aktif taşımaları yönetin" actionLabel="Yeni Takip" onAction={openNew} />
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Takip Kodu</TableHead>
                <TableHead>Müşteri</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Adım</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono font-medium">{t.trackingCode}</TableCell>
                  <TableCell>{t.customerName}</TableCell>
                  <TableCell><Badge variant={t.status === "active" ? "default" : t.status === "completed" ? "secondary" : "destructive"}>{t.status === "active" ? "Aktif" : t.status === "completed" ? "Tamamlandı" : "İptal"}</Badge></TableCell>
                  <TableCell className="text-sm">{STEPS.find((s) => s.step === t.currentStep)?.label}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(t.createdAt).toLocaleDateString("tr-TR")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {t.status === "active" && t.currentStep !== "delivered" && (
                        <Button variant="ghost" size="sm" onClick={() => advanceStep(t)} className="text-xs">Sonraki Adım</Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => { setDeleteId(t.id); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">Henüz takip yok</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Yeni Taşıma Takip</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Müşteri Adı</Label><Input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} /></div>
              <div className="space-y-2"><Label>Telefon</Label><Input value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Hizmet Tipi</Label><Input value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Nereden</Label><Input value={form.fromAddress} onChange={(e) => setForm({ ...form, fromAddress: e.target.value })} /></div>
              <div className="space-y-2"><Label>Nereye</Label><Input value={form.toAddress} onChange={(e) => setForm({ ...form, toAddress: e.target.value })} /></div>
            </div>
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>İptal</Button>
              <Button onClick={handleCreate} disabled={saving || !form.customerName} className="bg-[#e3000f] hover:bg-[#c5000d]">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}Oluştur
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} loading={deleteLoading} />
    </div>
  );
}
