"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Plus, Trash2, Loader2 } from "lucide-react";
import DeleteDialog from "@/components/admin/delete-dialog";

interface PricingPage {
  id: string;
  slug: string;
  title: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminPricingPagesPage() {
  const router = useRouter();
  const [items, setItems] = useState<PricingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const res = await fetch("/api/pricing-pages");
    const json = await res.json();
    if (json.success) setItems(json.data);
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  async function handleDelete() {
    setDeleteLoading(true);
    await fetch(`/api/pricing-pages/${deleteId}`, { method: "DELETE" });
    setDeleteLoading(false);
    setDeleteOpen(false);
    fetchData();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="Fiyat Sayfaları" 
          description="Fiyat sayfalarını yönetin"
        />
        <Button onClick={() => router.push("/admin/pricing-pages/new")}>
          <Plus className="mr-2 h-4 w-4" /> Yeni Sayfa
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="rounded-xl border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlık</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="font-mono text-sm">/{item.slug}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${item.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {item.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(item.createdAt).toLocaleDateString("tr-TR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => router.push(`/admin/pricing-pages/${item.id}`)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => { setDeleteId(item.id); setDeleteOpen(true); }}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                    Henüz fiyat sayfası yok
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <DeleteDialog 
        open={deleteOpen} 
        onOpenChange={setDeleteOpen} 
        onConfirm={handleDelete} 
        loading={deleteLoading} 
      />
    </div>
  );
}
