"use client";

import { useState, useEffect } from "react";
import PageHeader from "@/components/admin/page-header";
import DeleteDialog from "@/components/admin/delete-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Trash2, Loader2 } from "lucide-react";
import type { Message } from "@/types";

export default function AdminMessagesPage() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<Message | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/messages");
    const json = await res.json();
    if (json.success) setItems(json.data);
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  async function openDetail(msg: Message) {
    setSelected(msg);
    setDetailOpen(true);
    if (msg.status === "unread") {
      await fetch(`/api/messages/${msg.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: "read" }) });
      fetchData();
    }
  }

  async function handleDelete() {
    setDeleteLoading(true);
    await fetch(`/api/messages/${deleteId}`, { method: "DELETE" });
    setDeleteLoading(false); setDeleteOpen(false); fetchData();
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Mesajlar" description="İletişim formu mesajlarını yönetin" />
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad</TableHead>
                <TableHead>E-Posta</TableHead>
                <TableHead>Konu</TableHead>
                <TableHead>Kaynak</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((m) => (
                <TableRow key={m.id} className={m.status === "unread" ? "bg-blue-50/50" : ""}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell className="text-sm">{m.email}</TableCell>
                  <TableCell className="max-w-[150px] truncate text-sm">{m.subject}</TableCell>
                  <TableCell><Badge variant="outline">{m.source}</Badge></TableCell>
                  <TableCell>
                    <Badge variant={m.status === "unread" ? "default" : "secondary"}>
                      {m.status === "unread" ? "Yeni" : m.status === "read" ? "Okundu" : m.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(m.createdAt).toLocaleDateString("tr-TR")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openDetail(m)}><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => { setDeleteId(m.id); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">Henüz mesaj yok</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Mesaj Detayı</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-3">
              <div><span className="text-sm font-medium">Ad:</span> <span className="text-sm">{selected.name}</span></div>
              <div><span className="text-sm font-medium">E-Posta:</span> <span className="text-sm">{selected.email}</span></div>
              <div><span className="text-sm font-medium">Telefon:</span> <span className="text-sm">{selected.phone || "-"}</span></div>
              <div><span className="text-sm font-medium">Konu:</span> <span className="text-sm">{selected.subject}</span></div>
              <div className="border-t pt-3">
                <p className="text-sm font-medium">Mesaj:</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-muted-foreground">{selected.message}</p>
              </div>
              {selected.adminNote && selected.adminNote.startsWith('data:image') && (
                <div className="border-t pt-3">
                  <p className="text-sm font-medium mb-2">Ekran Görüntüsü:</p>
                  <img 
                    src={selected.adminNote} 
                    alt="Screenshot" 
                    className="w-full rounded-lg border"
                  />
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                {new Date(selected.createdAt).toLocaleString("tr-TR")}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} loading={deleteLoading} />
    </div>
  );
}
