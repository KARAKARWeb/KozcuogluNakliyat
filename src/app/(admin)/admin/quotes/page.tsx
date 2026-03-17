"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/admin/page-header";
import DeleteDialog from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Trash2, Loader2, Phone, Mail, MapPin, Home, Package, Clock, StickyNote } from "lucide-react";
import type { Quote } from "@/types";

const HIZMET_MAP: Record<string, string> = {
  "evden-eve": "Evden Eve Nakliyat",
  "ofis": "Ofis Taşıma",
  "villa": "Villa Taşıma",
  "parca": "Parça Eşya Taşıma",
  "depolama": "Eşya Depolama",
  "sehirlerarasi": "Şehirler Arası Nakliyat",
};

const STATUS_MAP: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  new: { label: "Yeni", variant: "default" },
  read: { label: "Okundu", variant: "secondary" },
  replied: { label: "Yanıtlandı", variant: "outline" },
  archived: { label: "Arşiv", variant: "secondary" },
};

export default function AdminQuotesPage() {
  const [items, setItems] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<Quote | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("all");

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/quotes");
    const json = await res.json();
    if (json.success) setItems(json.data);
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  async function openDetail(q: Quote) {
    setSelected(q);
    setNoteText(q.adminNote || "");
    setDetailOpen(true);
    if (q.status === "new") {
      await fetch(`/api/quotes/${q.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "read" }),
      });
      fetchData();
    }
  }

  async function updateStatus(id: string, status: string) {
    setSaving(true);
    await fetch(`/api/quotes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setSaving(false);
    fetchData();
  }

  async function saveNote() {
    if (!selected) return;
    setSaving(true);
    await fetch(`/api/quotes/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminNote: noteText }),
    });
    setSaving(false);
    fetchData();
  }

  async function handleDelete() {
    setDeleteLoading(true);
    await fetch(`/api/quotes/${deleteId}`, { method: "DELETE" });
    setDeleteLoading(false);
    setDeleteOpen(false);
    setDetailOpen(false);
    fetchData();
  }

  const filtered = filter === "all" ? items : items.filter((q) => q.status === filter);
  const newCount = items.filter((q) => q.status === "new").length;

  return (
    <div className="space-y-6">
      <PageHeader title="Teklifler" description="Teklif taleplerini yönetin">
        <div className="flex items-center gap-2">
          {newCount > 0 && (
            <Badge variant="default" className="bg-[#e3000f]">{newCount} Yeni</Badge>
          )}
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü ({items.length})</SelectItem>
              <SelectItem value="new">Yeni ({items.filter((q) => q.status === "new").length})</SelectItem>
              <SelectItem value="read">Okundu ({items.filter((q) => q.status === "read").length})</SelectItem>
              <SelectItem value="replied">Yanıtlandı ({items.filter((q) => q.status === "replied").length})</SelectItem>
              <SelectItem value="archived">Arşiv ({items.filter((q) => q.status === "archived").length})</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </PageHeader>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Hizmet</TableHead>
                <TableHead>Güzergah</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((q) => {
                const st = STATUS_MAP[q.status] || STATUS_MAP.new;
                return (
                  <TableRow key={q.id} className={q.status === "new" ? "bg-blue-50/50" : ""}>
                    <TableCell className="font-medium">{q.ad}</TableCell>
                    <TableCell className="text-sm">{q.telefon}</TableCell>
                    <TableCell><Badge variant="outline">{HIZMET_MAP[q.hizmetTipi] || q.hizmetTipi}</Badge></TableCell>
                    <TableCell className="max-w-[180px] truncate text-sm text-muted-foreground">
                      {q.cikisIl}{q.cikisIlce ? `/${q.cikisIlce}` : ""} → {q.hizmetTipi === "depolama" ? (q.depoYaka || "Depo") : `${q.varisIl}${q.varisIlce ? `/${q.varisIlce}` : ""}`}
                    </TableCell>
                    <TableCell><Badge variant={st.variant}>{st.label}</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(q.createdAt).toLocaleDateString("tr-TR")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openDetail(q)}><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => { setDeleteId(q.id); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">Henüz teklif talebi yok</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Teklif Detayı</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Kişi Bilgileri */}
              <div className="rounded-lg border bg-gray-50 p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm"><Phone className="h-3.5 w-3.5 text-muted-foreground" /> <span className="font-medium">{selected.ad}</span> — {selected.telefon}</div>
                {selected.email && <div className="flex items-center gap-2 text-sm"><Mail className="h-3.5 w-3.5 text-muted-foreground" /> {selected.email}</div>}
                {selected.tercihTarih && <div className="flex items-center gap-2 text-sm"><Clock className="h-3.5 w-3.5 text-muted-foreground" /> Tercih: {selected.tercihTarih}</div>}
              </div>

              {/* Hizmet */}
              <div className="rounded-lg border p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold"><Package className="h-4 w-4 text-[#e3000f]" /> {HIZMET_MAP[selected.hizmetTipi] || selected.hizmetTipi}</div>
                {selected.evTipi && <div className="flex items-center gap-2 text-sm"><Home className="h-3.5 w-3.5 text-muted-foreground" /> Ev Tipi: {selected.evTipi}</div>}
              </div>

              {/* Adres */}
              <div className="rounded-lg border p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#e3000f]">Çıkış</p>
                <div className="flex items-start gap-2 text-sm"><MapPin className="mt-0.5 h-3.5 w-3.5 text-muted-foreground shrink-0" /> {selected.cikisIl}{selected.cikisIlce ? `/${selected.cikisIlce}` : ""} {selected.cikisAdres}</div>
                {selected.cikisKat && <p className="text-sm text-muted-foreground">Kat: {selected.cikisKat} | Asansör: {selected.cikisAsansor}</p>}

                {selected.hizmetTipi === "depolama" ? (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 pt-2">Depo</p>
                    {selected.depoYaka && <p className="text-sm">{selected.depoYaka}</p>}
                    {selected.depoEsyaTipi && <p className="text-sm">Eşya: {selected.depoEsyaTipi}</p>}
                    {selected.depoSure && <p className="text-sm">Süre: {selected.depoSure}</p>}
                    {selected.depoAmbalaj && <p className="text-sm">Ambalaj: {selected.depoAmbalaj}</p>}
                    {selected.depoNakliye && <p className="text-sm">Nakliye: {selected.depoNakliye}</p>}
                  </>
                ) : (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-wider text-green-600 pt-2">Varış</p>
                    <div className="flex items-start gap-2 text-sm"><MapPin className="mt-0.5 h-3.5 w-3.5 text-muted-foreground shrink-0" /> {selected.varisIl}{selected.varisIlce ? `/${selected.varisIlce}` : ""} {selected.varisAdres}</div>
                    {selected.varisKat && <p className="text-sm text-muted-foreground">Kat: {selected.varisKat} | Asansör: {selected.varisAsansor}</p>}
                    {selected.asansorIhtiyac === "Evet" && <p className="text-sm text-[#e3000f]">Asansörlü taşıma isteniyor</p>}
                  </>
                )}
              </div>

              {/* Eşya & Notlar */}
              {(selected.esyaListesi || selected.ozelNotlar) && (
                <div className="rounded-lg border p-4 space-y-2">
                  {selected.esyaListesi && <div><p className="text-xs font-semibold text-muted-foreground">Özel Eşyalar</p><p className="text-sm">{selected.esyaListesi}</p></div>}
                  {selected.ozelNotlar && <div><p className="text-xs font-semibold text-muted-foreground">Notlar</p><p className="text-sm">{selected.ozelNotlar}</p></div>}
                </div>
              )}

              {/* Durum & Admin Notu */}
              <div className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Durum:</span>
                  <Select value={selected.status} onValueChange={(v) => { updateStatus(selected.id, v); setSelected({ ...selected, status: v as Quote["status"] }); }}>
                    <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Yeni</SelectItem>
                      <SelectItem value="read">Okundu</SelectItem>
                      <SelectItem value="replied">Yanıtlandı</SelectItem>
                      <SelectItem value="archived">Arşiv</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2"><StickyNote className="h-3.5 w-3.5 text-muted-foreground" /><span className="text-sm font-medium">Admin Notu</span></div>
                  <Textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} rows={2} placeholder="İç not ekleyin..." />
                  <Button size="sm" onClick={saveNote} disabled={saving}>{saving ? "Kaydediliyor..." : "Notu Kaydet"}</Button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">{new Date(selected.createdAt).toLocaleString("tr-TR")}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} loading={deleteLoading} />
    </div>
  );
}
