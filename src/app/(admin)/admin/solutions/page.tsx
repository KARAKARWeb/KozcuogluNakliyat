"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import PageHeader from "@/components/admin/page-header";
import DeleteDialog from "@/components/admin/delete-dialog";
import BulkActions from "@/components/admin/bulk-actions";
import SearchFilter from "@/components/admin/search-filter";
import ExportImport from "@/components/admin/export-import";
import { useBulkSelection } from "@/hooks/use-bulk-selection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, GripVertical, Loader2, ExternalLink } from "lucide-react";
import type { Solution } from "@/types";

export default function AdminSolutionsPage() {
  const [items, setItems] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = !statusFilter ||
        (statusFilter === "active" && item.isActive) ||
        (statusFilter === "inactive" && !item.isActive);
      
      return matchesSearch && matchesStatus;
    });
  }, [items, searchQuery, statusFilter]);

  const bulk = useBulkSelection(filteredItems);

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/solutions");
    const json = await res.json();
    if (json.success) setItems(json.data);
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  async function handleDragEnd() {
    if (dragItem.current === null || dragOverItem.current === null) return;
    if (dragItem.current === dragOverItem.current) return;
    const reordered = [...items];
    const [removed] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, removed);
    setItems(reordered);
    dragItem.current = null;
    dragOverItem.current = null;
    await fetch("/api/solutions/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds: reordered.map((s) => s.id) }),
    });
  }

  async function handleDelete() {
    setDeleteLoading(true);
    await fetch(`/api/solutions/${deleteId}`, { method: "DELETE" });
    setDeleteLoading(false);
    setDeleteOpen(false);
    fetchData();
  }

  async function handleBulkDelete() {
    if (!confirm(`${bulk.selectedCount} çözümü silmek istediğinize emin misiniz?`)) return;
    setDeleteLoading(true);
    for (const id of bulk.selectedIds) {
      await fetch(`/api/solutions/${id}`, { method: "DELETE" });
    }
    setDeleteLoading(false);
    bulk.clearSelection();
    fetchData();
  }

  async function handleBulkActivate() {
    setDeleteLoading(true);
    for (const id of bulk.selectedIds) {
      const solution = items.find(s => s.id === id);
      if (solution) {
        await fetch(`/api/solutions/${solution.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...solution, isActive: true })
        });
      }
    }
    setDeleteLoading(false);
    bulk.clearSelection();
    fetchData();
  }

  async function handleBulkDeactivate() {
    setDeleteLoading(true);
    for (const id of bulk.selectedIds) {
      const solution = items.find(s => s.id === id);
      if (solution) {
        await fetch(`/api/solutions/${solution.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...solution, isActive: false })
        });
      }
    }
    setDeleteLoading(false);
    bulk.clearSelection();
    fetchData();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Çözümler" description="Çözüm sayfalarını yönetin" actionLabel="Çözüm Ekle" actionHref="/admin/solutions/new" />
        <ExportImport
          data={filteredItems}
          filename="solutions"
          columns={[
            { key: "title", label: "Başlık" },
            { key: "slug", label: "Slug" },
            { key: "isActive", label: "Durum" },
          ]}
        />
      </div>
      <BulkActions
        selectedCount={bulk.selectedCount}
        onDelete={handleBulkDelete}
        onActivate={handleBulkActivate}
        onDeactivate={handleBulkDeactivate}
        onClearSelection={bulk.clearSelection}
      />
      <SearchFilter
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        statuses={[
          { value: "active", label: "Aktif" },
          { value: "inactive", label: "Pasif" },
        ]}
        placeholder="Çözümlerde ara..."
      />
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={bulk.isAllSelected}
                    onCheckedChange={bulk.toggleAll}
                    aria-label="Tümünü seç"
                  />
                </TableHead>
                <TableHead className="w-10" />
                <TableHead>Başlık</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Sıra</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((s, idx) => (
                <TableRow
                  key={s.id}
                  draggable
                  onDragStart={() => { dragItem.current = idx; }}
                  onDragEnter={() => { dragOverItem.current = idx; }}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className="cursor-move"
                >
                  <TableCell>
                    <Checkbox
                      checked={bulk.isSelected(s.id)}
                      onCheckedChange={() => bulk.toggleSelection(s.id)}
                      aria-label={`${s.title} seç`}
                    />
                  </TableCell>
                  <TableCell><GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" /></TableCell>
                  <TableCell className="font-medium">{s.title}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">/{s.slug}</TableCell>
                  <TableCell>{s.order}</TableCell>
                  <TableCell><Badge variant={s.isActive ? "default" : "secondary"}>{s.isActive ? "Aktif" : "Pasif"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/solutions/${s.id}`}>
                        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                      </Link>
                      <Link href={`/${s.slug}`} target="_blank">
                        <Button variant="ghost" size="icon"><ExternalLink className="h-4 w-4 text-muted-foreground" /></Button>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => { setDeleteId(s.id); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredItems.length === 0 && items.length > 0 && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">Sonuç bulunamadı</TableCell></TableRow>}
              {items.length === 0 && <TableRow><TableCell colSpan={7} className="py-8 text-center text-muted-foreground">Henüz çözüm yok</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} loading={deleteLoading} />
    </div>
  );
}
