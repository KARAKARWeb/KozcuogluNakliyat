"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/admin/page-header";
import DeleteDialog from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Eye, Trash2, Loader2, MessageCircle } from "lucide-react";
import type { SurveyRequest } from "@/types";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: "Yeni", color: "bg-yellow-100 text-yellow-800" },
  contacted: { label: "İletişim Kuruldu", color: "bg-blue-100 text-blue-800" },
  scheduled: { label: "Keşif Planlandı", color: "bg-purple-100 text-purple-800" },
  completed: { label: "Tamamlandı", color: "bg-green-100 text-green-800" },
  cancelled: { label: "İptal", color: "bg-red-100 text-red-800" },
};

export default function AdminSurveysPage() {
  const [items, setItems] = useState<SurveyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<SurveyRequest | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [adminNote, setAdminNote] = useState("");

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/surveys");
    const json = await res.json();
    if (json.success) setItems(json.data);
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  function openDetail(item: SurveyRequest) {
    setSelected(item);
    setAdminNote(item.adminNote);
    setDetailOpen(true);
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/surveys/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, adminNote }) });
    fetchData();
  }

  async function handleDelete() {
    setDeleteLoading(true);
    await fetch(`/api/surveys/${deleteId}`, { method: "DELETE" });
    setDeleteLoading(false); setDeleteOpen(false); fetchData();
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Keşif Talepleri" description="Müşteri keşif taleplerini yönetin" />
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Nereden</TableHead>
                <TableHead>Nereye</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.phone}</TableCell>
                  <TableCell className="max-w-[120px] truncate text-sm">{s.fromAddress || "-"}</TableCell>
                  <TableCell className="max-w-[120px] truncate text-sm">{s.toAddress || "-"}</TableCell>
                  <TableCell><Badge className={STATUS_MAP[s.status]?.color}>{STATUS_MAP[s.status]?.label}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(s.createdAt).toLocaleDateString("tr-TR")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openDetail(s)}><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" asChild>
                        <a href={`https://wa.me/90${s.phone.replace(/\D/g, "")}?text=Merhaba ${s.name}, keşif talebiniz hakkında bilgi vermek istiyoruz.`} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="h-4 w-4 text-green-600" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => { setDeleteId(s.id); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">Henüz keşif talebi yok</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Keşif Talebi Detayı</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <div><span className="text-sm font-medium">Ad:</span> <span className="text-sm">{selected.name}</span></div>
                <div><span className="text-sm font-medium">Telefon:</span> <span className="text-sm">{selected.phone}</span></div>
                <div><span className="text-sm font-medium">E-Posta:</span> <span className="text-sm">{selected.email || "-"}</span></div>
                <div><span className="text-sm font-medium">Hizmet:</span> <span className="text-sm">{selected.serviceType || "-"}</span></div>
                <div><span className="text-sm font-medium">Nereden:</span> <span className="text-sm">{selected.fromAddress || "-"}</span></div>
                <div><span className="text-sm font-medium">Nereye:</span> <span className="text-sm">{selected.toAddress || "-"}</span></div>
              </div>
              {selected.note && <div className="border-t pt-2"><span className="text-sm font-medium">Not:</span> <p className="text-sm">{selected.note}</p></div>}
              <div className="border-t pt-3 space-y-2">
                <Label>Durum</Label>
                <Select value={selected.status} onValueChange={(v) => { setSelected({ ...selected, status: v as SurveyRequest["status"] }); updateStatus(selected.id, v); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATUS_MAP).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Admin Notu</Label>
                <Textarea value={adminNote} onChange={(e) => setAdminNote(e.target.value)} rows={2} />
                <Button size="sm" onClick={() => updateStatus(selected.id, selected.status)} className="bg-[#e3000f] hover:bg-[#c5000d]">Notu Kaydet</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} loading={deleteLoading} />
    </div>
  );
}
