"use client";

import { useState, useEffect, useCallback } from "react";
import PageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Upload, Trash2, Search, ImageIcon, Copy, Check } from "lucide-react";

interface MediaItem {
  url: string;
  name: string;
  folder: string;
  size: number;
  modified: string;
}

const FOLDERS = [
  { value: "general", label: "Genel" },
  { value: "regions", label: "Bölgeler" },
  { value: "services", label: "Hizmetler" },
  { value: "solutions", label: "Çözümler" },
  { value: "blog", label: "Blog" },
  { value: "gallery", label: "Galeri" },
  { value: "fleet", label: "Araç Filosu" },
  { value: "clients", label: "Müşteriler" },
];

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterFolder, setFilterFolder] = useState("all");
  const [uploadFolder, setUploadFolder] = useState("general");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  useEffect(() => { fetchMedia(); }, [fetchMedia]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", uploadFolder);
      await fetch("/api/upload", { method: "POST", body: formData });
    }
    setUploading(false);
    fetchMedia();
    e.target.value = "";
  }

  async function handleDelete(url: string) {
    if (!confirm("Bu görseli silmek istediğinize emin misiniz?")) return;
    await fetch("/api/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    if (selectedItem?.url === url) setSelectedItem(null);
    fetchMedia();
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  const filtered = items.filter((item) => {
    if (filterFolder !== "all" && item.folder !== filterFolder) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalSize = items.reduce((sum, i) => sum + i.size, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Medya Kütüphanesi" description={`${items.length} görsel · ${formatSize(totalSize)} toplam`} />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Görsel ara..." className="pl-9" />
        </div>
        <Select value={filterFolder} onValueChange={setFilterFolder}>
          <SelectTrigger className="w-[150px]"><SelectValue placeholder="Klasör" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Klasörler</SelectItem>
            {FOLDERS.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <Select value={uploadFolder} onValueChange={setUploadFolder}>
            <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {FOLDERS.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <label className="cursor-pointer">
            <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
            <Button type="button" className="gap-1.5 bg-[#e3000f] hover:bg-[#c5000d] pointer-events-none" asChild>
              <span>
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Yükle
              </span>
            </Button>
          </label>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border bg-white py-16 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mb-3" />
              <p className="text-sm font-medium">Görsel bulunamadı</p>
              <p className="text-xs mt-1">Yükle butonunu kullanarak görsel ekleyin</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {filtered.map((item) => (
                <div
                  key={item.url}
                  className={`group relative cursor-pointer overflow-hidden rounded-lg border-2 bg-white transition-all hover:shadow-md ${
                    selectedItem?.url === item.url ? "border-[#e3000f] ring-2 ring-[#e3000f]/20" : "border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="aspect-square bg-gray-100">
                    <img src={item.url} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="truncate text-[10px] text-white">{item.name}</p>
                    <span className="text-[9px] text-white/70">{formatSize(item.size)}</span>
                  </div>
                  {selectedItem?.url === item.url && (
                    <div className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#e3000f] text-white">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedItem && (
          <div className="hidden w-[280px] shrink-0 lg:block">
            <div className="sticky top-24 space-y-4 rounded-xl border bg-white p-4 shadow-sm">
              <div className="overflow-hidden rounded-lg border">
                <img src={selectedItem.url} alt={selectedItem.name} className="w-full object-contain" style={{ maxHeight: 200 }} />
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Dosya Adı</p>
                  <p className="font-medium truncate">{selectedItem.name}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Klasör</p>
                  <p className="font-medium">{selectedItem.folder}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Boyut</p>
                  <p className="font-medium">{formatSize(selectedItem.size)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Tarih</p>
                  <p className="font-medium">{new Date(selectedItem.modified).toLocaleDateString("tr-TR")}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">URL</p>
                  <div className="flex gap-1">
                    <Input value={selectedItem.url} readOnly className="text-xs h-8" />
                    <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" onClick={() => copyUrl(selectedItem.url)}>
                      {copiedUrl === selectedItem.url ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              </div>
              <Button variant="destructive" size="sm" className="w-full gap-1.5" onClick={() => handleDelete(selectedItem.url)}>
                <Trash2 className="h-3.5 w-3.5" /> Görseli Sil
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
