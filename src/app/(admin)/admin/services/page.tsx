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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, GripVertical, Loader2, ExternalLink } from "lucide-react";
import type { Service, Settings } from "@/types";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = !searchQuery ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.slug.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !categoryFilter || service.category === categoryFilter;
      const matchesStatus = !statusFilter ||
        (statusFilter === "active" && service.isActive) ||
        (statusFilter === "inactive" && !service.isActive);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [services, searchQuery, categoryFilter, statusFilter]);

  const bulk = useBulkSelection(filteredServices);

  async function fetchServices() {
    setLoading(true);
    const res = await fetch("/api/services");
    const json = await res.json();
    if (json.success) setServices(json.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchServices();
    fetch("/api/settings").then((r) => r.json()).then((j) => {
      if (j.success && j.data?.serviceCategories) setCategories(j.data.serviceCategories);
    });
  }, []);

  async function handleDragEnd() {
    if (dragItem.current === null || dragOverItem.current === null) return;
    if (dragItem.current === dragOverItem.current) return;
    const reordered = [...services];
    const [removed] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOverItem.current, 0, removed);
    setServices(reordered);
    dragItem.current = null;
    dragOverItem.current = null;
    await fetch("/api/services/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds: reordered.map((s) => s.id) }),
    });
  }

  async function handleDelete() {
    setDeleteLoading(true);
    await fetch(`/api/services/${deleteId}/update`, { method: "DELETE" });
    setDeleteLoading(false);
    setDeleteOpen(false);
    fetchServices();
  }

  async function handleBulkDelete() {
    if (!confirm(`${bulk.selectedCount} hizmeti silmek istediğinize emin misiniz?`)) return;
    setDeleteLoading(true);
    for (const id of bulk.selectedIds) {
      await fetch(`/api/services/${id}/update`, { method: "DELETE" });
    }
    setDeleteLoading(false);
    bulk.clearSelection();
    fetchServices();
  }

  async function handleBulkActivate() {
    setDeleteLoading(true);
    for (const id of bulk.selectedIds) {
      const service = services.find(s => s.id === id);
      if (service) {
        await fetch(`/api/services/${service.slug}/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...service, isActive: true })
        });
      }
    }
    setDeleteLoading(false);
    bulk.clearSelection();
    fetchServices();
  }

  async function handleBulkDeactivate() {
    setDeleteLoading(true);
    for (const id of bulk.selectedIds) {
      const service = services.find(s => s.id === id);
      if (service) {
        await fetch(`/api/services/${service.slug}/update`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...service, isActive: false })
        });
      }
    }
    setDeleteLoading(false);
    bulk.clearSelection();
    fetchServices();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Hizmetler" description="Hizmet sayfalarını yönetin" actionLabel="Hizmet Ekle" actionHref="/admin/services/new" />
        <ExportImport
          data={filteredServices}
          filename="services"
          columns={[
            { key: "title", label: "Başlık" },
            { key: "slug", label: "Slug" },
            { key: "category", label: "Kategori" },
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
          { value: "bireysel", label: "Bireysel" },
          { value: "kurumsal", label: "Kurumsal" },
        ]}
        statuses={[
          { value: "active", label: "Aktif" },
          { value: "inactive", label: "Pasif" },
        ]}
        placeholder="Hizmetlerde ara..."
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
                <TableHead>Kategori</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Sıra</TableHead>
                <TableHead>Ana Sayfa</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((s, idx) => (
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
                  <TableCell><Badge variant="outline">{s.category === "bireysel" ? "Bireysel" : s.category === "kurumsal" ? "Kurumsal" : "Diğer"}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">/{s.slug}</TableCell>
                  <TableCell>{s.order}</TableCell>
                  <TableCell>
                    <Badge variant={s.showOnHomepage !== false ? "default" : "secondary"}>
                      {s.showOnHomepage !== false ? "Evet" : "Hayır"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={s.isActive ? "default" : "secondary"}>
                      {s.isActive ? "Aktif" : "Pasif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/services/${s.id}`}>
                        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                      </Link>
                      <Link href={`/${s.slug}`} target="_blank">
                        <Button variant="ghost" size="icon"><ExternalLink className="h-4 w-4 text-muted-foreground" /></Button>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => { setDeleteId(s.id); setDeleteOpen(true); }}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredServices.length === 0 && services.length > 0 && <TableRow><TableCell colSpan={9} className="py-8 text-center text-muted-foreground">Sonuç bulunamadı</TableCell></TableRow>}
              {services.length === 0 && <TableRow><TableCell colSpan={9} className="py-8 text-center text-muted-foreground">Henüz hizmet yok</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}

      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} loading={deleteLoading} />
    </div>
  );
}
