"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/admin/page-header";
import DeleteDialog from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Trash2, Loader2, Star } from "lucide-react";
import type { Review } from "@/types";

export default function AdminReviewsPage() {
  const [items, setItems] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/reviews");
    const json = await res.json();
    if (json.success) setItems(json.data);
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  function toggleSelect(id: string) {
    const s = new Set(selected);
    if (s.has(id)) s.delete(id); else s.add(id);
    setSelected(s);
  }

  function toggleAll() {
    if (selected.size === items.length) setSelected(new Set());
    else setSelected(new Set(items.map((r) => r.id)));
  }

  async function bulkApprove() {
    for (const id of selected) {
      await fetch(`/api/reviews/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "approved" }) });
    }
    setSelected(new Set()); fetchData();
  }

  async function bulkDelete() {
    for (const id of selected) {
      await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    }
    setSelected(new Set()); fetchData();
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/reviews/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    fetchData();
  }

  async function handleDelete() {
    setDeleteLoading(true);
    await fetch(`/api/reviews/${deleteId}`, { method: "DELETE" });
    setDeleteLoading(false); setDeleteOpen(false); fetchData();
  }

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  const statusLabels: Record<string, string> = { pending: "Bekliyor", approved: "Onaylandi", rejected: "Reddedildi" };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Yorumlar" description="Müşteri yorumlarını yönetin" />
        {selected.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{selected.size} secili</span>
            <Button size="sm" variant="outline" onClick={bulkApprove}><Check className="mr-1 h-3 w-3" />Toplu Onayla</Button>
            <Button size="sm" variant="destructive" onClick={bulkDelete}><Trash2 className="mr-1 h-3 w-3" />Toplu Sil</Button>
          </div>
        )}
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><Checkbox checked={items.length > 0 && selected.size === items.length} onCheckedChange={toggleAll} /></TableHead>
                <TableHead>Ad</TableHead>
                <TableHead>Puan</TableHead>
                <TableHead>Yorum</TableHead>
                <TableHead>Sayfa</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((r) => (
                <TableRow key={r.id} className={selected.has(r.id) ? "bg-blue-50/50" : ""}>
                  <TableCell><Checkbox checked={selected.has(r.id)} onCheckedChange={() => toggleSelect(r.id)} /></TableCell>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm">{r.comment}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.pageSlug || "-"}</TableCell>
                  <TableCell><Badge className={statusColors[r.status]}>{statusLabels[r.status]}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(r.createdAt).toLocaleDateString("tr-TR")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      {r.status !== "approved" && (
                        <Button variant="ghost" size="icon" onClick={() => updateStatus(r.id, "approved")} title="Onayla">
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                      )}
                      {r.status !== "rejected" && (
                        <Button variant="ghost" size="icon" onClick={() => updateStatus(r.id, "rejected")} title="Reddet">
                          <X className="h-4 w-4 text-orange-500" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => { setDeleteId(r.id); setDeleteOpen(true); }}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && <TableRow><TableCell colSpan={8} className="py-8 text-center text-muted-foreground">Henüz yorum yok</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} loading={deleteLoading} />
    </div>
  );
}
