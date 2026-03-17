"use client";

import { useState, useEffect, useMemo } from "react";
import PageHeader from "@/components/admin/page-header";
import DeleteDialog from "@/components/admin/delete-dialog";
import BulkActions from "@/components/admin/bulk-actions";
import SearchFilter from "@/components/admin/search-filter";
import ExportImport from "@/components/admin/export-import";
import { FilterPanel } from "@/components/admin/filter-panel";
import { SortDropdown } from "@/components/admin/sort-dropdown";
import { Pagination } from "@/components/admin/pagination";
import { useBulkSelection } from "@/hooks/use-bulk-selection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Loader2, ArrowLeft } from "lucide-react";
import MediaPicker from "@/components/admin/media-picker";
import RichTextEditor from "@/components/admin/rich-text-editor";
import type { BlogPost } from "@/types";

export default function AdminBlogPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editItem, setEditItem] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [filterValues, setFilterValues] = useState<any>({});

  const filteredItems = useMemo(() => {
    let filtered = items.filter((item) => {
      const matchesSearch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !categoryFilter || item.category === categoryFilter;
      const matchesStatus = !statusFilter || 
        (statusFilter === "published" && item.isPublished) ||
        (statusFilter === "draft" && !item.isPublished);
      
      const matchesDate = (!dateRange.from || !dateRange.to) ||
        (new Date(item.publishedAt || item.createdAt) >= new Date(dateRange.from) &&
         new Date(item.publishedAt || item.createdAt) <= new Date(dateRange.to));
      
      return matchesSearch && matchesCategory && matchesStatus && matchesDate;
    });

    // Sorting
    filtered.sort((a, b) => {
      const aVal = a[sortField as keyof BlogPost];
      const bVal = b[sortField as keyof BlogPost];
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    return filtered;
  }, [items, searchQuery, categoryFilter, statusFilter, dateRange, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  const bulk = useBulkSelection(filteredItems);
  const categories = useMemo(() => {
    const cats = new Set(items.map(i => i.category).filter(Boolean));
    return Array.from(cats).map(c => ({ value: c, label: c }));
  }, [items]);

  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", image: "",
    category: "", tags: "", author: "Kozcuoğlu Nakliyat",
    isPublished: false, seoTitle: "", seoDescription: "",
  });

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/blog?admin=true");
    const json = await res.json();
    if (json.success) setItems(json.data);
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  function openNew() {
    setEditItem(null);
    setForm({ title: "", slug: "", excerpt: "", content: "", image: "", category: "", tags: "", author: "Kozcuoğlu Nakliyat", isPublished: false, seoTitle: "", seoDescription: "" });
    setEditorOpen(true);
  }

  function openEdit(item: BlogPost) {
    setEditItem(item);
    setForm({
      title: item.title, slug: item.slug, excerpt: item.excerpt, content: item.content,
      image: item.image, category: item.category, tags: item.tags.join(", "),
      author: item.author, isPublished: item.isPublished,
      seoTitle: item.seo.title, seoDescription: item.seo.description,
    });
    setEditorOpen(true);
  }


  async function handleSave() {
    setSaving(true);
    const payload = {
      title: form.title, slug: form.slug, excerpt: form.excerpt, content: form.content,
      image: form.image, category: form.category,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      author: form.author, isPublished: form.isPublished,
      seo: { title: form.seoTitle, description: form.seoDescription, ogImage: "", robots: "index, follow", canonical: "" },
    };
    if (editItem) {
      await fetch(`/api/blog/${editItem.slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } else {
      await fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    }
    setSaving(false); setEditorOpen(false); fetchData();
  }

  async function handleDelete() {
    setDeleteLoading(true);
    await fetch(`/api/blog/${deleteId}`, { method: "DELETE" });
    setDeleteLoading(false); setDeleteOpen(false); fetchData();
  }

  async function handleBulkDelete() {
    if (!confirm(`${bulk.selectedCount} yazıyı silmek istediğinize emin misiniz?`)) return;
    setDeleteLoading(true);
    for (const id of bulk.selectedIds) {
      const item = items.find(i => i.id === id);
      if (item) await fetch(`/api/blog/${item.slug}`, { method: "DELETE" });
    }
    setDeleteLoading(false);
    bulk.clearSelection();
    fetchData();
  }

  async function handleBulkActivate() {
    setDeleteLoading(true);
    for (const id of bulk.selectedIds) {
      const item = items.find(i => i.id === id);
      if (item) {
        await fetch(`/api/blog/${item.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...item, isPublished: true })
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
      const item = items.find(i => i.id === id);
      if (item) {
        await fetch(`/api/blog/${item.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...item, isPublished: false })
        });
      }
    }
    setDeleteLoading(false);
    bulk.clearSelection();
    fetchData();
  }

  async function handleImport(importedData: any[]) {
    if (!confirm(`${importedData.length} yazıyı içe aktarmak istediğinize emin misiniz?`)) return;
    setDeleteLoading(true);
    let successCount = 0;
    for (const item of importedData) {
      try {
        await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item)
        });
        successCount++;
      } catch (error) {
        console.error("Import error:", error);
      }
    }
    setDeleteLoading(false);
    alert(`${successCount}/${importedData.length} yazı başarıyla içe aktarıldı`);
    fetchData();
  }

  if (editorOpen) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setEditorOpen(false)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-[#122032]">{editItem ? "Yazı Düzenle" : "Yeni Yazı"}</h1>
            <p className="text-sm text-muted-foreground">Tüm alanları doldurup kaydedin</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Switch checked={form.isPublished} onCheckedChange={(v) => setForm({ ...form, isPublished: v })} />
              <Label className="text-sm">{form.isPublished ? "Yayında" : "Taslak"}</Label>
            </div>
            <Button variant="outline" onClick={() => setEditorOpen(false)}>İptal</Button>
            <Button onClick={handleSave} disabled={saving || !form.title} className="bg-[#e3000f] hover:bg-[#c5000d]">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {editItem ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          {/* Sol — Ana İçerik */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Başlık</Label>
                    <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Blog yazısı başlığı" className="text-lg font-medium" />
                  </div>
                  <div className="space-y-2">
                    <Label>Slug</Label>
                    <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="blog-yazisi-basligi" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Özet</Label>
                  <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={3} placeholder="Yazının kısa özeti..." />
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <Label className="mb-3 text-sm font-semibold">İçerik</Label>
              <RichTextEditor
                content={form.content}
                onChange={(html) => setForm({ ...form, content: html })}
              />
            </div>
          </div>

          {/* Sağ — Sidebar */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="mb-4 text-sm font-semibold text-[#122032]">Detaylar</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Nakliyat" />
                </div>
                <div className="space-y-2">
                  <Label>Etiketler (virgül ile)</Label>
                  <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="nakliyat, taşıma" />
                </div>
                <div className="space-y-2">
                  <Label>Yazar</Label>
                  <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
                </div>
                <MediaPicker
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                  folder="blog"
                  label="Görsel"
                />
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="mb-4 text-sm font-semibold text-[#122032]">SEO</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>SEO Başlık</Label>
                  <Input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} />
                  <p className="text-[11px] text-muted-foreground">{form.seoTitle.length}/60 karakter</p>
                </div>
                <div className="space-y-2">
                  <Label>SEO Açıklama</Label>
                  <Textarea value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} rows={3} />
                  <p className="text-[11px] text-muted-foreground">{form.seoDescription.length}/160 karakter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Blog" description="Blog yazılarını yönetin" actionLabel="Yazı Ekle" onAction={openNew} />
        <ExportImport
          data={filteredItems}
          filename="blog-posts"
          columns={[
            { key: "title", label: "Başlık" },
            { key: "slug", label: "Slug" },
            { key: "category", label: "Kategori" },
            { key: "author", label: "Yazar" },
            { key: "isPublished", label: "Durum" },
            { key: "publishedAt", label: "Tarih" },
          ]}
          onImport={handleImport}
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
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        categories={categories}
        statuses={[
          { value: "published", label: "Yayında" },
          { value: "draft", label: "Taslak" },
        ]}
        placeholder="Blog yazılarında ara..."
      />
      
      <div className="flex items-center gap-4">
        <FilterPanel
          config={{
            category: categories.map(c => c.value),
            status: ["published", "draft"],
            dateRange: true
          }}
          values={filterValues}
          onChange={setFilterValues}
          onReset={() => setFilterValues({})}
        />
        
        <SortDropdown
          options={[
            { value: "createdAt", label: "Oluşturma Tarihi" },
            { value: "title", label: "Başlık" },
            { value: "publishedAt", label: "Yayın Tarihi" }
          ]}
          value={sortField}
          order={sortOrder}
          onChange={(field, order) => {
            setSortField(field);
            setSortOrder(order);
          }}
        />
      </div>
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
                <TableHead>Kategori</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedItems.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Checkbox
                      checked={bulk.isSelected(p.id)}
                      onCheckedChange={() => bulk.toggleSelection(p.id)}
                      aria-label={`${p.title} seç`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("tr-TR") : "-"}</TableCell>
                  <TableCell><Badge variant={p.isPublished ? "default" : "secondary"}>{p.isPublished ? "Yayında" : "Taslak"}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => { setDeleteId(p.id); setDeleteOpen(true); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredItems.length === 0 && items.length > 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">Sonuç bulunamadı</TableCell></TableRow>}
              {items.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-muted-foreground">Henüz blog yazısı yok</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      )}
      
      {filteredItems.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredItems.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      )}
      
      <DeleteDialog open={deleteOpen} onOpenChange={setDeleteOpen} onConfirm={handleDelete} loading={deleteLoading} />
    </div>
  );
}
