"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import PageHeader from "@/components/admin/page-header";
import DeleteDialog from "@/components/admin/delete-dialog";
import BulkActions from "@/components/admin/bulk-actions";
import SearchFilter from "@/components/admin/search-filter";
import ExportImport from "@/components/admin/export-import";
import { useBulkSelection } from "@/hooks/use-bulk-selection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Loader2, ExternalLink } from "lucide-react";
import type { Region } from "@/types";

export default function AdminRegionsPage() {
  const [items, setItems] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !categoryFilter || item.type === categoryFilter;
      const matchesStatus = !statusFilter ||
        (statusFilter === "active" && item.isActive) ||
        (statusFilter === "inactive" && !item.isActive);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, searchQuery, categoryFilter, statusFilter]);

  const bulk = useBulkSelection(filteredItems);

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/regions");
    const json = await res.json();
    if (json.success) setItems(json.data);
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  async function handleDelete() {
    setDeleteLoading(true);
    await fetch(`/api/regions/${deleteId}`, { method: "DELETE" });
    setDeleteLoading(false); setDeleteOpen(false); fetchData();
  }

  async function handleBulkDelete() {
    if (!confirm(`${bulk.selectedCount} bölgeyi silmek istediğinize emin misiniz?`)) return;
    setDeleteLoading(true);
    for (const id of bulk.selectedIds) {
      await fetch(`/api/regions/${id}`, { method: "DELETE" });
    }
    setDeleteLoading(false);
    bulk.clearSelection();
    fetchData();
  }

  async function handleBulkActivate() {
    setDeleteLoading(true);
    for (const id of bulk.selectedIds) {
      const region = items.find(r => r.id === id);
      if (region) {
        await fetch(`/api/regions/${region.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...region, isActive: true })
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
      const region = items.find(r => r.id === id);
      if (region) {
        await fetch(`/api/regions/${region.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...region, isActive: false })
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
        <PageHeader title="Hizmet Bölgeleri" description="Bölge sayfalarını yönetin" actionLabel="Bölge Ekle" actionHref="/admin/regions/new" />
        <ExportImport
          data={filteredItems}
          filename="regions"
          columns={[
            { key: "title", label: "Başlık" },
            { key: "district", label: "İlçe" },
            { key: "type", label: "Tip" },
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
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        categories={[
          { value: "district", label: "İlçe" },
          { value: "intercity", label: "Şehirler Arası" },
        ]}
        statuses={[
          { value: "active", label: "Aktif" },
          { value: "inactive", label: "Pasif" },
        ]}
        placeholder="Bölgelerde ara..."
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
                <TableHead>Başlık</TableHead>
                <TableHead>İlçe</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <Checkbox
                      checked={bulk.isSelected(r.id)}
                      onCheckedChange={() => bulk.toggleSelection(r.id)}
                      aria-label={`${r.title} seç`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{r.title}</TableCell>
                  <TableCell>{r.district}</TableCell>
                  <TableCell><Badge variant="outline">{r.type === "district" ? "İlçe" : "Şehirler Arası"}</Badge></TableCell>
                  <TableCell><Badge variant={r.isActive ? "default" : "secondary"}>{r.isActive ? "Aktif" : "Pasif"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/regions/${r.id}`}>
                        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                      </Link>
                      <Link href={`/${r.slug}.html`} target="_blank">
                        <Button variant="ghost" size="icon"><ExternalLink className="h-4 w-4 text-muted-foreground" /></Button>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => { setDeleteId(r.id); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredItems.length === 0 && items.length > 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">Sonuç bulunamadı</TableCell></TableRow>}
              {items.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">Henüz bölge eklenmemiş</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} loading={deleteLoading} />
    </div>
  );
}
